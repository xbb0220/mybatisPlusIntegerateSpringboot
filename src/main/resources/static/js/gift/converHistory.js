$('#converLog').datagrid({
    url: basePath + '/conver/getPage',
    pagePosition:'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#converLogGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    rownumbers:true,
    nowrap: true,
    columns:[[
            {field:'nickname',title:'微信昵称',width:100,sortable:true},
			{field:'giftName',title:'礼物名称',width:100,sortable:true},
			{field:'giftNum',title:'礼物编号',width:100,sortable:true},
			{field:'count',title:'兑换数量',width:100,sortable:true},
			{field:'integral',title:'花费积分',width:100,sortable:true},
			{field:'claimCode',title:'兑换凭证',width:100,sortable:true},
			{field:'claim',title:'是否已经领取',width:100,sortable:true,
				  formatter:function(value,row){
					if ('Y' === value){
						return '<span style="color:red">是</span>';
					}
					if ('N' === value){
						return '<span style="color:blue">否</span>';
					}
					return value;
				}
			},
			{field:'createTime',title:'兑换时间',width:100,sortable:true},
			{field:'claimTime',title:'领取时间',width:100,sortable:true},
			]]
});


$("#converQueryBtn").click(function(){
	var param = {};
	generateCondition(param, $('#converLogFrom').serialize());
	$("#converLog").datagrid('load', param);
});


$("#claimBtn").click(function(){
	var conver = $('#converLog').datagrid("getSelected");
	if(conver && 'N'===conver.claim){
		$.messager.confirm('提示', '确定派发礼物，完成该次兑换？', function(r){
			if (r){
				  $.ajax({
					   type: "POST",
					   url: basePath + "/conver/doConver",
					   data: {'claimCode':r,'id':conver.id},
					   dataType: "json",
					   success: function(obj){
						   if(obj.success){
							   var successMsg = obj.msg?obj.msg:'领取成功，请派发礼物';
							   $.messager.alert('兑换提示',successMsg);
							   updateRowInGrid("converLog", obj.result);
						   }else{
							   var errorMsg = obj.msg?obj.msg:'礼物领取请求处理失败';
							   $.messager.alert('兑换提示',errorMsg);
						   }
					   }
				});
			}
		});
	}
});
