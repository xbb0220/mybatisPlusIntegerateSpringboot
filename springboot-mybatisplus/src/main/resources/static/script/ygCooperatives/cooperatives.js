var cooperativeManageTypeDict;
$.ajax({
    type: "get",
    url: base + "/dict/cooperativeManageType",
    cache: true,
    async: false,
    dataType: "json",
    success: function (obj) {
        cooperativeManageTypeDict = obj;
    }
});

var cooperativeBuidStateDict;
$.ajax({
    type: "get",
    url: base + "/dict/cooperativeBuidState",
    cache: true,
    async: false,
    dataType: "json",
    success: function (obj) {
        cooperativeBuidStateDict = obj;
    }
});

$('#cooperativesGrid').datagrid({
    url: base + '/cooperatives/page',
    pagePosition: 'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#cooperativesGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers: true,
    nowrap: true,
    columns: [[
        {field: 'id', title: '合作社ID', align: 'center', sortable: true},
        {field: 'name', title: '合作社名称', align: 'center', sortable: true},
        {field: 'position', title: '位置', align: 'center', sortable: true},
        {field: 'sensorNum', title: '传感器数量', align: 'center', sortable: true},
        {field: 'landNum', title: '土地编号', align: 'center', sortable: true},
        {field: 'farmerNum', title: '农户数量', align: 'center', sortable: true},
        {field: 'standardAirTem', title: '标准空气温度', align: 'center', sortable: true},
        {field: 'standardRainfall', title: '标准降雨量', align: 'center', sortable: true},
        {field: 'standardLight', title: '标准光照度', align: 'center', sortable: true},
//        {field: 'longitude', title: '经度', align: 'center', sortable: true},
//        {field: 'latitude', title: '纬度', align: 'center', sortable: true},
        {
            field: 'manageType', title: '经营类型', align: 'center', sortable: true,
            formatter: function (value, row, index) {
                return dictValue(cooperativeManageTypeDict, 'code', 'name', value)
            }
        },
        {
            field: 'buildState', title: '建设状况', align: 'center', sortable: true,
            formatter: function (value, row, index) {
                return dictValue(cooperativeBuidStateDict, 'code', 'name', value)
            }
        },
        {field: 'honor', title: '合作社荣誉', align: 'center', sortable: true},
        {field: 'standardSoilTem', title: '标准土壤温度', align: 'center', sortable: true}
    ]]
});

function doSearch() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#cooperativesGrid").datagrid('load', param);
}

function openUpdateCooperativeWin() {
    var row = $('#cooperativesGrid').datagrid('getSelected');
    if (row) {
        $('#updateCooperativesForm').form('reset');
        $('#cooperativesUpdateWin').window('open');
        $('#updateCooperativesForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function closeUpdateCooperativesWin() {
    $('#cooperativesUpdateWin').window('close');
}

function updateCooperatives() {
    if ($('#updateCooperativesForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/cooperatives/update",
            data: $('#updateCooperativesForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#cooperativesUpdateWin').window('close');
                    updateRowInGrid('cooperativesGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function openSaveCooperativeWin() {
    $('#saveCooperativesForm').form('reset');
    $('#cooperativesSaveWin').window('open');
}

function saveCooperatives() {
    if ($('#saveCooperativesForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/cooperatives/save",
            data: $('#saveCooperativesForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#cooperativesSaveWin').window('close');
                    insertRowToGrid('cooperativesGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteCooperatives() {
    var row = $('#cooperativesGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base + "/cooperatives/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('cooperativesGrid');
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

function closeSaveCooperativesWin() {
    $('#cooperativesSaveWin').window('close');
}

function openUpdateCooperativeCoordinate() {
    var row = $('#cooperativesGrid').datagrid('getSelected');
    if (row) {
        $('#coordinateJsonForm').form('reset');
        $('#cooperativeCoordinateWin').window('open');
        $.ajax({
            type: "GET",
            url: base + "/cooperatives/inquireLocation/" + row.id,
            async: true,
            success: function (obj) {
                if (obj.success) {
                    var arrData = obj.data;
                    var jsonData = JSON.stringify(arrData);
                    $('#coordinateJsonForm').form('load', {coordinateJson: jsonData});
                }
            }
        });
    } else {
        pop('提示', "请选择一个合作社！");
    }
}

function updateCooperativeCoordinateJson() {
    var row = $('#cooperativesGrid').datagrid('getSelected');
    if ($('#coordinateJsonForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/cooperatives/updateLocation/" + row.id,
            data: $('#coordinateJsonForm').serialize(),
            dataType: 'json',
            async: false,
            success: function (obj) {
                if (obj.success) {
                    $('#cooperativeCoordinateWin').window('close');
                    pop('温馨提示', '修改成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function closeCooperativeCoordinateWin() {
    $('#cooperativeCoordinateWin').window('close')
}

$('.id').combobox({
    url: base + '/cooperatives/dict',
    valueField: 'code',
    textField: 'name'
});





