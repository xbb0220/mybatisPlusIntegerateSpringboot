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

$('#copDistributeStatisticsGrid').datagrid({
	iconCls : "icon-save",
	url : base+'/copDistributeStatistics/page',
	pagePosition : 'bottom',
	pagination : true,
	singleSelect : true,
	toolbar : '#copDistributeStatisticsGridToolBar',
	idField : "id",
	loadMsg : "正在努力为您加载数据",
	fit : true,
	rownumbers : true,
	columns : [ [ {
		field : 'agriManageNum',
		title : '农户经营总体数量',
		width : 100,
		sortable : true
	}, {
		field : 'agriManageNumLinkRatio',
		title : '农户经营总体数量环比',
		width : 100,
		sortable : true
	}, {
		field : 'agriNum',
		title : '农户数',
		width : 100,
		sortable : true
	}, {
		field : 'company',
		title : '分司数',
		width : 100,
		sortable : true
	}, {
		field : 'cooperatives',
		title : '合作社数',
		width : 100,
		sortable : true
	}, {
		field : 'other',
		title : '其它',
		width : 100,
		sortable : true
	}, {
		field : 'applyLoanAgriNum',
		title : '申请贷款农户数',
		width : 100,
		sortable : true
	}, {
		field : 'applyLoanComNum',
		title : '申请贷款公司数',
		width : 100,
		sortable : true
	}, {
		field : 'applyLoanTotalNum',
		title : '其它',
		width : 100,
		sortable : true
	}, {
		field : 'applyLoanAgriNum',
		title : '申请贷款总额',
		width : 100,
		sortable : true
	}, {
		field : 'projectNum',
		title : '项目总数',
		width : 100,
		sortable : true
	}, {
		field : 'soilScale',
		title : '土地规模(单位：亩)',
		width : 100,
		sortable : true
	}, {
		field : 'totalInvest',
		title : '投入总计',
		width : 100,
		sortable : true
	}, {
		field : 'expectIncome',
		title : '预计收入',
		width : 100,
		sortable : true
	}, {
		field : 'expectIncomeLinkRatio',
		title : '预计收入环比',
		width : 100,
		sortable : true
	}, {
		field : 'agriSupplier',
		title : '涉农供应商(单位：家)',
		width : 100,
		sortable : true
	}, {
		field : 'agriSupplierLinkRatio',
		title : '涉农供应商环比',
		width : 100,
		sortable : true
	}, {
		field : 'agriSupplyProduct',
		title : '涉农产品(单位:种)',
		width : 100,
		sortable : true
	}, {
		field : 'expertsNum',
		title : '农技专家(单位:位)',
		width : 100,
		sortable : true
	}, {
		field : 'expertsNumLinkRatio',
		title : '农技专家环比',
		width : 100,
		sortable : true
	}, {
		field : 'financeChannel',
		title : '金融渠道(单位:个)',
		width : 100,
		sortable : true
	} , {
		field : 'financeChannelLinkRatio',
		title : '金融渠道环比',
		width : 100,
		sortable : true
	}, {
		field : 'expertsNumLinkRatio',
		title : '农技专家环比',
		width : 100,
		sortable : true
	}, {
		field : 'thingNetEquipNum',
		title : '物联网设备数(单位:个)',
		width : 100,
		sortable : true
	}, {
		field : 'thingNetEquipNumLinkRatio',
		title : '物联网设备数环比',
		width : 100,
		sortable : true
	}] ]
});

function add() {
	$('#addCopDistributeStatisticsForm').form('reset');
	$('#addCopDistributeStatisticsWin').window("open");
};

function addClose() {
	$('#addCopDistributeStatisticsWin').window('close');
};
function updateClose() {
	$('#updateCopDistributeStatisticsWin').window('close');
};

function addSave() {
	if ($('#addCopDistributeStatisticsForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base + "/copDistributeStatistics/save",
			data : $('#addCopDistributeStatisticsForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addCopDistributeStatisticsWin').window('close');
					insertRowToGrid('copDistributeStatisticsGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateCopDistributeStatisticsForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : base+"/copDistributeStatistics/update",
			data : $('#updateCopDistributeStatisticsForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateCopDistributeStatisticsWin').window('close');
					updateRowInGrid('copDistributeStatisticsGrid', obj.data);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#copDistributeStatisticsGrid').datagrid('getSelected');
	if (row) {
		$('#updateCopDistributeStatisticsForm').form('reset');
		$('#updateCopDistributeStatisticsWin').window("open");
		$('#updateCopDistributeStatisticsForm').form('load', row);
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#copDistributeStatisticsGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : base+ "/copDistributeStatistics/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('copDistributeStatisticsGrid');
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

$(document).keydown(function(event){ 
	 var rowId = $('#copDistributeStatisticsGrid').datagrid('getSelected');
	if(event.keyCode == 46 && rowId){ 
		del();
	} else {
		return;
	}
}); 

function doSearch() {
	var param = {};
	generateCondition(param, $('#queryForm').serialize());
	$("#copDistributeStatisticsGrid").datagrid('load', param);
}


