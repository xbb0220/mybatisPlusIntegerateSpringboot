package com.hywa.cors.service;

import com.hywa.cors.entity.User;
import com.hywa.cors.kit.easyui.EasyUiPage;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 用户 服务类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public interface UserService extends BaseService<User> {

    public User selectUserByUsername(String username);

    public EasyUiPage<User> page(EasyUiPage<User> page, User user);
    
}
