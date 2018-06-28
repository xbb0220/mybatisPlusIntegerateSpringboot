$(function(){
	$('#addUserWin').window('close');
	$('#updateUserWin').window('close');
	$('#roleWin').window('close');
})

$('#userGrid').datagrid({
    url: '/user/page',
    pagePosition:'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#userGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers:true,
    nowrap: true,
    columns:[[
        {field:'username',title:'用户名',width:100,sortable:true},
        {field:'realname',title:'真实姓名',width:100,sortable:true},
        {field:'phone',title:'联系电话',width:100,sortable:true},
        {field:'id',title:'其它操作',width:80,align:'center',
            formatter:function(value,row,index){
            	var roleManage = '<a href="javascript:void(0)" onclick="showMenu(\''+row.id+'\')">角色管理</a> ';
            	return roleManage;
            }
        }
    ]]
});

function add() {
	$('#addUserForm').form('reset');
	$('#addUserWin').window("open");
};

function addClose() {
	$('#addUserWin').window('close');
};
function updateClose() {
	$('#updateUserWin').window('close');
};

function addSave() {
	if ($('#addUserForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : "/user/save",
			data : $('#addUserForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#addUserWin').window('close');
					var param = {};
				    generateCondition(param, $('#addUserForm').serialize());
				    param.id=obj.data.id
				    console.info(param);
					insertRowToGrid('userGrid', param);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function updateSave() {
	if ($('#updateUserForm').form('validate')) {
		$.ajax({
			type : "POST",
			url : "/user/update",
			data : $('#updateUserForm').serialize(),
			dataType : 'json',
			success : function(obj) {
				if (obj.success) {
					$('#updateUserWin').window('close');
					var param = {};
				    generateCondition(param, $('#updateUserForm').serialize());
				    param.id=obj.data.id
					updateRowInGrid('userGrid', param);
					pop('温馨提示', '保存成功');
				} else {
					pop('保存提示', obj.msg);
				}
			}
		});
	}
};

function update() {
	var row = $('#userGrid').datagrid('getSelected');
	if (row) {
		$('#updateUserWin').window("open");
		$('#updateUserForm').form('load', row);
	} else {
		pop('提示', "请选择要修改的数据！");
	}
};

function del() {
	var row = $('#userGrid').datagrid('getSelected');
	if (row) {
		$.messager.confirm('提示信息', '确定删除?', function(r) {
			if (r) {
				$.ajax({
					type : "POST",
					url : "/user/delete?id=" + row.id,
					success : function(obj) {
						if (obj.success) {
							deleteSelectedRow('userGrid');
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

function showMenu(userId){
	$('#roleWin').window('open');
	$('#role').datagrid({
	    url: '/role/pageByUserId?userId=' + userId,
	    pagePosition:'bottom',
	    pagination: true,
	    singleSelect:false,
	    fitColumns: true,
	    idField: "id",
	    loadMsg: "正在努力为您加载数据",
	    fit: true,
	    rownumbers:true,
	    nowrap: true,
	    columns:[[
	        {field:'id',title:'选择',checkbox:true},
	        {field:'roleName',title:'角色名',width:100,sortable:true},
	        {field:'roleCode',title:'角色代码',width:100,sortable:true}
	    ]],
	    onLoadSuccess:function(data){ 
	        var rows = data.rows;
	        $("#role").datagrid("clearChecked"); 
	        $.each(rows,function(index,row){   
	            if(row.count>0){    
	                $("#role").datagrid("selectRecord", row.id);  
	            }
	        });  
	    }
	})
}


$("#closeMenuWin").click(function(){
	$('#roleWin').window('close');
});

$("#saveMenuSbmt").click(function(){
	var user = getSelectedRow('userGrid');
	var roles = $("#role").datagrid("getChecked");
	var roleIds=new Array()
	for (var i=0;i<roles.length;i++){
		roleIds[i] = roles[i].id
	}
	var relationData = {};
	relationData["userId"] = user.id
	relationData["roleIds"] = roleIds;
	$.ajax({
		type : "POST",
		async : false,
		url : "/userRole/save",
		data : relationData,
		dataType : 'json'
	});
	pop('温馨提示', '保存成功');
	$("#roleWin").window("close");
});
