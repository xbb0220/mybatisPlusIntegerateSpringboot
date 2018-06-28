package com.hywa.cors.framework.validate;

import java.lang.reflect.Method;

import com.alibaba.fastjson.JSON;
import com.hywa.cors.framework.SpringContext;
import com.hywa.cors.kit.AjaxJson;
import com.hywa.cors.web.BaseController;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;


@Aspect
@Component
public class FormAspect {

	
	@Around("@annotation(com.hywa.cors.framework.validate.JsonValidate)")
	@Order(1)
	public Object formValidate(ProceedingJoinPoint pjp) throws Throwable {
		Object controller = pjp.getTarget();
		if (controller instanceof BaseController){
			Method method = ((MethodSignature)pjp.getSignature()).getMethod();
			JsonValidate jsonValidate = method.getAnnotation(JsonValidate.class);
			Class<? extends Validator>[] validators = jsonValidate.value();
			for (Class<? extends Validator> validatorClass : validators){
				Validator validator = SpringContext.getBean(validatorClass);
				AjaxJson bp = validator.check((BaseController)controller);
				if (null != bp){
					if (AjaxJson.class.equals(method.getReturnType())){
						return bp;
					}
					if (method.isAnnotationPresent(ResponseBody.class) && String.class.equals(method.getReturnType())){
						return JSON.toJSONString(bp);
					}
					throw new RuntimeException("表单验证失败");
				}
			}
			return pjp.proceed();
		}
		return pjp.proceed();
	}
	
}


