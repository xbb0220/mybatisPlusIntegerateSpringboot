package com.hywa.cors.service;

import com.hywa.cors.entity.Menu;
import com.baomidou.mybatisplus.service.IService;
import com.hywa.cors.vo.MenuVo;

import java.util.List;

/**
 * <p>
 * 菜单 服务类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public interface MenuService extends IService<Menu> {
    public List<MenuVo> getAdminMenu(String userId);
    
    public List<MenuVo> getAllMenu();
    
    public List<MenuVo> getFirstDegree();
    
    public List<MenuVo> getByParentId(String parentId);
    
    public boolean hasChild(MenuVo menu);
    
    public List<MenuVo> renderRoleMenuTree(String roleId, String parentId);
    
    public boolean initRoleMenu(String roleId, String[] menuIds);
}
