var cooperativesDict;
$.ajax({
	type : "get",
	url : base+"/dict/storeStatus",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		cooperativesDict = obj;
	}
});


$('#storeGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/store/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#storeGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [  {field : 'name',title : '名称',width : 100,sortable : true}, 
	               		{field : 'establishedTime',title : '建立时间',width : 100,sortable : true},
	               		{field : 'type',title : '经营类型',width : 100,sortable : true},
	               		{field : 'region',title : '所在地区',width : 100,sortable : true},
	               		{field : 'longitude',title : '经度',width : 100,sortable : true},
	               		{field : 'latitude',title : '纬度',width : 100,sortable : true}, 
	               		{field : 'popedomNum',title : '市辖区数量',width : 100,sortable : true},
	               		{field : 'popedom',title : '市辖区',width : 100,sortable : true},
	               		{field : 'storeStatus',title : '门店状态',width : 100,sortable : true,
	               			formatter : function(value, row, index) {
	               				return dictValue(cooperativesDict, 'name', 'code', value)
	            		}}, 
	               		{field : 'image',title : '门店图片',width : 100,sortable : true,
	            			formatter: function(value,row,index){
	            				var str='';
	            		    	if('' != value && null != value){
	            		      	str ="<img style=\"height: 80px;width: 100px;\" src=\"" +  value + "\"/>";
	            		    	}
	            		      	return  str;
	            		    	}
	            		},
	               		{field : 'tryPrice',title : '试售价',width : 100,sortable : true}
	               		 ] ]
});

function openSaveStoreWin() {
    $('#saveStoreForm').form('reset');
   $('#saveImage').removeAttr("src");
    $('#saveStoreWin').window('open');
}

function openUpdateStoreWin() {
    var row = $('#storeGrid').datagrid('getSelected');
    if (row) {
        $('#updateStoreForm').form('reset');
        var filePath = row["image"];
        $('#updateStoreForm').form('load', row);
        $('#updateImage').attr("src",  filePath);
        $('#updateStoreWin').window('open');
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function saveStore() {
    if ($('#saveStoreForm').form('validate')) {
        var file = $("input[name='file']")[0];
        var formData = new FormData();
        formData.append("file", file.files[0]);
        var newName = uploadImage(formData);
        if (newName) {
            $.ajax({
                type: "POST",
                url: base + "/store/save",
                data: $('#saveStoreForm').serialize() + "&image=" + newName,
                dataType: 'json',
                success: function (obj) {
                    if (obj.success) {
                        $('#saveStoreWin').window('close');
                        insertRowToGrid('storeGrid', obj.data);
                        pop('温馨提示', '保存成功');
                    }
                    else {
                        pop('保存提示', obj.msg);
                    }
                }
            });
        }

    }
}

function closeAddStore(){
	$('#saveStoreWin').window('close');
}

function closeUpdateStoreWin(){
	$('#updateStoreWin').window('close');
}

function uploadImage(imageData) {
    var responseData;
    $.ajax({
        type: "POST",
        url: base + "/image/upload",
        data: imageData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (obj) {
            if (obj.fail) {
                pop('保存提示', obj.msg);
                $('#saveStoreWin').window('close');
            }
            responseData = obj.data;
        }

    });
    return responseData;
}

function updateStore() {
    if ($('#updateStoreForm').form('validate')) {
        var file = $("input[name='file']")[1];
        var image = "";
        if (file.files[0]){
        	 	var formData = new FormData();
             formData.append("file", file.files[0]);
             image = uploadImage(formData);
        }
        $.ajax({
            type: "POST",
            url: base + "/store/update",
            data: $('#updateStoreForm').serialize() + "&image=" + image,
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#updateStoreWin').window('close');
                    updateRowInGrid('storeGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

$(document).keydown(function(event){ 
	 var rowId = $('#storeGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		deleteStore();
	} else {
		return;
	}
}); 

function deleteStore() {
    var row = $('#storeGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base + "/store/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('storeGrid');
                            pop('温馨提示', '删除成功');
                        }
                        else {
                            pop('删除提示', obj.msg);
                        }
                    }
                });
            }
        });
    } else {
        pop('删除提示', "请选择要删除的数据！");
    }
}

function searchStore() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#storeGrid").datagrid('load', param);
    $('#queryForm').form('reset');
}

$('.type').combobox({
	url : base+'/comboBox/type/store',
	valueField : 'code',
	textField : 'name'
});

$('.storeStatus').combobox({
	url : base+'/dict/storeStatus',
	valueField : 'name',
	textField : 'code'
});

$('.region').combobox({
	url: base+'/comboBox/region/store',
	valueField : 'code',
	textField : 'name',
	onSelect : function (rec) {
		$('.popedom').combobox("clear")
		var url = base+"/store/getPopedomByRegion?region="+rec.code;
		$('.popedom').combobox('reload',url)
	}
});

$('.popedom').combobox({
	valueField : 'code',
	textField : 'name'
});

function PreviewImage(fileObj, imgPreviewId, divPreviewId) {
    var allowExtention = ".jpg,.bmp,.gif,.png";//允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
    var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase();
    var browserVersion = window.navigator.userAgent.toUpperCase();
    if (allowExtention.indexOf(extention) > -1) {
        if (fileObj.files) {//HTML5实现预览，兼容chrome、火狐7+等
            if (window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
                }
                reader.readAsDataURL(fileObj.files[0]);
            } else if (browserVersion.indexOf("SAFARI") > -1) {
                alert("不支持Safari6.0以下浏览器的图片预览!");
            }
        } else if (browserVersion.indexOf("MSIE") > -1) {
            if (browserVersion.indexOf("MSIE 6") > -1) {//ie6
                document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
            } else {//ie[7-9]
                fileObj.select();
                if (browserVersion.indexOf("MSIE 9") > -1)
                    fileObj.blur();//不加上document.selection.createRange().text在ie9会拒绝访问
                var newPreview = document.getElementById(divPreviewId + "New");
                if (newPreview == null) {
                    newPreview = document.createElement("div");
                    newPreview.setAttribute("id", divPreviewId + "New");
                    newPreview.style.width = document.getElementById(imgPreviewId).width + "px";
                    newPreview.style.height = document.getElementById(imgPreviewId).height + "px";
                    newPreview.style.border = "solid 1px #d2e2e2";
                }
                newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                var tempDivPreview = document.getElementById(divPreviewId);
                tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
                tempDivPreview.style.display = "none";
            }
        } else if (browserVersion.indexOf("FIREFOX") > -1) {//firefox
            var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
            if (firefoxVersion < 7) {//firefox7以下版本
                document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
            } else {//firefox7.0+
                document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
            }
        } else {
            document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
        }
    } else {
        alert("仅支持" + allowExtention + "为后缀名的文件!");
        fileObj.value = "";//清空选中文件
        if (browserVersion.indexOf("MSIE") > -1) {
            fileObj.select();
            document.selection.clear();
        }
        fileObj.outerHTML = fileObj.outerHTML;
    }
}

