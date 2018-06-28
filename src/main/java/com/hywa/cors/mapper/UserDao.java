package com.hywa.cors.mapper;

import com.hywa.cors.entity.User;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

/**
 * <p>
 * 用户 Mapper 接口
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public interface UserDao extends BaseMapper<User> {

	public User selectUserByUsername(String username);
	
	public List<User> list(Pagination page, @Param("user") User user);
	
}
