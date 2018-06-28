var planZoneStatus;
$.ajax({
    type: "GET",
    url: base + "/dict/plantingZoneStatus",
    cache: true,
    async: false,
    dataType: "json",
    success: function (obj) {
        planZoneStatus = obj;
    }
});

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

var type;
$.ajax({
    type: "GET",
    url: base + "/dict/plantingZoneType",
    cache: true,
    async: false,
    dataType: "json",
    success: function (obj) {
        type = obj;
    }
});
$('#plantingZoneGrid').datagrid({
    url: base + '/plantingZone/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#plantingZoneGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'cooperativesId', title: '合作社名称', align: 'center', width: 100, sortable: true,
            formatter : function(value, row, index) {
                return dictValue(cooperativesDict, 'code', 'name', value)
            }
        },
        {field: 'longitude', title: '经度', align: 'center', width: 100, sortable: true},
        {field: 'latitude', title: '纬度', align: 'center', width: 100, sortable: true},
        {field: 'status', title: '状态', align: 'center', width: 100, sortable: true,
            formatter: function (value, row, index) {
                return dictValue(planZoneStatus, 'code', 'name', value)
            }
        },
        {field: 'type', title: '种植区（设备）类型 ', align: 'center', width: 100, sortable: true,
            formatter: function (value, row, index) {
                return dictValue(type, 'code', 'name', value)
            }
        },
        {field: 'radius', title: '监控半径', align: 'center', width: 100, sortable: true,
            formatter: function (value) {
                return value+'m';
            }
        }
    ]]
});

function openSavePlantingZoneWin() {
    $('#savePlantingZoneForm').form('reset');
    $('#plantingZoneSaveWin').window('open');
}

function openUpdatePlantingZoneWin() {
    var row = $('#plantingZoneGrid').datagrid('getSelected');
    if (row) {
        $('#updatePlantingZoneForm').form('reset');
        $('#plantingZoneUpdateWin').window('open');
        $('#updatePlantingZoneForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function savePlantingZone() {
    if ($('#savePlantingZoneForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/plantingZone/save",
            data: $('#savePlantingZoneForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#plantingZoneSaveWin').window('close');
                    insertRowToGrid('plantingZoneGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function updatePlantingZone() {
    if ($('#updatePlantingZoneForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/plantingZone/update",
            data: $('#updatePlantingZoneForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#plantingZoneUpdateWin').window('close');
                    updateRowInGrid('plantingZoneGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deletePlantingZone() {
    var row = $('#plantingZoneGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base + "/plantingZone/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('plantingZoneGrid');
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

function searchPlantingZone() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#plantingZoneGrid").datagrid('load', param);
}

function closeSavePlantingZoneWin() {
    $('#plantingZoneSaveWin').window('close');
}

function closeUpdatePlantingZoneWin() {
    $('#plantingZoneUpdateWin').window('close');
}

$('.cooperativesId').combobox({
    url: base + '/cooperatives/dict',
    valueField: 'code',
    textField: 'name'
});