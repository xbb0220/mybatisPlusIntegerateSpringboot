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

$('#inputOutputAnalysisGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/inputOutputAnalysis/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#inputOutputAnalysisGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [  {
		field : 'expectIncome',
		title : '预计收入',
		width : 100,
		sortable : true
	}, {
		field : 'actualIncome',
		title : '实际收入',
		width : 100,
		sortable : true
	}, {
		field : 'actualInvest',
		title : '实际投入',
		width : 100,
		sortable : true
	}, {
		field : 'expectInvest',
		title : '预计投入',
		width : 100,
		sortable : true
	}, {
		field : 'year',
		title : '年份',
		width : 100,
		sortable : true
	}, {
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
	$('#addInputOutputAnalysisForm').form('reset');
	$('#addInputOutputAnalysisWin').window("open");
};

function addClose() {
	$('#addInputOutputAnalysisWin').window('close');
};
function updateClose() {
	$('#updateInputOutputAnalysisWin').window('close');
};

function addSave() {
	if ($('#addInputOutputAnalysisForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/inputOutputAnalysis/save",
			data : $('#addInputOutputAnalysisForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addInputOutputAnalysisWin').window('close');
					insertRowToGrid('inputOutputAnalysisGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateInputOutputAnalysisForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/inputOutputAnalysis/update",
			data : $('#updateInputOutputAnalysisForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateInputOutputAnalysisWin').window('close');
					updateRowInGrid('inputOutputAnalysisGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#inputOutputAnalysisGrid').datagrid('getSelected');
	if (row) {
		$('#updateInputOutputAnalysisWin').window("open");
		$('#updateInputOutputAnalysisForm').form('load', row);
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#inputOutputAnalysisGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/inputOutputAnalysis/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('inputOutputAnalysisGrid');
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

$('.year').combobox({
	url : base+'/comboBox/year/inputOutputAnalysis',
	valueField : 'year',
	textField : 'year'
});

$(document).keydown(function(event){ 
	 var rowId = $('#inputOutputAnalysisGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#inputOutputAnalysisGrid").datagrid('load', param);
}


