package com.hywa.cors.web.validator.user;

import com.hywa.cors.framework.validate.Validate;
import com.hywa.cors.framework.validate.Validator;

@Validate
public class UserLoginValidator extends Validator {

	@Override
	protected void validate() {
		validateRequired("username", "please enter your username", "请输入用户名");
		validateRequired("username", "please enter your password", "请输入密码");
	}

}
