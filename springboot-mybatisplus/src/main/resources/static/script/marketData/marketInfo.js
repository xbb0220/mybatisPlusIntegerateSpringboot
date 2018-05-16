$('#marketInfoGrid').datagrid({
    url: base+'/marketInfo/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#marketInfoGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'name', title: '市场名称', align: 'center', sortable: true},
        {field: 'province', title: '省份', align: 'center', sortable: true},
        {field: 'city', title: '市', align: 'center', sortable: true},
        {field: 'district', title: '县/区', align: 'center', sortable: true},
//        {field: 'createTime', title: '记录创建时间', align: 'center', sortable: true },
//        {field: 'createTime', title: '统计日期', align: 'center', sortable: true,
//	        	formatter : function(value, row, index) {
//	        		if (value){
//	        			var date = value.split(" ")[0]; // yyyy-MM-dd
//		        		return date;
//	        		}
//	        		return "";
//	    		}	
//        }
    ]]
});


function doSearch() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#marketInfoGrid").datagrid('load', param);
}

function openUpdateMarketInfoWin() {
    var row = $('#marketInfoGrid').datagrid('getSelected');
    if (row) {
        $('#updateMarketInfoForm').form('reset');
        $('#marketInfoUpdateWin').window('open');
        $('#updateMarketInfoForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function closeUpdateMarketInfoWin() {
    $('#marketInfoUpdateWin').window('close');
}

function updateMarketInfo() {
    if ($('#updateMarketInfoForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/marketInfo/update",
            data: $('#updateMarketInfoForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#marketInfoUpdateWin').window('close');
                    updateRowInGrid('marketInfoGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function openSaveMarketInfoWin() {
    $('#saveMarketInfoForm').form('reset');
    $('#marketInfoSaveWin').window('open');
}

function saveMarketInfo() {
    if ($('#saveMarketInfoForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/marketInfo/save",
            data: $('#saveMarketInfoForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#marketInfoSaveWin').window('close');
                    insertRowToGrid('marketInfoGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteMarketInfo() {
    var row = $('#marketInfoGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base+"/marketInfo/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('marketInfoGrid');
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

function closeSaveMarketInfoWin() {
    $('#marketInfoSaveWin').window('close');
}




