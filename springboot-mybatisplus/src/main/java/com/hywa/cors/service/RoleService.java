package com.hywa.cors.service;

import com.hywa.cors.entity.Role;
import com.hywa.cors.kit.easyui.EasyUiPage;
import com.hywa.cors.vo.RoleVo;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 角色 服务类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public interface RoleService extends IService<Role> {

	public EasyUiPage<RoleVo> pageByUserId(String userId, EasyUiPage<RoleVo> page);
	
}
