
var menuWinSize = {width : 300, height : 300};

var operateType;

$("#addChildMenuBtn").click(function(){
	var selectedNode = $('#menuTreeGrid').treegrid('getSelected');
	var parentNode = $('#menuTreeGrid').treegrid('getParent', selectedNode.id);
	if (!selectedNode){
		pop('添加提示', '请选择上级菜单再添加！');
	}
	/*else if (parentNode){
		console.info(parentNode);
		pop('添加提示', '该菜单已经是子菜单');
	}*/
	else{
		$('#menuForm').form('reset');
		$('#menuWin').window(menuWinSize);
		$('#parentMenuIdIpt').val(selectedNode.id);
		operateType = "addChild";
	}
});

$("#saveMenuSbmt").click(function(){
	if($('#menuForm').form('validate')){
		$.ajax({
		   type: "POST",
		   url: "/menu/saveOrUpdate",
		   data: $('#menuForm').serialize(),
		   success: function(obj){
			   if (obj.success){
				   $('#menuWin').window('close');
				   if (operateType === "addChild"){
					   afterAddChildMenu(obj.data);
				   }
				   else if(operateType === "addRoot"){
					   afterAddRootMenu(obj.data);
				   }
				   else if (operateType == "update"){
					   afterUpdateMenu(obj.data);
				   }
				   pop('温馨提示',  '保存成功');
			   }
			   else{
				   pop('保存提示',  '保存失败');
			   }
			   operateType="";
		   }
		});
	}
});

function afterAddChildMenu(menu){
	var selectedNode = $('#menuTreeGrid').treegrid('getSelected');
	$('#menuTreeGrid').treegrid('append',{
		parent: selectedNode.id,  
		data: [menu]
	});
}

function afterAddRootMenu(menu){
	var rootNode = $('#menuTreeGrid').treegrid('getRoot');
	if (!rootNode){
		$('#menuTreeGrid').treegrid('reload');
		return;
	}
	$('#menuTreeGrid').treegrid('insert', {
		before: rootNode.id,
		data: menu
	});
}

function afterUpdateMenu(menu){
	$('#menuTreeGrid').treegrid('update', {
		id:  menu.id,
		row: menu
	});
}

$("#addRootMenuBtn").click(function(){
		$('#menuForm').form('reset');
		$('#menuWin').window(menuWinSize);
		operateType = "addRoot";
});

$("#updateMenuBtn").click(function(){
	var selectedNode = $('#menuTreeGrid').treegrid('getSelected');
	if (selectedNode){
		$('#menuForm').form('reset');
		$('#menuWin').window(menuWinSize);
		$('#menuForm').form('load', selectedNode);
		operateType = "update";
	}
});

$("#deleteMenuBtn").click(function(){
	var selectedNode = $('#menuTreeGrid').treegrid('getSelected');
	if (selectedNode){
		$.messager.confirm('提示信息','确定删除?',function(r){
			if (r){
				$.ajax({
					   type: "POST",
					   url: "/menu/delete?id=" + selectedNode.id,
					   success: function(obj){
						   if (obj){
							   $('#menuTreeGrid').treegrid('remove', selectedNode.id);   
							   pop('温馨提示',  '删除成功');
						   }
						   else{
							   pop('温馨提示',  '删除失败');
						   }
					   }
				});
			}
		});
	}
});

$("#closeMenuWinBtn").click(function(){
	$('#menuWin').window('close');
});

