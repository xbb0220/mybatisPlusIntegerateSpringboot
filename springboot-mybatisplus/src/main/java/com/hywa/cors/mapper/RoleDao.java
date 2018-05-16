package com.hywa.cors.mapper;

import com.hywa.cors.entity.Role;
import com.hywa.cors.vo.RoleVo;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

/**
 * <p>
 * 角色 Mapper 接口
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public interface RoleDao extends BaseMapper<Role> {

	public List<RoleVo> listByUserId(Pagination page, @Param("userId") String userId);
	
}
