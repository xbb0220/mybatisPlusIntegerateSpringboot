package com.hywa.cors.service.impl;

import com.hywa.cors.entity.UserRole;
import com.hywa.cors.mapper.UserRoleDao;
import com.hywa.cors.service.UserRoleService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户角色关系表 服务实现类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Service
public class UserRoleServiceImpl extends ServiceImpl<UserRoleDao, UserRole> implements UserRoleService {

	@Override
	public Integer deleteByUserId(String userId) {
		return baseMapper.deleteByUserId(userId);
	}

}
