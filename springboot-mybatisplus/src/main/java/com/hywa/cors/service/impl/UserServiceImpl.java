package com.hywa.cors.service.impl;

import com.hywa.cors.entity.User;
import com.hywa.cors.kit.easyui.EasyUiPage;
import com.hywa.cors.mapper.UserDao;
import com.hywa.cors.service.UserService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户 服务实现类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<UserDao, User> implements UserService {

    @Override
    public User selectUserByUsername(String username) {
        return super.baseMapper.selectUserByUsername(username);
    }

	@Override
	public EasyUiPage<User> page(EasyUiPage<User> page, User user) {
		page.setRecords(baseMapper.list(page, user));
		return page;
	}
}
