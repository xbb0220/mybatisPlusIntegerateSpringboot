package com.hywa.cors.kit;

import java.lang.reflect.Method;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.hywa.cors.kit.converter.TypeConverter;


public class Injector {
	
	private static <T> T createInstance(Class<T> objClass) {
		try {
			return objClass.newInstance();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public static <T> T injectBean(Class<T> beanClass, HttpServletRequest request, boolean skipConvertError) {
		String beanName = beanClass.getSimpleName();
		return (T)injectBean(beanClass, StrKit.firstCharToLowerCase(beanName), request, skipConvertError);
	}
	
	@SuppressWarnings("unchecked")
	public static final <T> T injectBean(Class<T> beanClass, String beanName, HttpServletRequest request, boolean skipConvertError) {
		Object bean = createInstance(beanClass);
		String modelNameAndDot = StrKit.notBlank(beanName) ? beanName + "." : null;
		TypeConverter converter = TypeConverter.me();
		Map<String, String[]> parasMap = request.getParameterMap();
		Method[] methods = beanClass.getMethods();
		for (Method method : methods) {
			String methodName = method.getName();
			if (methodName.startsWith("set") == false || methodName.length() <= 3) {	// only setter method
				continue;
			}
			Class<?>[] types = method.getParameterTypes();
			if (types.length != 1) {						// only one parameter
				continue;
			}
			
			String attrName = StrKit.firstCharToLowerCase(methodName.substring(3));
			String paraName = modelNameAndDot != null ? modelNameAndDot + attrName : attrName;
			if (parasMap.containsKey(paraName)) {
				try {
					String paraValue = request.getParameter(paraName);
					Object value = paraValue != null ? converter.convert(types[0], paraValue) : null;
					method.invoke(bean, value);
				} catch (Exception e) {
					if (skipConvertError == false) {
						throw new RuntimeException(e);
					}
				}
			}
		}
		
		return (T)bean;
	}
}
