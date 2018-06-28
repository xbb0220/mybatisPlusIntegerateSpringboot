/**
 * Created by geekyu on 16/1/6.
 */
$(function(){
    //左侧菜单渲染
    $.ajax({
        url: '/menu/getAdminMenu',
        type:'get',
        async: false,
        dataType:'json',
        success:function(data){
            $.each(data,function(i,item){
                var index = i;
                //渲染父菜单
                $("#sildeAccordion").accordion('add',{
                    title:item.text,
                    content: "<ul class='easyui-tree' id='tree" + index + "' data-options='animate:true'></ul>"
                }).accordion('select',0);
                //渲染子菜单
                $('#tree' + index).tree({
                    data:item.childMenus,
                    onClick: function(node){
                        openTab(node.text,node.url);
                    }
                });
            });
        }
    });
});

//增加多个面板
function openTab(nodetxt,url){
    if ($("#manageTab").tabs('exists', nodetxt)) {
        $("#manageTab").tabs('select', nodetxt);
    }else{
    	var html = '' +
        '<div title="Iframe" data-options="closable:true,fit:true" style="overflow:hidden;width:100%;height:100%;">' +
            /*'<iframe scrolling="yes" frameborder="0" src="'+ basePath + url+ '?tabName=' + nodetxt + '" style="width:100%;height:100%;"></iframe>' +*/
            '<iframe scrolling="yes" frameborder="0" src="'+ url+ '" style="width:100%;height:100%;"></iframe>' +
        '</div>';
	    $('#manageTab').tabs('add',{
	        title: nodetxt,
	        content:html,	         
	        closable: true
	    });
    }
}

