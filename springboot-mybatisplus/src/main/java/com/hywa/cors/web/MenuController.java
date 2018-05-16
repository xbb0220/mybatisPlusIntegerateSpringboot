package com.hywa.cors.web;


import com.hywa.cors.config.SessionConst;
import com.hywa.cors.entity.Menu;
import com.hywa.cors.entity.Role;
import com.hywa.cors.entity.User;
import com.hywa.cors.kit.AjaxJson;
import com.hywa.cors.kit.StrKit;
import com.hywa.cors.service.MenuService;
import com.hywa.cors.vo.MenuVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

/**
 * <p>
 * 菜单 前端控制器
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Controller
@RequestMapping("/menu")
public class MenuController extends BaseController{

	@Value("${dev.mode}")
	Boolean devMode;

    @Autowired
    MenuService menuService;

    @RequestMapping("saveOrUpdate")
    @ResponseBody
	public AjaxJson saveOrUpdate(Menu menu) {
		boolean flag = false;
		if (StrKit.isEmpty(menu.getId())) {
			flag = menuService.insert(menu);
		} else {
			flag = menuService.updateById(menu);
		}
		AjaxJson rp = flag ? AjaxJson.success() : AjaxJson.failure();
		rp.setData(menu);
		return rp;
	}
    
    @RequestMapping("delete")
    @ResponseBody
	public boolean delete(Menu menu) {
    		return menuService.deleteById(menu.getId());
	}
    
    @ResponseBody
    @RequestMapping("getAdminMenu")
    public List<MenuVo> getAdminMenu(){
        User sessionUser = getSessionAttr(SessionConst.SESSION_USER);
        List<MenuVo> adminMenu = getSessionAttr(SessionConst.SESSION_MENU);
        if (null == adminMenu) {
        		if (devMode) {
        			adminMenu = menuService.getAllMenu();
        		}
        		else {
        			adminMenu = menuService.getAdminMenu(sessionUser.getId());
        		}
        		setSessionAttr(SessionConst.SESSION_MENU, adminMenu);
        }
        return adminMenu;
    }
    
    @RequestMapping("renderAsyncTree")
    @ResponseBody
    public List<MenuVo> renderAsyncTree(String id){
		List<MenuVo> menu;
		if (StrKit.isEmpty(id)) {
			menu = menuService.getFirstDegree();
		} else {
			menu = menuService.getByParentId(id);
		}
		initTreeValue(menu);
    		return menu;
    }

    private void initTreeValue(List<MenuVo> records) {
		for (MenuVo record : records) {
			record.setState(menuService.hasChild(record) ? "closed" : "open");
		}
	}
    
    @RequestMapping("renderRoleMenuTree")
    @ResponseBody
	public List<MenuVo> renderRoleMenuTree(Role role) {
		List<MenuVo> records = menuService.renderRoleMenuTree(role.getId(), null);
		return records;
	}
    
    @RequestMapping("initRoleMenu")
    @ResponseBody
	public AjaxJson initRoleMenu(String roleId) {
		String[] menuIds = getParaValues("menuIds[]");
		AjaxJson rp = menuService.initRoleMenu(roleId, menuIds) ? AjaxJson.success() : AjaxJson.failure();
		return rp;
	}
    
}
