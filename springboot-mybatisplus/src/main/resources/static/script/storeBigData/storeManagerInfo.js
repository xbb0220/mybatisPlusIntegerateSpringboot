var cooperativesDict;
$.ajax({
	type : "get",
	url : base+"/store/nameAndId",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		cooperativesDict = obj;
	}
});

$('#storeManagerInfoGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/storeManagerInfo/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	fitColumns : true,
	toolbar : '#storeManagerInfoGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	nowrap : true,
	columns : [ [  {field : 'offlineSales',title : '日线下销售额',width : 100,sortable : true}, 
	               		{field : 'onlineSales',title : '日线上销售额',width : 100,sortable : true},
	               		{field : 'offlineUsersNum',title : '日线下用户数',width : 100,sortable : true},
	               		{field : 'onlineUsersNum',title : '日线上用户数',width : 100,sortable : true},
	               		{field : 'averageDailyBuyFrequency',title : '日购买次数',width : 100,sortable : true},
	               		{field : 'firstPurchaseMemberNum',title : '日首购会员数量',width : 100,sortable : true}, 
	               		{field : 'repurchaseMemberNum',title : '日复购会员数量',width : 100,sortable : true},
	               		{field : 'passengerFlow',title : '日人流量',width : 100,sortable : true},
	               		{field : 'onlineUsersNum',title : '日线上用户数',width : 100,sortable : true},
	               		{field : 'createTime',title : '创建时间',width : 100,sortable : true},
	               		{field : 'repurchaseRate',title : '用户复购率',width : 100,sortable : true}, 
	               		{field : 'inputCosts',title : '日成本投入',width : 100,sortable : true},
	               		{field : 'buyingUserRaiseRates',title : '日购买用户新增率',width : 100,sortable : true},
	               		{field : 'userRaiseRates',title : '日用户新增率',width : 100,sortable : true},
	               		{field : 'storeId',title : '门店名称',width : 100,sortable : true,
	               			formatter : function(value, row, index) {
	               				return dictValue(cooperativesDict, 'code', 'name', value)
	            		}}
	               		 ] ]
});

function add() {
	$('#addStoreManagerInfoForm').form('reset');
	$('#addStoreManagerInfoWin').window("open");
};

function addClose() {
	$('#addStoreManagerInfoWin').window('close');
};
function updateClose() {
	$('#updateStoreManagerInfoWin').window('close');
};

function addSave() {
	if ($('#addStoreManagerInfoForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/storeManagerInfo/save",
			data : $('#addStoreManagerInfoForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addStoreManagerInfoWin').window('close');
					insertRowToGrid('storeManagerInfoGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateStoreManagerInfoForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/storeManagerInfo/update",
			data : $('#updateStoreManagerInfoForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateStoreManagerInfoWin').window('close');
					updateRowInGrid('storeManagerInfoGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#storeManagerInfoGrid').datagrid('getSelected');
	if (row) {
		$('#updateStoreManagerInfoWin').window("open");
		$('#updateStoreManagerInfoForm').form('load', row);
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#storeManagerInfoGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/storeManagerInfo/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('storeManagerInfoGrid');
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

$(document).keydown(function(event){ 
	 var rowId = $('#storeManagerInfoGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

$('.storeId').combobox({
	url : base+'/store/nameAndId',
	valueField : 'code',
	textField : 'name'
});

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#storeManagerInfoGrid").datagrid('load', param);
}


