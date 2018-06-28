$('#transactionStatisticsGrid').datagrid({
    url: base+'/transactionStatistics/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#transactionStatisticsGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'totalUserNum', title: '总用户数', align: 'center', sortable: true},
        {field: 'latest30DayOrderCount', title: '近30天订单数量', align: 'center', sortable: true},
        {field: 'todayOrderCount', title: '今日订单数量', align: 'center', sortable: true},
        {field: 'createTime', title: '记录创建时间', align: 'center', sortable: true },
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
    $("#transactionStatisticsGrid").datagrid('load', param);
}

function openUpdateTransactionStatisticsWin() {
    var row = $('#transactionStatisticsGrid').datagrid('getSelected');
    if (row) {
        $('#updateTransactionStatisticsForm').form('reset');
        $('#transactionStatisticsUpdateWin').window('open');
        $('#updateTransactionStatisticsForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function closeUpdateTransactionStatisticsWin() {
    $('#transactionStatisticsUpdateWin').window('close');
}

function updateTransactionStatistics() {
    if ($('#updateTransactionStatisticsForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/transactionStatistics/update",
            data: $('#updateTransactionStatisticsForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#transactionStatisticsUpdateWin').window('close');
                    updateRowInGrid('transactionStatisticsGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function openSaveTransactionStatisticsWin() {
    $('#saveTransactionStatisticsForm').form('reset');
    $('#transactionStatisticsSaveWin').window('open');
}

function saveTransactionStatistics() {
    if ($('#saveTransactionStatisticsForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/transactionStatistics/save",
            data: $('#saveTransactionStatisticsForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#transactionStatisticsSaveWin').window('close');
                    insertRowToGrid('transactionStatisticsGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteTransactionStatistics() {
    var row = $('#transactionStatisticsGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base+"/transactionStatistics/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('transactionStatisticsGrid');
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

function closeSaveTransactionStatisticsWin() {
    $('#transactionStatisticsSaveWin').window('close');
}




