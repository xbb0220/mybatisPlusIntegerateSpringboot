$(function(){
	$('#menuTreeWin').window('close');
})

$('#roleGrid').datagrid({
    url: '/role/page',
    pagePosition:'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#roleGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers:true,
    nowrap: true,
    columns:[[
        {field:'roleName',title:'角色名',width:100,sortable:true},
        {field:'roleCode',title:'角色代码',width:100,sortable:true},
        {field:'id',title:'其它操作',width:80,align:'center',
            formatter:function(value,row,index){
            	var menuManage = '<a href="javascript:void(0)" onclick="showMenuTree(\''+row.id+'\')">菜单管理</a> ';
            	return menuManage;
            }
        }
    ]]
});

var roleWinSize = { width:300, height:150 };
var operate = "";
$("#addRoleBtn").click(function(){
	$('#roleForm').form('reset');
	$('#roleWin').window(roleWinSize);
	operate="save";
});

$("#closeRoleWin").click(function(){
	$('#roleWin').window('close');
});

$("#saveRoleSbmt").click(function(){
	if($('#roleForm').form('validate')){
		$.ajax({
			   type: "POST",
			   url: "/role/saveOrUpdate",
			   data: $('#roleForm').serialize(),
			   dataType:'json',
			   success: function(obj){
				   if (obj.success){
					   $('#roleWin').window('close');
					   if (operate === "save"){
						   $('#roleGrid').datagrid('insertRow',{
								index: 0,	
								row: obj.data
							});
					   }
					   else if (operate === "update"){
						   var row = $('#roleGrid').datagrid('getSelected');
						   var ind = $('#roleGrid').datagrid('getRowIndex', row);
						   $('#roleGrid').datagrid('updateRow',{
								index: ind,	
								row: obj.data
							});
					   }
					   pop('温馨提示', '保存成功');
				   }
				   else{
					   pop('保存提示', obj.msg);
				   }
				   operate="";
			   }
		});
	}
});

$("#updateRoleBtn").click(function(){
	var row = $('#roleGrid').datagrid('getSelected');
	if (row){
		$('#roleCombox').combobox('reload');
		$('#roleForm').form('reset'); 
		$('#roleWin').window(roleWinSize);
		$('#roleForm').form('load', row);
		operate="update";
	}else{
		pop('提示', "请选择要修改的数据！");
	}
});

$("#deleteRoleBtn").click(function(){
	var row = $('#roleGrid').datagrid('getSelected');
	if(row){
		$.messager.confirm('提示信息','确定删除?',function(r){
			if (r){
				$.ajax({
					type: "POST",
					url: "/role/delete?id=" + row.id,
					success: function(obj){
						if (obj.success){
							var row = $('#roleGrid').datagrid('getSelected');
							var ind = $('#roleGrid').datagrid('getRowIndex', row);
							$('#roleGrid').datagrid('deleteRow', ind); 
							pop('温馨提示', '删除成功');
						}
						else{
							pop('删除提示', obj.msg);
						}
					}
				});
			}
		});
	}else{
		pop('删除提示', "请选择要删除的数据！");
	}
});

function getRoleCondtion(){
	var condition = {};
	return condition;
}

function showMenuTree(roleId){
	$('#menuTree').tree({
	    url: '/menu/renderRoleMenuTree?id=' + roleId,
	    checkbox: true
	});
	$('#menuTreeWin').window( { width:300, height:400 });
}

$("#closeMenuTreeWin").click(function(){
	$('#menuTreeWin').window('close');
});

$("#saveMenuTreeSbmt").click(function(){
	var row = $('#roleGrid').datagrid('getSelected');
	var checkedNodes = $('#menuTree').tree('getChecked', ['checked','indeterminate']);
	var menuIds = new Array();
	for (i = 0 ; i < checkedNodes.length; i++){
		menuIds[i] = checkedNodes[i].id;
	}
	var param = {"roleId": row.id, "menuIds": menuIds};
	$.ajax({
		   type: "POST",
		   url: "/menu/initRoleMenu",
		   data: param,
		   success: function(obj){
			   if (obj.success){
				   $('#menuTreeWin').window('close');
				   pop('温馨提示', '保存成功');
			   }
			   else{
				   pop('提示信息', '修改菜单失败');
			   }
		   }
	});
});
