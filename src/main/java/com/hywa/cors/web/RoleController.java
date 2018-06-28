package com.hywa.cors.web;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hywa.cors.entity.Role;
import com.hywa.cors.kit.AjaxJson;
import com.hywa.cors.kit.StrKit;
import com.hywa.cors.kit.easyui.EasyUiPage;
import com.hywa.cors.service.RoleService;
import com.hywa.cors.vo.RoleVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * <p>
 * 角色 前端控制器
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Controller
@RequestMapping("/role")
public class RoleController {

	@Autowired
	RoleService roleService;
	
	@RequestMapping("pageByUserId")
	@ResponseBody
	public EasyUiPage<RoleVo> pageByUserId(String userId, EasyUiPage<RoleVo> page) {
		return roleService.pageByUserId(userId, page);
	}
	
	@RequestMapping("page")
	@ResponseBody
	public EasyUiPage<Role> page(EasyUiPage<Role> page, Role role) {
		roleService.selectPage(page);
		return page;
	}
	
	@RequestMapping("saveOrUpdate")
	@ResponseBody
	public AjaxJson saveOrUpdate(Role role){
		boolean flag = false;
		if (StrKit.isEmpty(role.getId())){
			flag = roleService.insert(role);
		}
		else{
			flag =roleService.updateById(role);
		}
		AjaxJson aj = flag ? AjaxJson.success().setData(role) : AjaxJson.failure();
		return aj;
	}
	
	@RequestMapping("delete")
	@ResponseBody
	public AjaxJson delete(Role role){
		boolean flag = roleService.deleteById(role.getId());
		AjaxJson aj = flag ? AjaxJson.success().setData(role) : AjaxJson.failure();
		return aj;
	}
	
}
