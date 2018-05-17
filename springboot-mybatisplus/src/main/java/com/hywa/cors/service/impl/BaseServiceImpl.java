package com.hywa.cors.service.impl;

import java.util.List;
import org.springframework.util.CollectionUtils;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.baomidou.mybatisplus.toolkit.ReflectionKit;
import com.hywa.cors.service.BaseService;

public class BaseServiceImpl<M extends BaseMapper<T>, T> extends ServiceImpl<M, T> implements BaseService<T>{

	@Override
	public Integer getCountByEqual(T model, String... attrs) {
		Wrapper<T> wrapper = new EntityWrapper<>();
		if (null != attrs && attrs.length > 0) {
			for (String attr : attrs) {
				Object attrValue = ReflectionKit.getMethodValue(model, attr);
				wrapper.eq(attr, attrValue);
			}
		}
		return baseMapper.selectCount(wrapper);
	}

	@Override
	public T getOneByEqual(T model, String... attrs) {
		Wrapper<T> wrapper = new EntityWrapper<>();
		if (null != attrs && attrs.length > 0) {
			for (String attr : attrs) {
				Object attrValue = ReflectionKit.getMethodValue(model, attr);
				wrapper.eq(attr, attrValue);
			}
		}
		List<T> results = baseMapper.selectList(wrapper);
		return CollectionUtils.isEmpty(results) ? null : results.get(0);
	}

	@Override
	public List<T> getListByEqual(T model, String... attrs) {
		Wrapper<T> wrapper = new EntityWrapper<>();
		if (null != attrs && attrs.length > 0) {
			for (String attr : attrs) {
				Object attrValue = ReflectionKit.getMethodValue(model, attr);
				wrapper.eq(attr, attrValue);
			}
		}
		return baseMapper.selectList(wrapper);
	}

}
