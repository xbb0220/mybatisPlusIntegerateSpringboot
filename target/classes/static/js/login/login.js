function doctorLogin(){
		$.ajax({
			async:true,
			type : "POST",
			url : "/user/login",
			data : $("#loginForm").serialize(),
			dataType: 'json', 
			success : function(result) {
				console.info(result);
				if (result.success){
					window.location.href = "/view/index";
				}
				else{
					$("#errorMsg").text(result.msg);
				}
			}
		})	
	}

	//获得焦点时,去除错误信息
function removeErrorMsg(){
		$("#errorMsg").text("");
	}
	
//载入时设置焦点
$(function(){
		document.getElementById('username').focus();  
	});
	
	$(document).keyup(function(event) {
		//回车时点击登录
		if (event.keyCode == 13) {
			$("#submit").trigger("click");
		}
	})