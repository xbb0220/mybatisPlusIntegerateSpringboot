package com.hywa.cors.web;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class IndexController{

	@RequestMapping(value="/view/{path}",method = RequestMethod.GET)  
	public String view(@PathVariable("path") String path) {
		return path;
	}
	
	@RequestMapping(value="/view/{path1}/{path2}",method = RequestMethod.GET)  
	public String view1(@PathVariable("path1") String path1, @PathVariable("path2") String path2) {
		return path1 + "/" + path2;
	}

	@RequestMapping("/")
	public String index(){
		return "redirect:/view/login";
	}
}
