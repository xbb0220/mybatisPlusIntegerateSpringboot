package com.hywa.cors.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("hello")
public class HelloController {

	@RequestMapping("world")
	@ResponseBody
	public String world() {
		return "hello word";
	}
	
}
