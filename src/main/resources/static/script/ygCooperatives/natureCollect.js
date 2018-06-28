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

$('#natureCollectGrid').datagrid({
    url: base + '/natureCollect/page',
    pagePosition:'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#natureCollectGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers:true,
    nowrap: true,
    columns:[[
        {field: 'cooperativesId', title: '合作社名称', align: 'center',width: 100, sortable: true,
            formatter : function(value, row, index) {
                return dictValue(cooperativesDict, 'code', 'name', value)
            }
        },
        {field:'speed',title:'风速(单位：级）',width:100,sortable:true},
        {field:'direction',title:'风向',width:100,sortable:true},
        {field:'rainfall',title:'降雨量(单位mm)',width:100,sortable:true},
        {field:'light',title:'光照',width:100,sortable:true},
        {field:'airTemperature',title:'空气温度',width:100,sortable:true},
        {field:'soilTemperature',title:'土壤温度',width:100,sortable:true},
        {field:'airHumidity',title:'空气湿度',width:100,sortable:true},
        {field:'soilHumidity',title:'土壤湿度',width:100,sortable:true},
        {field:'createTime',title:'创建时间',width:100,sortable:true}
    ]]
});

function openSaveNatureCollectWin() {
    $('#saveNatureCollectForm').form('reset');
    $('#saveNatureCollectWin').window('open');
}

function openUpdateNatureCollectWin() {
    var row = $('#natureCollectGrid').datagrid('getSelected');
    if (row) {
        $('#updateNatureCollectForm').form('reset');
        $('#updateNatureCollectWin').window('open');
        $('#updateNatureCollectForm').form('load', row);
    } else {
        pop('提示', "请选择要修改的数据！");
    }
}

function saveNatureCollect() {
    if ($('#saveNatureCollectForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/natureCollect/save",
            data: $('#saveNatureCollectForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#saveNatureCollectWin').window('close');
                    insertRowToGrid('natureCollectGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function updateNatureCollect() {
    if ($('#updateNatureCollectForm').form('validate')) {
        $.ajax({
            type: "POST",
            url: base + "/natureCollect/update",
            data: $('#updateNatureCollectForm').serialize(),
            dataType: 'json',
            success: function (obj) {
                if (obj.success) {
                    $('#updateNatureCollectWin').window('close');
                    updateRowInGrid('natureCollectGrid', obj.data);
                    pop('温馨提示', '保存成功');
                }
                else {
                    pop('保存提示', obj.msg);
                }
            }
        });
    }
}

function deleteNatureCollect() {
    var row = $('#natureCollectGrid').datagrid('getSelected');
    if (row) {
        $.messager.confirm('提示信息', '确定删除?', function (r) {
            if (r) {
                $.ajax({
                    type: "POST",
                    url: base + "/natureCollect/delete?id=" + row.id,
                    success: function (obj) {
                        if (obj.success) {
                            deleteSelectedRow('natureCollectGrid');
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

function searchNatureCollect() {
    var param = {};
    generateCondition(param, $('#queryForm').serialize());
    $("#natureCollectGrid").datagrid('load', param);
}

function closeSaveNatureCollectWin() {
    $('#saveNatureCollectWin').window('close');
}

function closeUpdateNatureCollectWin() {
    $('#updateNatureCollectWin').window('close');
}

$('.cooperativesId').combobox({
    url : base+'/cooperatives/dict',
    valueField : 'code',
    textField : 'name'
});