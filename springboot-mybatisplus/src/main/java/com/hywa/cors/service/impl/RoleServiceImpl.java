package com.hywa.cors.service.impl;

import com.hywa.cors.entity.Role;
import com.hywa.cors.kit.easyui.EasyUiPage;
import com.hywa.cors.mapper.RoleDao;
import com.hywa.cors.service.RoleService;
import com.hywa.cors.vo.RoleVo;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 角色 服务实现类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleDao, Role> implements RoleService {

	@Override
	public EasyUiPage<RoleVo> pageByUserId(String userId, EasyUiPage<RoleVo> page) {
		 page.setRecords(baseMapper.listByUserId(page, userId));
		 return page;
	}
	
}
