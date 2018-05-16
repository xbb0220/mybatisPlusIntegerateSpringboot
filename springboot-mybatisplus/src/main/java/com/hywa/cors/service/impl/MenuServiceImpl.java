package com.hywa.cors.service.impl;

import com.hywa.cors.entity.Menu;
import com.hywa.cors.entity.RoleMenu;
import com.hywa.cors.mapper.MenuDao;
import com.hywa.cors.service.MenuService;
import com.hywa.cors.service.RoleMenuService;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.hywa.cors.vo.MenuVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 * 菜单 服务实现类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Service
public class MenuServiceImpl extends ServiceImpl<MenuDao, Menu> implements MenuService {

	@Autowired
	RoleMenuService roleMenuService;
	
    @Override
    public List<MenuVo> getAdminMenu(String userId) {
        List<MenuVo> parentMenus = super.baseMapper.getMenuByUserIdAndParentId(userId, "");
        for (MenuVo parentMenu : parentMenus){
            List<MenuVo> childMenus = super.baseMapper.getMenuByUserIdAndParentId(userId, parentMenu.getId());
            parentMenu.setChildMenus(childMenus);
        }
        return parentMenus;
    }

	@Override
	public List<MenuVo> getAllMenu() {
		List<MenuVo> parentMenus = baseMapper.getMenuByParentId(null);
		for (MenuVo parentMenu : parentMenus) {
			List<MenuVo> childMenus = super.baseMapper.getMenuByParentId(parentMenu.getId());
			parentMenu.setChildMenus(childMenus);
		}
		return parentMenus;
	}

	@Override
	public List<MenuVo> getFirstDegree() {
		return baseMapper.getFirstDegree();
	}

	@Override
	public List<MenuVo> getByParentId(String parentId) {
		return baseMapper.getByParentId(parentId);
	}

	@Override
	public boolean hasChild(MenuVo menu) {
		Wrapper<Menu> wrapper = new EntityWrapper<>();
		wrapper.eq("parentId", menu.getId());
		return baseMapper.selectCount(wrapper) > 0;
	}

	@Override
	public List<MenuVo> renderRoleMenuTree(String roleId, String parentId) {
		List<MenuVo> resources = baseMapper.getRoleMenuByParentId(roleId, parentId);
		for (MenuVo resource : resources) {
			List<MenuVo> childs = renderRoleMenuTree(roleId, resource.getId());
			if (null != childs && !childs.isEmpty()) {
				resource.setChecked(false);
			}
			resource.setChildren(childs);
		}
		return resources;
	}

	@Override
	public boolean initRoleMenu(String roleId, String[] menuIds) {
		Wrapper<RoleMenu> wrapper = new EntityWrapper<>();
		wrapper.eq("roleId", roleId);
		roleMenuService.delete(wrapper);
		if (null != menuIds) {
			for (String menuId : menuIds) {
				RoleMenu roleMenu = new RoleMenu();
				roleMenu.setRoleId(roleId);
				roleMenu.setMenuId(menuId);
				roleMenuService.insert(roleMenu);
			}
		}
		return true;
	}

	@Override
	public boolean deleteById(Serializable id) {
		Wrapper<Menu> wrapper = new EntityWrapper<>();
		wrapper.eq("parentId", id);
		List<Menu> childMenus = super.selectList(wrapper);
		if (childMenus.size() > 0) {
			for (Menu childMenu : childMenus) {
				deleteById(childMenu.getId());
			}
		}
		return super.deleteById(id);
	}
	
}
