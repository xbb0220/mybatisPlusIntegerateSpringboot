var cooperativesDict;
$.ajax({
	type : "get",
	url : base+"/dict/economyPlantType",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		cooperativesDict = obj;
	}
});

$('#economyPlantAnalysisGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/economyPlantAnalysis/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#economyPlantAnalysisGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [  {
		field : 'result',
		title : '分析结果',
		width : 100,
		sortable : true
	}, {
		field : 'type',
		title : '分析类型',
		width : 100,
		sortable : true,formatter : function(value, row, index) {
			return dictValue(cooperativesDict, 'code', 'name', value)
		}
	}, {
		field : 'year',
		title : '年份',
		width : 100,
		sortable : true
	} ] ]
});

function add() {
	$('#addEconomyPlantAnalysisForm').form('reset');
	$('#addEconomyPlantAnalysisWin').window("open");
};

function addClose() {
	$('#addEconomyPlantAnalysisWin').window('close');
};
function updateClose() {
	$('#updateEconomyPlantAnalysisWin').window('close');
};

function addSave() {
	if ($('#addEconomyPlantAnalysisForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/economyPlantAnalysis/save",
			data : $('#addEconomyPlantAnalysisForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addEconomyPlantAnalysisWin').window('close');
					insertRowToGrid('economyPlantAnalysisGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateEconomyPlantAnalysisForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/economyPlantAnalysis/update",
			data : $('#updateEconomyPlantAnalysisForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateEconomyPlantAnalysisWin').window('close');
					updateRowInGrid('economyPlantAnalysisGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#economyPlantAnalysisGrid').datagrid('getSelected');
	if (row) {
		$('#updateEconomyPlantAnalysisWin').window("open");
		$('#updateEconomyPlantAnalysisForm').form('load', row);
		operate = "update";
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#economyPlantAnalysisGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/economyPlantAnalysis/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('economyPlantAnalysisGrid');
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

$('.type').combobox({
	url : base+'/dict/economyPlantType',
	valueField : 'code',
	textField : 'name'
});

$('.year').combobox({
	url : base+'/comboBox/year/economyPlantAnalysis',
	valueField : 'year',
	textField : 'year'
});

$(document).keydown(function(event){ 
	 var rowId = $('#economyPlantAnalysisGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#economyPlantAnalysisGrid").datagrid('load', param);
}


