$('#dictTypeGrid').datagrid({
    url: basePath + '/dictType/page',
    pagePosition:'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#dictTypeGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers:true,
    nowrap: true,
    columns:[[
        {field:'name',title:'类别名称',width:100,sortable:true},
        {field:'code',title:'类别代码',width:100,sortable:true},
        {field:'createTime',title:'创建时间',width:100,sortable:true},
    ]]
});

$("#addDictTypeBtn").click(function(){
	$('#dictTypeForm').form('reset');
	$('#dictTypeWin').window("open");
});


$("#saveTypeSbmt").click(function(){
	if($('#dictTypeForm').form('validate')){
		$.ajax({
			   type: "POST",
			   url: basePath + "/dictType/save",
			   data: $('#dictTypeForm').serialize(),
			   success: function(obj){
				   if (obj.success){
					   $('#dictTypeWin').window('close');
					   insertRowToGrid("dictTypeGrid",obj.result);
				   }
				   else{
					   var errorMsg = obj.msg ? obj.msg:'保存失败';
					   pop('保存提示', errorMsg);
				   }
			   }
		});
	}
});

$("#updateTypeSbmt").click(function(){
	if($('#dictTypeUpdateForm').form('validate')){
		$.ajax({
			   type: "POST",
			   url: basePath + "/dictType/update",
			   data: $('#dictTypeUpdateForm').serialize(),
			   success: function(obj){
				   if (obj.success){
					   $('#dictTypeUpdateWin').window('close');
					   updateRowInGrid("dictTypeGrid",obj.result);
					   pop('温馨提示', '修改成功');
				   }
				   else{
					   var errorMsg = obj.msg ? obj.msg:'修改失败';
					   pop('保存提示',errorMsg);
				   }
			   }
		});
	}
});

$("#updateDictTypeBtn").click(function(){
	var row = $('#dictTypeGrid').datagrid('getSelected');
	if (row){
		$('#dictTypeUpdateForm').form('reset'); 
		$('#dictTypeUpdateWin').window("open");
		$('#dictTypeUpdateForm').form('load', row);
	}else{
		pop('提示', "请选择要修改的数据！");
	}
});

$("#deleteDictTypeBtn").click(function(){
	var row = $('#dictTypeGrid').datagrid('getSelected');
	if(row){
		$.messager.confirm('提示信息','确定删除?',function(r){
			if (r){
				$.ajax({
					type: "POST",
					url: basePath + "/dictType/delete?dicttype.id=" + row.id,
					success: function(obj){
						if (obj.success){
							deleteSelectedRow("dictTypeGrid");
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

function getTypeCondtion(){
	var condition = {};
	return condition;
}


$("#dictItemConfigBtn").click(function(){
	var row = $('#dictTypeGrid').datagrid('getSelected');
	if(row){
		$('#dictItemDataGridWin').window('open');
		$('#dictItemDataGrid').datagrid({
		    url: basePath+'/dictItem/getPage?dictitem.dictTypeId='+row.id,
		    pagePosition:'bottom',
		    pagination: true,
		    singleSelect: true,
		    fitColumns: true,
		    toolbar: '#dictItemDataGridToolBar',
		    idField: "id",
		    loadMsg: "正在努力为您加载数据",
		    fit: true,
		    rownumbers:true,
		    nowrap: true,
		    columns:[[
	            {field:'des',title:'类别名称',width:100,sortable:true},
		        {field:'code',title:'类别代码',width:100,sortable:true},
		        {field:'createTime',title:'创建时间',width:100,sortable:true},
		    ]]
		});
	}
});

$("#addDictItemBtn").click(function(){
	$("#dictItemAddWin").window("open");
	$("#dictItemAddForm").form("reset");
});

$("#updateDictItemBtn").click(function(){
	var row = $('#dictItemDataGrid').datagrid('getSelected');
	if(row){
		$("#dictItemUpdateWin").window("open");
		$("#dictItemUpdateForm").form("reset");
		$("#dictItemUpdateForm").form("load",row);
	}
});

$("#saveDictItemSbmt").click(function(){
	if($('#dictItemAddForm').form('validate')){
		$.ajax({
			   type: "POST",
			   url: basePath + "/dictItem/save",
			   data: $('#dictItemAddForm').serialize()+"&dictTypeId="+$('#dictTypeGrid').datagrid('getSelected').id,
			   success: function(obj){
				   if (obj.success){
					   insertRowToGrid("dictItemDataGrid",obj.result);
					   $('#dictItemAddWin').window('close');
					   pop('温馨提示', '保存成功');
				   }
				   else{
					   pop('提示信息', '保存失败');
				   }
			   }
		});
	}
});

$("#updateDictItemSbmt").click(function(){
	if($('#dictItemUpdateForm').form('validate')){
		$.ajax({
			   type: "POST",
			   url: basePath + "/dictItem/update",
			   data: $('#dictItemUpdateForm').serialize(),
			   success: function(obj){
				   if (obj.success){
					   updateRowInGrid("dictItemDataGrid",obj.result);
					   $('#dictItemUpdateWin').window('close');
					   pop('温馨提示', '保存成功');
				   }
				   else{
					   pop('提示信息', '保存失败');
				   }
			   }
		});
	}
});

$("#deleteDictItemBtn").click(function(){
	var row = $('#dictItemDataGrid').datagrid('getSelected');
	if(row){
		$.messager.confirm('提示信息','确定删除?',function(r){
			if (r){
				$.ajax({
					type: "POST",
					url: basePath + "/dictItem/delete?dictitem.id=" + row.id,
					success: function(obj){
						if (obj.success){
							deleteSelectedRow("dictItemDataGrid");
							pop('温馨提示', '删除成功');
						}
						else{
							pop('删除提示', '删除失败');
						}
					}
				});
			}
		});
	}
});