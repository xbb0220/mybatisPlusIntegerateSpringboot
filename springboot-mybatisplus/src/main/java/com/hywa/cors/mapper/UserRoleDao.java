package com.hywa.cors.mapper;

import com.hywa.cors.entity.UserRole;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
 * 用户角色关系表 Mapper 接口
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public interface UserRoleDao extends BaseMapper<UserRole> {

	Integer deleteByUserId(@Param("userId")String userId);
	
}
