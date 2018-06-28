var marketInfoDict;
$.ajax({
	type : "get",
	url : base+"/marketInfo/dict",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		marketInfoDict = obj;
	}
});

$('#mainProductBaseGrid').datagrid({
    url: base+"/mainProductBase/page",
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#mainProductBaseGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'productName', title: '产品名称', align: 'center', sortable: true},
        {field: 'number', title: '年产能', align: 'center', sortable: true},
        {field: 'marketInfoId', title: '生产基地（市场）', align: 'center', sortable: true,
	        	formatter : function(value, row, index) {
	    			return dictValue(marketInfoDict, 'code', 'name', value)
	    		}
        }
    ]]
});


function doSearch() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#mainProductBaseGrid").datagrid('load', param);
}

function openUpdateMainProductBaseWin() {
    var row = $('#mainProductBaseGrid').datagrid('getSelected');
    if (row) {
        $('#updateMainProductBaseForm').form('reset');
        $('#mainProductBaseUpdateWin').window('open');
        $('#updateMainProductBaseForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function closeUpdateMainProductBaseWin() {
    $('#mainProductBaseUpdateWin').window('close');
}

function closeSaveMainProductBaseWin() {
	$('#mainProductBaseSaveWin').window('close');
}

function updateMainProductBase() {
    if ($('#updateMainProductBaseForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/mainProductBase/update",
            data: $('#updateMainProductBaseForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#mainProductBaseUpdateWin').window('close');
                    updateRowInGrid('mainProductBaseGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function openSaveMainProductBaseWin() {
    $('#saveMainProductBaseForm').form('reset');
    $('#mainProductBaseSaveWin').window('open');
}

function saveMainProductBase() {
    if ($('#saveMainProductBaseForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/mainProductBase/save",
            data: $('#saveMainProductBaseForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#mainProductBaseSaveWin').window('close');
                    insertRowToGrid('mainProductBaseGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteMainProductBase() {
    var row = $('#mainProductBaseGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base+"/mainProductBase/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('mainProductBaseGrid');
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

$('.marketInfoCombo').combobox({
	data: marketInfoDict,
	valueField : 'code',
	textField : 'name',
	onSelect : function (rec) {
		$('.productName').combobox("clear");
		var url = base+"/commodityInfo/getNameByMarketInfoId?marketInfoId="+rec.code;
		$('.productName').combobox('reload',url);
	}
});



$('.productName').combobox({
	valueField : 'code',
	textField : 'name'
});





