$(function(){
	
})
//消息信息弹出层 调用方法: AlertSuccess("提示消息") 
Messenger.options = {
  extraClasses: 'messenger-fixed messenger-theme-air messenger-on-top messenger-on-right animated bounceInDown',
  theme: 'flat'
}
//保存成功提示  
function AlertSuccess(messages){
	Messenger().post({
	  message: messages,
	  hideAfter:2,
	  hideOnNavigate: true
	});
}
//操作失败提示
function AlertError(messages){
	Messenger().post({
	  message: messages,
	  type: 'error',
	  hideAfter:2,
	  hideOnNavigate: true
	});
}

function checkNum(obj) {
    //检查是否是非数字值
    if (isNaN(obj.value)) {
        obj.value = "";
    }
    if (obj != null) {
        //检查小数点后是否对于两位
        if (obj.value.toString().split(".").length > 1 && obj.value.toString().split(".")[1].length > 2) {
            alert("小数点后多于两位！");
            obj.value = "";
        }
    }
};



