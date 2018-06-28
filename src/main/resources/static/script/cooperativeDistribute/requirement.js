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

$('#requirementGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/requirement/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#requirementGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [ {
		field : 'produceRequirement',
		title : '生产需求',
		width : 100,
		sortable : true
	}, {
		field : 'agriSkill',
		title : '农技',
		width : 100
	}, {
		field : 'agriRequirement',
		title : '农资需求',
		width : 100,
		sortable : true
	}, {
		field : 'fundRequirement',
		title : '资金需求',
		width : 100,
		sortable : true
	},{
	field : 'cooperativesId',
	title : '合作社',
	width : 100,
	sortable : true,
	formatter : function(value, row, index) {
		return dictValue(cooperativesDict, 'code', 'name', value)
	}} ] ]
});

function add() {
	$('#addRequirementForm').form('reset');
	$('#addRequirementWin').window("open");
};

function addClose() {
	$('#addRequirementWin').window('close');
};
function updateClose() {
	$('#updateRequirementWin').window('close');
};

function addSave() {
	if ($('#addRequirementForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/requirement/save",
			data : $('#addRequirementForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addRequirementWin').window('close');
					insertRowToGrid('requirementGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateRequirementForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/requirement/update",
			data : $('#updateRequirementForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateRequirementWin').window('close');
					updateRowInGrid('requirementGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#requirementGrid').datagrid('getSelected');
	if (row) {
		$('#updateRequirementWin').window("open");
		$('#updateRequirementForm').form('load', row);
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#requirementGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/requirement/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('requirementGrid');
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

$(document).keydown(function(event){ 
	 var rowId = $('#requirementGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#requirementGrid").datagrid('load', param);
}


