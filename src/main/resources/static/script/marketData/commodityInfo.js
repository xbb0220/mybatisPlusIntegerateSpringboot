var marketInfoDict;
$.ajax({
	type : "get",
	url : base+"/marketInfo/dict",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		marketInfoDict = obj;
	}
});

var commodityInfoStatusDict;
$.ajax({
	type : "get",
	url : base+"/dict/commodityInfo",
	cache : true,
	async : false,
	dataType : "json",
	success : function(obj) {
		commodityInfoStatusDict = obj;
	}
});

$('.commodityInfoStatusCombo').combobox({
	data: commodityInfoStatusDict,
	valueField : 'code',
	textField : 'name'
});

$('.marketInfoCombo').combobox({
	data: marketInfoDict,
	valueField : 'code',
	textField : 'name'
});


$('#commodityInfoGrid').datagrid({
    url: base+'/commodityInfo/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#commodityInfoGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'name', title: '商品名称', align: 'center', sortable: true},
        {field: 'number', title: '当日销售数量', align: 'center', sortable: true},
        {field: 'price', title: '商品单价(元)', align: 'center', sortable: true},
        {field: 'status', title: '商品状态', align: 'center', sortable: true,
	        	formatter : function(value, row, index) {
	    			return dictValue(commodityInfoStatusDict, 'code', 'name', value)
	    		}
        },
        {field: 'createTime', title: '统计日期', align: 'center', sortable: true,
	        	formatter : function(value, row, index) {
	        		if (value){
	        			var date = value.split(" ")[0]; // yyyy-MM-dd
		        		return date;
	        		}
	        		return "";
	    		}	
        },
        {field: 'marketInfoId', title: '所属市场', align: 'center', sortable: true,
	        	formatter : function(value, row, index) {
	    			return dictValue(marketInfoDict, 'code', 'name', value)
	    		}
        }
    ]]
});


function doSearch() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#commodityInfoGrid").datagrid('load', param);
}

function openUpdateCommodityInfoWin() {
    var row = $('#commodityInfoGrid').datagrid('getSelected');
    if (row) {
        $('#updateCommodityInfoForm').form('reset');
        $('#commodityInfoUpdateWin').window('open');
        $('#updateCommodityInfoForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function closeUpdateCommodityInfoWin() {
    $('#commodityInfoUpdateWin').window('close');
}

function updateCommodityInfo() {
    if ($('#updateCommodityInfoForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/commodityInfo/update",
            data: $('#updateCommodityInfoForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#commodityInfoUpdateWin').window('close');
                    updateRowInGrid('commodityInfoGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function openSaveCommodityInfoWin() {
    $('#saveCommodityInfoForm').form('reset');
    $('#commodityInfoSaveWin').window('open');
}

function saveCommodityInfo() {
    if ($('#saveCommodityInfoForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base+"/commodityInfo/save",
            data: $('#saveCommodityInfoForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#commodityInfoSaveWin').window('close');
                    insertRowToGrid('commodityInfoGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteCommodityInfo() {
    var row = $('#commodityInfoGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base+"/commodityInfo/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('commodityInfoGrid');
                            pop('温馨提示', '删除成功');
                        }
                        else {
                            pop('删除提示', obj.msg);
                        }
                    }
                });
            }
        });
    } else {
        pop('删除提示', "请选择要删除的数据！");
    }
}

function closeSaveCommodityInfoWin() {
    $('#commodityInfoSaveWin').window('close');
}




