$('#feedbackGrid').datagrid({
    url: basePath + '/feedback/getPage',
    pagePosition:'bottom',
    pagination: true,
    singleSelect: true,
    fitColumns: true,
    toolbar: '#feedbackGridToolBar',
    idField: "id",
    loadMsg: "正在努力为您加载数据",
    fit: true,
    pageSize:20,
    rownumbers:true,
    nowrap: true,
    columns:[[
        {field:'name',title:'用户姓名',width:80,sortable:true, align : "center"},
        {field:'satis',title:'满意程度',width:40,sortable:true, align : "center",
			formatter:function(value, row){
                if("FCMY"== value){
                    return value = "非常满意";
                }else if ("MY"==value){
					return "满意";
				}else if ("YB"==value){
					return "一般";
				}else if ("BMY"==value){
					return "不满意";
				}else if ("FCBMY"==value){
					return "非常不满意";
				}else{
                	return value;
                }
            }},
        {field:'contactWay',title:'联系方式',width:100,sortable:true, align : "center"},
        {field:'advice',title:'建议内容',width:700,sortable:true},
        {field:'createTime',title:'反馈时间',width:100,sortable:true, align : "center"},
        {title : "操作",  field : "opt", width :30, align : "center", 
			formatter:function(value, row){
	        	var value = "";
	        	value += "<span class='icon_Modify'><a onClick='lookDetail(\""+row.id+"\");' href='#'>查看</a></span>"; 
	        	return value;
		    }
		}]]
});


function queryfeedback(){
	var param = {};
	generateCondition(param, $('#feedbackQueryForm').serialize());
	$("#feedbackGrid").datagrid('load', param);
}

function lookDetail(feedbackId){
	 $('#openXXXIframe')[0].src=basePath + "/feedback/getById?feedBack.id=" + feedbackId;
	 $('#openRoleDiv').dialog('open');
}
