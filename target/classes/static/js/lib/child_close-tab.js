/* 双击某个tab，则关闭该tab */
$(document).ready(function() {  
    $('#pathogCont').bind('dblclick',function(){  
       /* var title = $('.tabs-selected').text();  
        if(title=='欢迎使用'){
			return;
		}
        $('#pathogCont').tabs('close',title);*/  
        var tab = $('#pathogCont').tabs('getSelected');
        var index = $('#pathogCont').tabs('getTabIndex',tab);
        $('#pathogCont').tabs('close',index);
        $('#pathogCont').tabs('select',index);
    });  
}); 

//关闭tab
$(function(){
	//渲染鼠标右键出现关闭tab菜单
	$('#pathogCont').tabs({
        onContextMenu:function(e, title,index){
            e.preventDefault();
            if(index>=0){
                $('#rcmenu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                }).data("tabTitle", title);
            }
        }
    });
    //关闭当前标签页
    $("#closecur").bind("click",function(){
        var tab = $('#pathogCont').tabs('getSelected');
        var index = $('#pathogCont').tabs('getTabIndex',tab);
		/*if(0==index || tab.text()=='欢迎使用'){
			return;
		}*/
        $('#pathogCont').tabs('close',index);
        $('#pathogCont').tabs('select',index);
    });
    //关闭所有标签页
    $("#closeall").bind("click",function(){
        var tablist = $('#pathogCont').tabs('tabs');
        for(var i=tablist.length-1;i>=0;i--){
            $('#pathogCont').tabs('close',i);
        }
    });
    //关闭非当前标签页（先关闭右侧，再关闭左侧）
    $("#closeother").bind("click",function(){
        var tablist = $('#pathogCont').tabs('tabs');
        var tab = $('#pathogCont').tabs('getSelected');
        var index = $('#pathogCont').tabs('getTabIndex',tab);
        for(var i=tablist.length-1;i>index;i--){
            $('#pathogCont').tabs('close',i);
        }
        var num = index-1;
        for(var i=0;i<=num;i++){
            $('#pathogCont').tabs('close',0);
        }
        $('#pathogCont').tabs('select',0);
    });
});