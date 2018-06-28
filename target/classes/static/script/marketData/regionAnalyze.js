$('#regionAnalyzeGrid').datagrid({
    url: base+'/regionAnalyze/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#regionAnalyzeGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'location', title: '地区', align: 'center', sortable: true},
        {field: 'transactionOrder', title: '成交订单', align: 'center', sortable: true},
        {field: 'inTheSaleOfProducts', title: '在售商品种类', align: 'center', sortable: true},
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
    $("#regionAnalyzeGrid").datagrid('load', param);
}

function openUpdateRegionAnalyzeWin() {
    var row = $('#regionAnalyzeGrid').datagrid('getSelected');
    if (row) {
        $('#updateRegionAnalyzeForm').form('reset');
        $('#regionAnalyzeUpdateWin').window('open');
        $('#updateRegionAnalyzeForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function closeUpdateRegionAnalyzeWin() {
    $('#regionAnalyzeUpdateWin').window('close');
}

function updateRegionAnalyze() {
    if ($('#updateRegionAnalyzeForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/regionAnalyze/update",
            data: $('#updateRegionAnalyzeForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#regionAnalyzeUpdateWin').window('close');
                    updateRowInGrid('regionAnalyzeGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function openSaveRegionAnalyzeWin() {
    $('#saveRegionAnalyzeForm').form('reset');
    $('#regionAnalyzeSaveWin').window('open');
}

function saveRegionAnalyze() {
    if ($('#saveRegionAnalyzeForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/regionAnalyze/save",
            data: $('#saveRegionAnalyzeForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#regionAnalyzeSaveWin').window('close');
                    insertRowToGrid('regionAnalyzeGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteRegionAnalyze() {
    var row = $('#regionAnalyzeGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base+"/regionAnalyze/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('regionAnalyzeGrid');
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

function closeSaveRegionAnalyzeWin() {
    $('#regionAnalyzeSaveWin').window('close');
}




