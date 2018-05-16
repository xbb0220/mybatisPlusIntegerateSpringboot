package com.hywa.cors.web;


import com.baomidou.mybatisplus.mapper.Wrapper;
import com.hywa.cors.config.SessionConst;
import com.hywa.cors.kit.AjaxJson;
import com.hywa.cors.kit.StrKit;
import com.hywa.cors.kit.easyui.EasyUiPage;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.hywa.cors.entity.User;
import com.hywa.cors.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * <p>
 * 用户 前端控制器
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController{

	@Autowired
	UserService userService;


	@RequestMapping("/login")
	@ResponseBody
	public AjaxJson login(User user){
		Wrapper<User> wrapper = new EntityWrapper<>();
		wrapper.eq("username", user.getUsername());
		User dbUser = userService.selectOne(wrapper);
		if (null == dbUser){
			return AjaxJson.failure().setMsg("用户名不存在");
		}
		if (!dbUser.getPassword().equals(StrKit.MD5(user.getPassword()))){
			return AjaxJson.failure().setMsg("密码错误");
		}
		setSessionAttr(SessionConst.SESSION_MENU, null);
		setSessionAttr(SessionConst.SESSION_USER, dbUser);
		return AjaxJson.success().setMsg("登陆成功");
	}

	@RequestMapping("/page")
	@ResponseBody
	public EasyUiPage<User> page(EasyUiPage<User> pageInfo, User user) {
		return userService.page(pageInfo, user);
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public AjaxJson update(User user) {
		user.setUsername(null);user.setPassword(null);
		Boolean result=userService.updateById(user);
		return result?AjaxJson.success().setData(user):AjaxJson.failure();
	}
	
	@RequestMapping("/save")
	@ResponseBody
	public AjaxJson save(User user) {
		Boolean result=userService.insert(user);
		return result?AjaxJson.success().setData(user):AjaxJson.failure();
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public AjaxJson delete(User user) {
		Boolean result=userService.deleteById(user.getId());
		return result?AjaxJson.success():AjaxJson.failure();
	}

	@RequestMapping("/updatePwd")
	@ResponseBody
	public AjaxJson updatePwd(String oldPassword, String newPassword) {
		User user = getSessionAttr(SessionConst.SESSION_USER);
		if (!StrKit.MD5(oldPassword).equals(user.getPassword())) {
			return AjaxJson.failure().setMsg("输入密码有误");
		} else {
			user.setPassword(StrKit.MD5(newPassword));
			userService.updateById(user);
			setSessionAttr(SessionConst.SESSION_USER, user);
			return AjaxJson.success();
		}
	}
	
	@RequestMapping("/logout")
	public String logout() {
		getSession().invalidate();
		return "redirect:/";
	}
	
}
