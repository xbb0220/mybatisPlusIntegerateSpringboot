package com.hywa.cors.framework;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationEvent;
import org.springframework.stereotype.Component;

/**
 * spring容器加载工具类
 * 
 * @author lcc
 *
 */
@Component
public class SpringContext implements ApplicationContextAware {

	private static ApplicationContext context;

	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		SpringContext.setContext(context);
	}

	public static ApplicationContext getContext() {
		return context;
	}

	private static void setContext(ApplicationContext context) {
		SpringContext.context = context;
	}

	public static Object getBean(String beanName) {
		Object obj = getContext().getBean(beanName);
		return obj;
	}

	public static <T> T getBean(String beanName, Class<T> type) {
		T obj = getContext().getBean(beanName, type);
		return obj;
	}
	
	public static <T> T getBean(Class<T> type) {
		T obj = getContext().getBean(type);
		return obj;
	}

	public static void pushEvent(ApplicationEvent event){
		context.publishEvent(event);
	}
	
}

