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

$('#agriCostDetailGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/agriCostDetail/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#agriCostDetailGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [  {
		field : 'costName',
		title : '费用名称',
		width : 100,
		sortable : true
	}, {
		field : 'costAmount',
		title : '金额(单位：元)',
		width : 100,
		sortable : true
	}, {
		field : 'buyAmount',
		title : '购买数量',
		width : 100,
		sortable : true
	},  {
		field : 'unit',
		title : '购买数量单位',
		width : 100,
		sortable : true
	}, {
		field : 'buydate',
		title : '购买日期',
		width : 100,
		sortable : true
	},{
		field : 'cooperativesId',
		title : '合作社',
		width : 100,
		sortable : true,
		formatter : function(value, row, index) {
			return dictValue(cooperativesDict, 'code', 'name', value)
		}
	} ] ]
});

function add() {
	$('#addAgriCostDetailForm').form('reset');
	$('#addAgriCostDetailWin').window("open");
};

function addClose() {
	$('#addAgriCostDetailWin').window('close');
};
function updateClose() {
	$('#updateAgriCostDetailWin').window('close');
};

function addSave() {
	if ($('#addAgriCostDetailForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/agriCostDetail/save",
			data : $('#addAgriCostDetailForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addAgriCostDetailWin').window('close');
					insertRowToGrid('agriCostDetailGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateAgriCostDetailForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/agriCostDetail/update",
			data : $('#updateAgriCostDetailForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateAgriCostDetailWin').window('close');
					updateRowInGrid('agriCostDetailGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#agriCostDetailGrid').datagrid('getSelected');
	if (row) {
		$('#updateAgriCostDetailWin').window("open");
		$('#updateAgriCostDetailForm').form('load', row);
		operate = "update";
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#agriCostDetailGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/agriCostDetail/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('agriCostDetailGrid');
							pop('温馨提示', '删除成功');
						} else {
							pop('删除提示', obj.msg);
						}
					}
				});
			}
		});
	} else {
		pop('删除提示', "请选择要删除的数据！");
	}
};

$('.cooperativesId').combobox({
	url : base+'/cooperatives/dict',
	valueField : 'code',
	textField : 'name'
});

$('.costName').combobox({
	url : base+'/comboBox/costName/agriCostDetail',
	valueField : 'costName',
	textField : 'costName'
});

$(document).keydown(function(event){ 
	 var rowId = $('#agriCostDetailGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#agriCostDetailGrid").datagrid('load', param);
}


