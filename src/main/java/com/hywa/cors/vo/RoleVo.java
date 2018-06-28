package com.hywa.cors.vo;

import com.hywa.cors.entity.Role;

public class RoleVo extends Role{
	private static final long serialVersionUID = 1L;

	private Long count;

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}
	
}
