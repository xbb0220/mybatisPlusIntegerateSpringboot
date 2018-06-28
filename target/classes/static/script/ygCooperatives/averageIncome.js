var cooperativesDict;
$.ajax({
	type : "get",
	url : base+"/cooperatives/dict",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		cooperativesDict = obj;
	}
});

$('.cooperativesCombo').combobox({
	data: cooperativesDict,
	valueField : 'code',
	textField : 'name'
});


$('#averageIncomeGrid').datagrid({
    url: base+'/averageIncome/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#averageIncomeGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'cooperativesIncome', title: '合作社收入', align: 'center', sortable: true},
        {field: 'otherIncome', title: '其他散户', align: 'center', sortable: true},
        {field: 'year', title: '年份', align: 'center', sortable: true},
        {field: 'cooperativesId', title: '合作社', align: 'center', sortable: true,
	        	formatter : function(value, row, index) {
	    			return dictValue(cooperativesDict, 'code', 'name', value)
	    		}
        }
    ]]
});

function doSearch() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#averageIncomeGrid").datagrid('load', param);
}

function openUpdateAverageIncomeWin() {
    var row = $('#averageIncomeGrid').datagrid('getSelected');
    if (row) {
        $('#updateAverageIncomeForm').form('reset');
        $('#averageIncomeUpdateWin').window('open');
        $('#updateAverageIncomeForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function closeUpdateAverageIncomeWin() {
    $('#averageIncomeUpdateWin').window('close');
}

function updateAverageIncome() {
    if ($('#updateAverageIncomeForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/averageIncome/update",
            data: $('#updateAverageIncomeForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#averageIncomeUpdateWin').window('close');
                    updateRowInGrid('averageIncomeGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function openSaveAverageIncomeWin() {
    $('#saveAverageIncomeForm').form('reset');
    $('#averageIncomeSaveWin').window('open');
}

function saveAverageIncome() {
    if ($('#saveAverageIncomeForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/averageIncome/save",
            data: $('#saveAverageIncomeForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#averageIncomeSaveWin').window('close');
                    insertRowToGrid('averageIncomeGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteAverageIncome() {
    var row = $('#averageIncomeGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base+"/averageIncome/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('averageIncomeGrid');
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

$('.year').combobox({
	url : base+'/comboBox/year/averageIncome',
	valueField : 'year',
	textField : 'year'
});

$(document).keydown(function(event){ 
	 var rowId = $('#averageIncomeGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function closeSaveAverageIncomeWin() {
    $('#averageIncomeSaveWin').window('close');
}




