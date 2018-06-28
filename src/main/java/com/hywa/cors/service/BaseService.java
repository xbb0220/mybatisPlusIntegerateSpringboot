package com.hywa.cors.service;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;
import com.hywa.cors.kit.easyui.EasyUiPage;

public interface BaseService<T> extends IService<T>{
	public Integer getCountByEqual(T model, String... attrs);
	
	public T getOneByEqual(T model, String... attrs);
	
	public List<T> getListByEqual(T model, String... attrs);
	
	public List<T> getListDynamicEqual(T model, String... attrs);
	
	public EasyUiPage<T> pageByDynamicEqual(EasyUiPage<T> pageInfo, T model, String... attrs);
}
