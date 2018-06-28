var cooperativesDict;
$.ajax({
	type : "get",
	url : base+"/dict/manageType",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		cooperativesDict = obj;
	}
});

$('#manageTypeAnalysisGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/manageTypeAnalysis/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#manageTypeAnalysisGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [ {
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
		}}, {
		field : 'year',
		title : '年份',
		width : 100,
		sortable : true
	} ] ]
});

function add() {
	$('#addManageTypeAnalysisForm').form('reset');
	$('#addManageTypeAnalysisWin').window("open");
};

function addClose() {
	$('#addManageTypeAnalysisWin').window('close');
};
function updateClose() {
	$('#updateManageTypeAnalysisWin').window('close');
};

function addSave() {
	if ($('#addManageTypeAnalysisForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/manageTypeAnalysis/save",
			data : $('#addManageTypeAnalysisForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addManageTypeAnalysisWin').window('close');
					insertRowToGrid('manageTypeAnalysisGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateManageTypeAnalysisForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/manageTypeAnalysis/update",
			data : $('#updateManageTypeAnalysisForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateManageTypeAnalysisWin').window('close');
					updateRowInGrid('manageTypeAnalysisGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#manageTypeAnalysisGrid').datagrid('getSelected');
	if (row) {
		$('#updateManageTypeAnalysisWin').window("open");
		$('#updateManageTypeAnalysisForm').form('load', row);
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#manageTypeAnalysisGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/manageTypeAnalysis/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('manageTypeAnalysisGrid');
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
	url : base+'/dict/manageType',
	valueField : 'code',
	textField : 'name'
});

$('.year').combobox({
	url : base+'/comboBox/year/manageTypeAnalysis',
	valueField : 'year',
	textField : 'year'
});

$(document).keydown(function(event){ 
	 var rowId = $('#manageTypeAnalysisGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#manageTypeAnalysisGrid").datagrid('load', param);
}


