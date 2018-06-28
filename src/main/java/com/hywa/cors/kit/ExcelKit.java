package com.hywa.cors.kit;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import com.hywa.cors.entity.User;

import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

public class ExcelKit {

	
	
	public static void gene(String templatePath, String targetPath, Map<String, Object> data) {
		XLSTransformer transformer = new XLSTransformer(); 
		try {
			transformer.transformXLS(templatePath, data, targetPath);
		} catch (ParsePropertyException | InvalidFormatException | IOException e) {
			e.printStackTrace();
		}  
	}
	
	public static void main(String[] args) {
		Map<String, Object> data = new HashMap<>();
		List<User> users = new ArrayList<>();
		User user1 = new User();
		user1.setPassword("sdfsdfsd");
		users.add(user1);
		
		data.put("users", users);
		gene(PathKit.getRootClassPath() + "/template.xls", "hello.xls", data);
	}
	
}
