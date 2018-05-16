package com.hywa.cors.service;

import com.baomidou.mybatisplus.service.IService;

public interface BaseService<T> extends IService<T>{
	
	public Integer getCountByEqual(T model, String... attr);
	
}
