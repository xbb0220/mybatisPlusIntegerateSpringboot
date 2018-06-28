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

$('#soilManageGrid').datagrid({
    url: base + '/soilManage/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#soilManageGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'nitrogen', title: '氮', align: 'center', width: 100, sortable: true},
        {field: 'phosphorus', title: '磷', align: 'center', width: 100, sortable: true},
        {field: 'potassium', title: '钾', align: 'center', width: 100, sortable: true},
        {field: 'year', title: '年份', align: 'center', width: 100, sortable: true},
        {field: 'cooperativesId', title: '合作社名称', align: 'center',width: 100, sortable: true,
            formatter : function(value, row, index) {
                return dictValue(cooperativesDict, 'code', 'name', value)
            }
        }
    ]]
});

function openSaveSoilManageWin() {
    $('#saveSoilManageForm').form('reset');
    $('#soilManageSaveWin').window('open');
}

function openUpdateSoilManageWin() {
    var row = $('#soilManageGrid').datagrid('getSelected');
    if (row) {
        $('#updateSoilManageForm').form('reset');
        $('#soilManageUpdateWin').window('open');
        $('#updateSoilManageForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function saveSoilManage() {
    if ($('#saveSoilManageForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/soilManage/save",
            data: $('#saveSoilManageForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#soilManageSaveWin').window('close');
                    insertRowToGrid('soilManageGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function updateSoilManage() {
    if ($('#updateSoilManageForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/soilManage/update",
            data: $('#updateSoilManageForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#soilManageUpdateWin').window('close');
                    updateRowInGrid('soilManageGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteSoilManage() {
    var row = $('#soilManageGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base + "/soilManage/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('soilManageGrid');
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

function searchSoilManage() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#soilManageGrid").datagrid('load', param);
}

function closeSaveSoilManageWin() {
    $('#saveSoilManageWin').window('close');
}

function closeUpdateSoilManageWin() {
    $('#soilManageUpdateWin').window('close');
}

$('.cooperativesId').combobox({
    url : base+'/cooperatives/dict',
    valueField : 'code',
    textField : 'name'
});