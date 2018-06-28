package com.hywa.cors.vo;

import com.hywa.cors.entity.Menu;

import java.util.List;

public class MenuVo extends Menu {
	private static final long serialVersionUID = 1L;

	private Boolean checked;
	private String state;
	private List<MenuVo> children;
	private List<MenuVo> childMenus;
	
	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}

	public List<MenuVo> getChildren() {
		return children;
	}

	public void setChildren(List<MenuVo> children) {
		this.children = children;
	}

	public List<MenuVo> getChildMenus() {
		return childMenus;
	}

	public void setChildMenus(List<MenuVo> childMenus) {
		this.childMenus = childMenus;
	}

}
