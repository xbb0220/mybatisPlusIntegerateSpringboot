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

$('#cooperativesPlanGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/cooperativesPlan/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#cooperativesPlanGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [ {
		field : 'plant',
		title : '种植(稻谷、小麦、猕猴桃）',
		width : 100,
		sortable : true
	}, {
		field : 'scale',
		title : '规模（单位：亩）',
		width : 100
	}, {
		field : 'plantDuration',
		title : '种值时间(单位：月）',
		width : 100
	}, {
		field : 'expectInvest',
		title : '投入预算',
		width : 100
	}, {
		field : 'expectOutput',
		title : '产出预估（单位：吨）',
		width : 100
	}, {
		field : 'harvestTime',
		title : '收割时间（单位：月）',
		width : 100
	}, {
		field : 'createTime',
		title : '创建时间',
		width : 100
	},{
		field : 'cooperativesId',
		title : '合作社',
		width : 100,
		sortable : true,
		formatter : function(value, row, index) {
			return dictValue(cooperativesDict, 'code', 'name', value)
		}}] ]
});

function add() {
	$('#addCooperativesPlanForm').form('reset');
	$('#addCooperativesPlanWin').window("open");
};

function addClose() {
	$('#addCooperativesPlanWin').window('close');
};
function updateClose() {
	$('#updateCooperativesPlanWin').window('close');
};

function addSave() {
	if ($('#addCooperativesPlanForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/cooperativesPlan/save",
			data : $('#addCooperativesPlanForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addCooperativesPlanWin').window('close');
					insertRowToGrid('cooperativesPlanGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateCooperativesPlanForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/cooperativesPlan/update",
			data : $('#updateCooperativesPlanForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateCooperativesPlanWin').window('close');
					updateRowInGrid('cooperativesPlanGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#cooperativesPlanGrid').datagrid('getSelected');
	if (row) {
		$('#updateCooperativesPlanWin').window("open");
		$('#updateCooperativesPlanForm').form('load', row);
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#cooperativesPlanGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/cooperativesPlan/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('cooperativesPlanGrid');
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
	 var rowId = $('#cooperativesPlanGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#cooperativesPlanGrid").datagrid('load', param);
}


