/**
 * Created by geekyu on 16/1/15.
 */
function alerMsg(msg){
    var html = '<div class="mod_alertInfo animated fadeIn"><div class="ai_cont">'+msg+'</div></div>';
    $("body").append(html);
    setTimeout(function(){
        $(".mod_alertInfo").remove();
    },1100);
}
