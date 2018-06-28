var cooperativesDict;
$.ajax({
	type : "get",
	url : base+"/dict/messageType",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		cooperativesDict = obj;
	}
});

$('#messageGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/message/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#messageGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [ {
		field : 'id',
		title : '主键',
		width : 100,
		sortable : true
	}, {
		field : 'message',
		title : '实时信息',
		width : 100,
		sortable : true
	}, {
		field : 'expertMessage',
		title : '专家意见',
		width : 100,
		sortable : true
	}, {
		field : 'messageType',
		title : '消息类型',
		width : 100,
		sortable : true,
		formatter : function(value, row, index) {
			return dictValue(cooperativesDict, 'code', 'name', value)
		}
	}, {
		field : 'createTime',
		title : '创建时间',
		width : 100,
		sortable : true
	}
		/*formatter : function(value, row, index) {
			return dictValue(cooperativesDict, 'code', 'name', value)}*/
		
	 ] ]
});

function add() {
	$('#addMessageForm').form('reset');
	$('#addMessageWin').window("open");
};

function addClose() {
	$('#addMessageWin').window('close');
};
function updateClose() {
	$('#updateMessageWin').window('close');
};

function addSave() {
	if ($('#addMessageForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/message/save",
			data : $('#addMessageForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addMessageWin').window('close');
					insertRowToGrid('messageGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateMessageForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/message/update",
			data : $('#updateMessageForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateMessageWin').window('close');
					updateRowInGrid('messageGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#messageGrid').datagrid('getSelected');
	if (row) {
		$('#updateMessageWin').window("open");
		$('#updateMessageForm').form('load', row);
		operate = "update";
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#messageGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/message/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('messageGrid');
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

$('.messageType').combobox({
	url : base+'/dict/messageType',
	valueField : 'code',
	textField : 'name'
});

$(document).keydown(function(event){ 
	 var rowId = $('#messageGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#messageGrid").datagrid('load', param);
}


