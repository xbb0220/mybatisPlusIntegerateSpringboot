$('#logGrid').datagrid({
    url: basePath + '/log/getPage',
    pagePosition:'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#logGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    pageSize:20,
    rownumbers:true,
    nowrap: true,
    columns:[[
        {field:'controller',title:'请求路由',width:100,sortable:true},
        {field:'method',title:'方法',width:100,sortable:true},
        {field:'params',title:'参数',width:100,sortable:true},
        {field:'result',title:'响应结果',width:100,sortable:true},
        {field:'createTime',title:'请求时间',width:100,sortable:true},
    ]]
});


function queryLog(){
	var param = {};
	generateCondition(param, $('#logQueryForm').serialize());
	$("#logGrid").datagrid('load', param);
}


function exportLog(){
	var param = {};
	generateCondition(param, $('#logQueryForm').serialize());
	$.ajax({
		   type: "POST",
		   url: basePath + "/log/export",
		   data: param,
		   success: function(result){
			   if (result){
				   window.location = basePath + "/comm/downloadFile?filePath=" + result.filePath;
			   }
		   },
		   beforeSend: function(){  
		        var win = $.messager.progress({  
	                title:'导出提示',  
	                msg:'耗时较长，请耐心等待...<br/><br/>每次最多导出10000条记录，若希望导出更多记录，请跳到下一页继续导出操作',
	                interval:3000
	            });  
		   },  
		   complete: function(){  
		        //AJAX请求完成时隐藏loading提示  
		        $(document).ready(function(){$.messager.progress('close');});  
		   }
	});
}