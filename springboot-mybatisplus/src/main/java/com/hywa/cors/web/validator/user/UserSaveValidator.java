package com.hywa.cors.web.validator.user;

import org.springframework.beans.factory.annotation.Autowired;

import com.hywa.cors.entity.User;
import com.hywa.cors.framework.validate.Validate;
import com.hywa.cors.framework.validate.Validator;
import com.hywa.cors.service.UserService;

@Validate
public class UserSaveValidator extends Validator {

	@Autowired
	UserService userService;
	
	@Override
	protected void validate() {
		validateRequired("username", "please enter username", "请输入用户名");
		validateRequired("password", "please enter password", "请输入密码");
		User user = controller.bean(User.class);
		if (userService.getCountByEqual(user, "username") > 0) {
			addError("username already exists", "用户名已经存在");
		}
	}

}
