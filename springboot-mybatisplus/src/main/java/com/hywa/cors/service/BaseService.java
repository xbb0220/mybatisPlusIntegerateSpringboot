package com.hywa.cors.service;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;

public interface BaseService<T> extends IService<T>{
	
	public Integer getCountByEqual(T model, String... attrs);
	
	public T getOneByEqual(T model, String... attrs);
	
	public List<T> getListByEqual(T model, String... attrs);
	
}
