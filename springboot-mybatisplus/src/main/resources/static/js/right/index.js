
/* $(function(){
			openTab("首页","/pages/statis/sysIndex.jsp");
		});  */
				
		function logout(){
			 $.messager.confirm("提示", "你确定要退出系统吗?", function (r) {
                 if (r) {
                	 	window.location.href= "/user/logout";	
             	};
			})
		}
		
		function openUpdatePwdWin(){
			$("#updatePasswordForm").form("reset");
			$("#updatePasswordWin").window("open");
		}
		
		$("#updatePasswordSubBtn").click(function(){
			if($("#updatePasswordForm").form("validate")){
				$.ajax({
					   type: "POST",
					   url:  "/user/updatePwd",
					   data: $('#updatePasswordForm').serialize(),
					   success: function(obj){
						   if (obj.success){
					           $('#updatePasswordWin').window('close');
					           pop('温馨提示', "修改成功");
						   }
						   else{
							   pop('温馨提示', obj.msg);
						   }
					   }
				});
			}
		});