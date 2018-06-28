var cooperativesDict;
$.ajax({
	type : "get",
	url : base+"/dict/expertStatus",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		cooperativesDict = obj;
	}
});

$('#expertGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/expert/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#expertGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [ {
		field : 'name',
		title : '名称',
		width : 100,
		sortable : true
	}, {
		field : 'jobTitle',
		title : '职称',
		width : 100,
		sortable : true
	}, {
		field : 'status',
		title : '状态（是否在线）',
		width : 100,
		sortable : true,
		formatter : function(value, row, index) {
			return dictValue(cooperativesDict, 'code', 'name', value)
		}}, 
		{
		field : 'articleNum',
		title : '发表文章数量',
		width : 100,
		sortable : true
	},  {
		field : 'serviceTimes',
		title : '服务次数',
		width : 100,
		sortable : true
	}, {
		field : 'praiseTimes',
		title : '获赞次数',
		width : 100,
		sortable : true
	}, {
		field : 'browseTimes',
		title : '浏览次数',
		width : 100,
		sortable : true
	}, {
		field : 'skillDescription',
		title : '技能描述',
		width : 100,
		sortable : true
	}, {
		field : 'activeTime',
		title : '活跃时长，单位小时',
		width : 100,
		sortable : true
	}, {
		field : 'starNum',
		title : '星数',
		width : 100,
		sortable : true
	}, {
		field : 'headPortrait',
		title : '头像',
		width : 100,
		sortable : true,
		formatter: function(value,row,index){
			var str='';
	    	if('' != value && null != value){
	      	str ="<img style=\"height: 80px;width: 100px;\" src=\"" +  value + "\"/>";
	    	}
	      	return  str;
	    	}
	} ] ]
});

function openSaveExpertWin() {
    $('#saveExpertForm').form('reset');
   $('#saveImage').removeAttr("src");
    $('#saveExpertWin').window('open');
}

function openUpdateExpertWin() {
    var row = $('#expertGrid').datagrid('getSelected');
    if (row) {
        $('#updateExpertForm').form('reset');
        var filePath = row["headPortrait"];
        $('#updateExpertForm').form('load', row);
        $('#updateImage').attr("src",  filePath);
        $('#updateExpertWin').window('open');
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function saveExpert() {
    if ($('#saveExpertForm').form('validate')) {
        var file = $("input[name='file']")[0];
        var formData = new FormData();
        formData.append("file", file.files[0]);
        var newName = uploadImage(formData);
        if (newName) {
            $.ajax({
                type: "POST",
                url: base + "/expert/save",
                data: $('#saveExpertForm').serialize() + "&headPortrait=" + newName,
                dataType: 'json',
                success: function (obj) {
                    if (obj.success) {
                        $('#saveExpertWin').window('close');
                        insertRowToGrid('expertGrid', obj.data);
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

function closeAddExpert(){
	$('#saveExpertWin').window('close');
}

function closeUpdateExpertWin(){
	$('#updateExpertWin').window('close');
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
                $('#saveExpertWin').window('close');
            }
            responseData = obj.data;
        }

    });
    return responseData;
}

function updateExpert() {
    if ($('#updateExpertForm').form('validate')) {
        var file = $("input[name='file']")[1];
        var headPortrait = "";
        if (file.files[0]){
        	 	var formData = new FormData();
             formData.append("file", file.files[0]);
             headPortrait = uploadImage(formData);
        }
        $.ajax({
            type: "POST",
            url: base + "/expert/update",
            data: $('#updateExpertForm').serialize() + "&headPortrait=" + headPortrait,
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#updateExpertWin').window('close');
                    updateRowInGrid('expertGrid', obj.data);
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
	 var rowId = $('#expertGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		deleteExpert();
	} else {
		return;
	}
}); 

function deleteExpert() {
    var row = $('#expertGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base + "/expert/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('expertGrid');
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

function searchExpert() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#expertGrid").datagrid('load', param);
    $('#queryForm').form('reset');
}

$('.status').combobox({
	url : base+'/dict/expertStatus',
	valueField : 'code',
	textField : 'name'
});

$('.jobTitle').combobox({
	url : base+'/comboBox/jobTitle/expert',
	valueField : 'jobTitle',
	textField : 'jobTitle'
});

$('.name').combobox({
	url : base+'/comboBox/name/expert',
	valueField : 'name',
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

