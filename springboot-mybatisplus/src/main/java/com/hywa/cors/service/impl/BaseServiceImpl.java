package com.hywa.cors.service.impl;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.hywa.cors.kit.StrKit;
import com.hywa.cors.service.BaseService;

public class BaseServiceImpl<M extends BaseMapper<T>, T> extends ServiceImpl<M, T> implements BaseService<T>{

	@Override
	public Integer getCountByEqual(T model, String... attrs) {
		Wrapper<T> wrapper = new EntityWrapper<>();
		if (null != attrs && attrs.length > 0) {
			for (String attr : attrs) {
				String getMethodName = "get" + StrKit.firstCharToUpperCase(attr);
				try {
					Method getMethod = model.getClass().getMethod(getMethodName);
					Object attrValue = getMethod.invoke(model);
					wrapper.eq(attr, attrValue);
				} catch (NoSuchMethodException | SecurityException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			}
		}
		return baseMapper.selectCount(wrapper);
	}

}
