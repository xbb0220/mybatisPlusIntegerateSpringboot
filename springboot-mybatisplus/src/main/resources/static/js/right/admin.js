$('#adminGrid').datagrid({
    url: basePath + '/admin/getPage',
    pagePosition:'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#adminGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers:true,
    nowrap: true,
    columns:[[
        {field:'sysName',title:'登录名',width:100,sortable:true},
        {field:'realName',title:'真实姓名',width:100,sortable:true},
        /* {field:'sex',title:'性别',width:100,sortable:true,
        	formatter:function(value,row){
        		if ('M' === value){
        			return '男';
        		}
        		if ('W' === value){
        			return '女';
        		}
        		return value;
			}
        },
        {field:'cellphone',title:'联系电话',width:100,sortable:true},
        {field:'nation',title:'民族',width:100,sortable:true},
        {field:'jobTitle',title:'职务',width:100,sortable:true},
        {field:'email',title:'电子邮箱',width:100,sortable:true},
        {field:'entryDate',title:'入职时间',width:100,sortable:true},
        {field:'birthday',title:'生日',width:100,sortable:true},
        {field:'roleName',title:'角色',width:100,sortable:true},
        {field:'branchName',title:'部门名称',width:100,sortable:true},
        {field:'state',title:'是否在职',width:100,sortable:true,
        	formatter:function(value,row){
        		if ('Y' === value){
        			return '是';
        		}
        		if ('N' === value){
        			return '否';
        		}
        		return value;
			}
        }*/
    ]]
});

var adminWinSize = { width:297, height:450 };
$("#addAdminBtn").click(function(){
	$('#adminForm').form('reset')
	$('#roleCombox').combobox('reload');
	$('#adminWin').window('open');
});

$("#closeAdminWin").click(function(){
	$('#adminWin').window('close');
});

$("#saveAdminSbmt").click(function(){
	if ($("#adminForm").form('validate')){
		$.ajax({
			   type: "POST",
			   url: basePath + "/admin/save",
			   data: $('#adminForm').serialize(),
			   dataType: "json",
			   success: function(obj){
				   if (obj.success){
					   $('#adminWin').window('close');
					   insertRowToGrid("adminGrid",obj.result);
					   pop('提示', '保存成功');
				   }
				   else{
					   var errorMsg = obj.msg ? obj.msg : '保存失败';
					   pop('提示', errorMsg);
				   }
			   }
		});
	}
});


$("#updateAdminSbmt").click(function(){
	if ($("#adminUpdateForm").form('validate')){
		$.ajax({
			   type: "POST",
			   url: basePath + "/admin/update",
			   data: $('#adminUpdateForm').serialize(),
			   dataType: "json",
			   success: function(obj){
				   if (obj.success){
					   $('#adminUpdateWin').window('close');
					   updateRowInGrid("adminGrid",obj.result);
					   pop('提示', '保存成功');
				   }
				   else{
					   var errorMsg = obj.msg ? obj.msg : '保存失败';
					   pop('提示', errorMsg);
				   }
			   }
		});
	}
});


$("#updateAdminBtn").click(function(){
	var row = $('#adminGrid').datagrid('getSelected');
	if (row){
		$('#roleCombox').combobox('reload');
		$('#adminUpdateForm').form('reset'); 
		$('#adminUpdateForm').form('load', row);
		$('#adminUpdateWin').window('open');
	}
});

$("#resetAdminPwdBtn").click(function(){
	var row = $('#adminGrid').datagrid('getSelected');
	if (row){
		$.messager.confirm('系统提示','确定要为选中的用户重置登录密码?',function(r){
			if (r){
				$.ajax({
					   type: "POST",
					   url: basePath + "/admin/resetPwd",
					   data: {"admin.id":row.id},
					   dataType: "json",
					   success: function(obj){
						   if (obj.success){
							   pop('提示', '密码修改成功');
						   }
						   else{
							   pop('提示', '密码修改失败');
						   }
					   }
				});
			}
		});
	}else{
		pop('提示', '请选择一个用户');
	}
});

$("#closeUpdatePwdWin").click(function(){
	$('#updatePwdWin').window('close');
});

$("#deleteAdminBtn").click(function(){
	$.messager.confirm('提示信息','确定删除?',function(r){
		if (r){
			var row = $('#adminGrid').datagrid('getSelected');
			$.ajax({
				   type: "POST",
				   url: basePath + "/admin/delete?admin.id=" + row.id,
				   dataType: "json",
				   success: function(obj){
					   if (obj.success){
						   deleteSelectedRow("adminGrid");
						   pop('温馨提示', '删除成功');
					   }
					   else{
						   pop('温馨提示', obj.msg);           
					   }
					   
				   }
			});
		}
	});
});

$("#roleConfigBtn").click(function(){
	var row = $('#adminGrid').datagrid('getSelected');
	if(row){
		$("#roleInfoWin").window('open');
		$('#roleInfoGrid').datagrid({
			url:basePath + "/adminRole/getPage/"+row.id,
			pagePosition:'bottom',
		    pagination: true,
		    singleSelect: true,
		    fitColumns: true,
		    toolbar: '#roleInfoGridToolBar',
		    idField: "id",
		    loadMsg: "正在努力为您加载数据",
		    fit: true,
		    rownumbers:true,
		    nowrap: true,
			columns:[[
			          {field:'name',title:'角色名称',width:200},
			          {field:'configed',title:'操作',width:100,align:'right',
			        	  formatter: function(value,row,index){
							if (!value){
								return "<a href='javascript:config(\""+row.id+"\",\"save\");'>配置</a>";
							} else{
								return "<a style='color:red' href='javascript:config(\""+row.id+"\",\"delete\");'>移除</a>";
							} 
						}}
		          ]]
		});
	}
});

notLimit = true;
function config(roleId,operate){
	if(notLimit){
		notLimit = false;
		var row = $('#adminGrid').datagrid('getSelected');
		$.ajax({
			   type: "POST",
			   url: basePath + "/adminRole/"+operate,
			   data:{"adminId":row.id,"roleId":roleId},
			   dataType: "json",
			   success: function(obj){
				   notLimit = true;
				   if (obj.success){
					   var role = $('#roleInfoGrid').datagrid('getSelected');
					   var index = $('#roleInfoGrid').datagrid('getRowIndex',role);
					   role.configed = !role.configed;
					   $('#roleInfoGrid').datagrid('updateRow',{
							index: index,
							row: role
						});
					   pop('提示', '操作成功');
				   }
				   else{
					   pop('提示', "操作失败");           
				   }
			   }
		});
		
	}
}

$("#roleInfoQueryBtn").click(function(){
	var param = {};
	generateCondition(param, $('#roleInfoQueryForm').serialize());
	$("#roleInfoGrid").datagrid('load', param);
});

$("#adminQueryBtn").click(function(){
	var param = {};
	generateCondition(param, $('#adminQueryFrom').serialize());
	$("#adminGrid").datagrid('load', param);
});

