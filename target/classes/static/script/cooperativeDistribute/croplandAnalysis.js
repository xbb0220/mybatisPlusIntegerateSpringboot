var cooperativesDict;
$.ajax({
	type : "get",
	url : base+"/dict/croplandType",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		cooperativesDict = obj;
	}
});

$('#croplandAnalysisGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/croplandAnalysis/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#croplandAnalysisGridToolBar',
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
		title : '农作物类型',
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
	$('#addCroplandAnalysisForm').form('reset');
	$('#addCroplandAnalysisWin').window("open");
};

function addClose() {
	$('#addCroplandAnalysisWin').window('close');
};
function updateClose() {
	$('#updateCroplandAnalysisWin').window('close');
};

function addSave() {
	if ($('#addCroplandAnalysisForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/croplandAnalysis/save",
			data : $('#addCroplandAnalysisForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addCroplandAnalysisWin').window('close');
					insertRowToGrid('croplandAnalysisGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateCroplandAnalysisForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/croplandAnalysis/update",
			data : $('#updateCroplandAnalysisForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateCroplandAnalysisWin').window('close');
					updateRowInGrid('croplandAnalysisGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#croplandAnalysisGrid').datagrid('getSelected');
	if (row) {
		$('#updateCroplandAnalysisWin').window("open");
		$('#updateCroplandAnalysisForm').form('load', row);
		operate = "update";
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#croplandAnalysisGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/croplandAnalysis/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('croplandAnalysisGrid');
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
	url : base+'/dict/croplandType',
	valueField : 'code',
	textField : 'name'
});

$('.year').combobox({
	url : base+'/comboBox/year/croplandAnalysis',
	valueField : 'year',
	textField : 'year'
});

$(document).keydown(function(event){ 
	 var rowId = $('#croplandAnalysisGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#croplandAnalysisGrid").datagrid('load', param);
}


