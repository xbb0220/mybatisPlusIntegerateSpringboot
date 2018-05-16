package com.hywa.cors.web;

import java.util.Date;
import java.util.Enumeration;
import java.util.Map;
import java.util.Map.Entry;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hywa.cors.kit.Injector;
import com.hywa.cors.kit.StrKit;
import org.springframework.beans.factory.annotation.Autowired;


public class BaseController{
	@Autowired
	private HttpServletResponse response;
	@Autowired
	private HttpServletRequest request;
	
	public BaseController setAttr(String name, Object value) {
		request.setAttribute(name, value);
		return this;
	}
	
	public BaseController removeAttr(String name) {
		request.removeAttribute(name);
		return this;
	}
	
	public BaseController setAttrs(Map<String, Object> attrMap) {
		for (Entry<String, Object> entry : attrMap.entrySet())
			request.setAttribute(entry.getKey(), entry.getValue());
		return this;
	}
	
	public String getPara(String name) {
		return request.getParameter(name);
	}
	
	public String getPara(String name, String defaultValue) {
		String result = request.getParameter(name);
		return result != null && !"".equals(result) ? result : defaultValue;
	}
	
	public Map<String, String[]> getParaMap() {
		return request.getParameterMap();
	}
	
	public Enumeration<String> getParaNames() {
		return request.getParameterNames();
	}
	
	public String[] getParaValues(String name) {
		return request.getParameterValues(name);
	}
	
	public Integer[] getParaValuesToInt(String name) {
		String[] values = request.getParameterValues(name);
		if (values == null)
			return null;
		Integer[] result = new Integer[values.length];
		for (int i=0; i<result.length; i++)
			result[i] = Integer.parseInt(values[i]);
		return result;
	}
	
	public Long[] getParaValuesToLong(String name) {
		String[] values = request.getParameterValues(name);
		if (values == null)
			return null;
		Long[] result = new Long[values.length];
		for (int i=0; i<result.length; i++)
			result[i] = Long.parseLong(values[i]);
		return result;
	}
	
	public Enumeration<String> getAttrNames() {
		return request.getAttributeNames();
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getAttr(String name) {
		return (T)request.getAttribute(name);
	}
	
	public String getAttrForStr(String name) {
		return (String)request.getAttribute(name);
	}
	
	public Integer getAttrForInt(String name) {
		return (Integer)request.getAttribute(name);
	}
	
	public String getHeader(String name) {
		return request.getHeader(name);
	}
	
	private Integer toInt(String value, Integer defaultValue) {
		if (StrKit.isEmpty(value))
			return defaultValue;
		value = value.trim();
		if (value.startsWith("N") || value.startsWith("n"))
			return -Integer.parseInt(value.substring(1));
		return Integer.parseInt(value);
	}
	
	public Integer getParaToInt(String name) {
		return toInt(request.getParameter(name), null);
	}
	
	public Integer getParaToInt(String name, Integer defaultValue) {
		return toInt(request.getParameter(name), defaultValue);
	}
	
	private Long toLong(String value, Long defaultValue) {
		if (StrKit.isEmpty(value))
			return defaultValue;
		value = value.trim();
		if (value.startsWith("N") || value.startsWith("n"))
			return -Long.parseLong(value.substring(1));
		return Long.parseLong(value);
	}
	
	public Long getParaToLong(String name) {
		return toLong(request.getParameter(name), null);
	}
	
	public Long getParaToLong(String name, Long defaultValue) {
		return toLong(request.getParameter(name), defaultValue);
	}
	
	private Boolean toBoolean(String value, Boolean defaultValue) {
		if (StrKit.isEmpty(value))
			return defaultValue;
		value = value.trim().toLowerCase();
		if ("1".equals(value) || "true".equals(value))
			return Boolean.TRUE;
		else if ("0".equals(value) || "false".equals(value))
			return Boolean.FALSE;
		throw new IllegalArgumentException("Can not parse the parameter \"" + value + "\" to Boolean value.");
	}
	
	public Boolean getParaToBoolean(String name) {
		return toBoolean(request.getParameter(name), null);
	}
	
	public Boolean getParaToBoolean(String name, Boolean defaultValue) {
		return toBoolean(request.getParameter(name), defaultValue);
	}
	
	private Date toDate(String value, Date defaultValue) {
		try {
			if (StrKit.isEmpty(value))
				return defaultValue;
			return new java.text.SimpleDateFormat("yyyy-MM-dd").parse(value.trim());
		} catch (Exception e) {
			throw new IllegalArgumentException("Can not parse the parameter \"" + value + "\" to Date value.");
		}
	}
	
	public Date getParaToDate(String name) {
		return toDate(request.getParameter(name), null);
	}
	
	public Date getParaToDate(String name, Date defaultValue) {
		return toDate(request.getParameter(name), defaultValue);
	}
	
	public HttpServletRequest getRequest() {
		return request;
	}
	
	public HttpServletResponse getResponse() {
		return response;
	}

	public HttpSession getSession() {
		return request.getSession();
	}
	
	public HttpSession getSession(boolean create) {
		return request.getSession(create);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getSessionAttr(String key) {
		HttpSession session = request.getSession(false);
		return session != null ? (T)session.getAttribute(key) : null;
	}
	
	public BaseController setSessionAttr(String key, Object value) {
		request.getSession(true).setAttribute(key, value);
		return this;
	}
	
	public BaseController removeSessionAttr(String key) {
		HttpSession session = request.getSession(false);
		if (session != null)
			session.removeAttribute(key);
		return this;
	}
	
	public String getCookie(String name, String defaultValue) {
		Cookie cookie = getCookieObject(name);
		return cookie != null ? cookie.getValue() : defaultValue;
	}
	
	public String getCookie(String name) {
		return getCookie(name, null);
	}
	
	public Integer getCookieToInt(String name) {
		String result = getCookie(name);
		return result != null ? Integer.parseInt(result) : null;
	}
	
	public Integer getCookieToInt(String name, Integer defaultValue) {
		String result = getCookie(name);
		return result != null ? Integer.parseInt(result) : defaultValue;
	}
	
	public Long getCookieToLong(String name) {
		String result = getCookie(name);
		return result != null ? Long.parseLong(result) : null;
	}
	
	public Long getCookieToLong(String name, Long defaultValue) {
		String result = getCookie(name);
		return result != null ? Long.parseLong(result) : defaultValue;
	}
	
	public Cookie getCookieObject(String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null)
			for (Cookie cookie : cookies)
				if (cookie.getName().equals(name))
					return cookie;
		return null;
	}
	
	public Cookie[] getCookieObjects() {
		Cookie[] result = request.getCookies();
		return result != null ? result : new Cookie[0];
	}
	
	public BaseController setCookie(String name, String value, int maxAgeInSeconds, boolean isHttpOnly) {
		return doSetCookie(name, value, maxAgeInSeconds, null, null, isHttpOnly);
	}
	
	public BaseController setCookie(String name, String value, int maxAgeInSeconds) {
		return doSetCookie(name, value, maxAgeInSeconds, null, null, null);
	}
	
	public BaseController setCookie(Cookie cookie) {
		response.addCookie(cookie);
		return this;
	}
	
	public BaseController setCookie(String name, String value, int maxAgeInSeconds, String path, boolean isHttpOnly) {
		return doSetCookie(name, value, maxAgeInSeconds, path, null, isHttpOnly);
	}
	
	public BaseController setCookie(String name, String value, int maxAgeInSeconds, String path) {
		return doSetCookie(name, value, maxAgeInSeconds, path, null, null);
	}
	
	public BaseController setCookie(String name, String value, int maxAgeInSeconds, String path, String domain, boolean isHttpOnly) {
		return doSetCookie(name, value, maxAgeInSeconds, path, domain, isHttpOnly);
	}
	
	public BaseController removeCookie(String name) {
		return doSetCookie(name, null, 0, null, null, null);
	}
	
	public BaseController removeCookie(String name, String path) {
		return doSetCookie(name, null, 0, path, null, null);
	}
	
	public BaseController removeCookie(String name, String path, String domain) {
		return doSetCookie(name, null, 0, path, domain, null);
	}
	
	private BaseController doSetCookie(String name, String value, int maxAgeInSeconds, String path, String domain, Boolean isHttpOnly) {
		Cookie cookie = new Cookie(name, value);
		cookie.setMaxAge(maxAgeInSeconds);
		// set the default path value to "/"
		if (path == null) {
			path = "/";
		}
		cookie.setPath(path);
		
		if (domain != null) {
			cookie.setDomain(domain);
		}
		if (isHttpOnly != null) {
			cookie.setHttpOnly(isHttpOnly);
		}
		response.addCookie(cookie);
		return this;
	}

	public BaseController keepPara() {
		Map<String, String[]> map = request.getParameterMap();
		for (Entry<String, String[]> e: map.entrySet()) {
			String[] values = e.getValue();
			if (values.length == 1)
				request.setAttribute(e.getKey(), values[0]);
			else
				request.setAttribute(e.getKey(), values);
		}
		return this;
	}
	
	public BaseController keepPara(String... names) {
		for (String name : names) {
			String[] values = request.getParameterValues(name);
			if (values != null) {
				if (values.length == 1)
					request.setAttribute(name, values[0]);
				else
					request.setAttribute(name, values);
			}
		}
		return this;
	}

	
	public BaseController keepPara(Class<?> type, String... names) {
		if (type == String.class)
			return keepPara(names);
		
		if (names != null)
			for (String name : names)
				keepPara(type, name);
		return this;
	}



	public boolean isParaBlank(String paraName) {
		return StrKit.isEmpty(request.getParameter(paraName));
	}
	
	public boolean isParaExists(String paraName) {
		return request.getParameterMap().containsKey(paraName);
	}

	public <T> T bean(Class<T> beanClass) {
		return (T)Injector.injectBean(beanClass, "", request, false);
	}
	
	public <T> T getBean(Class<T> beanClass) {
		return (T)Injector.injectBean(beanClass, request, false);
	}
	
	public <T> T getBean(Class<T> beanClass, boolean skipConvertError) {
		return (T)Injector.injectBean(beanClass, request, skipConvertError);
	}
	
	public <T> T getBean(Class<T> beanClass, String beanName) {
		return (T)Injector.injectBean(beanClass, beanName, request, false);
	}
	
}
