package com.hywa.cors.kit;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.toolkit.ReflectionKit;

public class WrapperKit {

	public static<T> void appendEqual(Wrapper<T> wrapper, Object model, String... attrs) {
		for (String attr : attrs) {
			Object attrValue = ReflectionKit.getMethodValue(model, attr);
			wrapper.eq(attr, attrValue);
		}
	}
	
	public static<T> void appendDynamicEqual(Wrapper<T> wrapper, Object model, String... attrs) {
		for (String attr : attrs) {
			Object attrValue = ReflectionKit.getMethodValue(model, attr);
			if (null != attrValue) {
				if (String.class.equals(attrValue.getClass())) {
					if (!StrKit.isEmpty((String)attrValue)) {
						wrapper.eq(attr, attrValue);
					}
				}
				else {
					wrapper.eq(attr, attrValue);
				}
			}
		}
	}
	
}
