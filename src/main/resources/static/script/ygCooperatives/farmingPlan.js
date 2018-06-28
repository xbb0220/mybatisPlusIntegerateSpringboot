var cooperativesDict;
$.ajax({
    type: "get",
    url: base + "/cooperatives/dict",
    cache: true,
    async: false,
    dataType: "json",
    success: function (obj) {
        cooperativesDict = obj;
    }
});

$('#farmingPlanGrid').datagrid({
    url: base + '/farmingPlan/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#farmingPlanToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'farmWork', title: '农事', align: 'center', width: 100, sortable: true},
        {field: 'suggest', title: '建议', align: 'center', width: 100, sortable: true},
        {field: 'month', title: '月份', align: 'center', width: 100, sortable: true},
        {field: 'image', title: '图片', align: 'center', width: 100, sortable: true, formatter: imgFormatter},
        {
            field: 'cooperativesId', title: '合作社名称', align: 'center', width: 100, sortable: true,
            formatter: function (value, row, index) {
                return dictValue(cooperativesDict, 'code', 'name', value)
            }
        }
    ]]
});

function imgFormatter(value, row, index) {
    var str = "";
    if (value != "" || value != null) {
        str = "<img style=\"height: 80px;width: 150px;\" src=\"" + value + "\"/>";
        return str;
    }
}

function openSaveFarmingPlanWin() {
    $('#saveFarmingPlanForm').form('reset');
    $('#saveFarmingPlanWin').window('open');
}

function openUpdateFarmingPlanWin() {
    var row = $('#farmingPlanGrid').datagrid('getSelected');
    if (row) {
        $('#updateFarmingPlanForm').form('reset');
        var filePath = row["image"];
        $('#updateFarmingPlanForm').form('load', row);
        $('#updateImage').attr("src", filePath);
        $('#updateFarmingPlanWin').window('open');
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function saveFarmingPlan() {
    if ($('#saveFarmingPlanForm').form('validate')) {
        var file = $("input[name='file']")[0];
        var formData = new FormData();
        formData.append("file", file.files[0]);
        var newName = uploadImage(formData);
        if (newName) {
            $.ajax({
                type: "POST",
                url: base + "/farmingPlan/save",
                data: $('#saveFarmingPlanForm').serialize() + "&image=" + newName,
                dataType: 'json',
                success: function (obj) {
                    if (obj.success) {
                        $('#saveFarmingPlanWin').window('close');
                        insertRowToGrid('farmingPlanGrid', obj.data);
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
                $('#saveFarmingPlanWin').window('close');
            }
            responseData = obj.data;
        }

    });
    return responseData;
}

function updateFarmingPlan() {
    if ($('#updateFarmingPlanForm').form('validate')) {
        var file = $("input[name='file']")[1];
        var imageUrl="";
        if (file.files[0]){
        		var formData = new FormData();
        		formData.append("file", file.files[0]);
        		imageUrl = uploadImage(formData);
        }
        $.ajax({
            type: "POST",
            url: base + "/farmingPlan/update",
            data: $('#updateFarmingPlanForm').serialize() + "&image=" + imageUrl,
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#updateFarmingPlanWin').window('close');
                    updateRowInGrid('farmingPlanGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteFarmingPlan() {
    var row = $('#farmingPlanGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base + "/farmingPlan/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('farmingPlanGrid');
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

function searchFarmingPlan() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#farmingPlanGrid").datagrid('load', param);
}

function closeAddFarmingPlan() {
    $('#saveFarmingPlanWin').window('close');
}

function closeUpdateFarmingPlanWin() {
    $('#updateFarmingPlanWin').window('close');
}

$('.cooperativesId').combobox({
    url: base + '/cooperatives/dict',
    valueField: 'code',
    textField: 'name'
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