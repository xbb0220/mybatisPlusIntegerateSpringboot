package com.hywa.cors.web;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hywa.cors.entity.UserRole;
import com.hywa.cors.kit.AjaxJson;
import com.hywa.cors.service.UserRoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * <p>
 * 用户角色关系表 前端控制器
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Controller
@RequestMapping("/userRole")
public class UserRoleController extends BaseController{

	@Autowired
	UserRoleService userRoleService;
	
	@RequestMapping("/save")
	@ResponseBody
	public AjaxJson save(String userId) {
		String[] roleIds = getParaValues("roleIds[]");
		userRoleService.deleteByUserId(userId);
		if (null != roleIds) {
			for (String roleId : roleIds) {
				UserRole userRole = new UserRole();
				userRole.setUserId(userId);
				userRole.setRoleId(roleId);
				userRoleService.insert(userRole);
			}
		}
		return AjaxJson.success();
	}
	
}
