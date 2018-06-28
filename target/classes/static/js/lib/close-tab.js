/* 双击某个tab，则关闭该tab */
$(document).ready(function() {  
    $('#manageTab').bind('dblclick',function(){  
        var title = $('.tabs-selected').text();  
        if(title=='欢迎使用'){
			return;
		}
        $('#manageTab').tabs('close',title);  
    });  
}); 
/* 当修改系统公告后，跨tab刷新数据 */
function reloadTabGrid(title)
{
    if ($('#manageTab' ).tabs('exists', title)) {
          $('#manageTab').tabs('select' , title);
          window.top.reload_Abnormal_Monitor.call();
    }
}

function reloadPatientGrid(patientId){
	window.top.reloadPatientGrid.call(patientId);
}

//关闭tab
$(function(){
	//渲染鼠标右键出现关闭tab菜单
	$('#manageTab').tabs({
        onContextMenu:function(e, title,index){
            e.preventDefault();
            if(index>0){
                $('#rcmenu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                }).data("tabTitle", title);
            }
        }
    });
    //关闭当前标签页
    $("#closecur").bind("click",function(){
        var tab = $('#manageTab').tabs('getSelected');
        var index = $('#manageTab').tabs('getTabIndex',tab);
		if(0==index || tab.text()=='欢迎使用'){
			return;
		}
        $('#manageTab').tabs('close',index);
    });
    //关闭所有标签页
    $("#closeall").bind("click",function(){
        var tablist = $('#manageTab').tabs('tabs');
        for(var i=tablist.length-1;i>0;i--){
            $('#manageTab').tabs('close',i);
        }
    });
    //关闭非当前标签页（先关闭右侧，再关闭左侧）
    $("#closeother").bind("click",function(){
        var tablist = $('#manageTab').tabs('tabs');
        var tab = $('#manageTab').tabs('getSelected');
        var index = $('#manageTab').tabs('getTabIndex',tab);
        for(var i=tablist.length-1;i>index;i--){
            $('#manageTab').tabs('close',i);
        }
        var num = index-1;
        for(var i=0;i<num;i++){
            $('#manageTab').tabs('close',1);
        }
        $('#manageTab').tabs('select',1);
    });
    //关闭当前标签页右侧标签页
    $("#closeright").bind("click",function(){
        var tablist = $('#manageTab').tabs('tabs');
        var tab = $('#manageTab').tabs('getSelected');
        var index = $('#manageTab').tabs('getTabIndex',tab);
        for(var i=tablist.length-1;i>index;i--){
            $('#manageTab').tabs('close',i);
        }
    });
    //关闭当前标签页左侧标签页
    $("#closeleft").bind("click",function(){
        var tab = $('#manageTab').tabs('getSelected');
        var index = $('#manageTab').tabs('getTabIndex',tab);
        var num = index-1;
        for(var i=0;i<num;i++){
            $('#manageTab').tabs('close',1);
        }
        $('#manageTab').tabs('select',1);
    });
});