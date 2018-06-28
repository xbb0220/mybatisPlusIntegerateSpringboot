package com.hywa.cors.service;

import com.hywa.cors.entity.UserRole;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 用户角色关系表 服务类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public interface UserRoleService extends IService<UserRole> {

	Integer deleteByUserId(@Param("userId")String userId);
	
}
