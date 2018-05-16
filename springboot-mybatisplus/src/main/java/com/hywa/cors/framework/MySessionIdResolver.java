package com.hywa.cors.framework;

import com.hywa.cors.kit.StrKit;
import org.springframework.session.web.http.CookieHttpSessionIdResolver;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.session.web.http.HttpSessionIdResolver;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class MySessionIdResolver implements HttpSessionIdResolver {

    private static final String WRITTEN_SESSION_ID_ATTR = CookieHttpSessionIdResolver.class.getName().concat(".WRITTEN_SESSION_ID_ATTR");
    private CookieSerializer cookieSerializer = new DefaultCookieSerializer();

    public MySessionIdResolver() {
    }

    public List<String> resolveSessionIds(HttpServletRequest request) {
        if (!StrKit.isEmpty(request.getParameter("SESSION"))){
        		List<String> matchingCookieValues = new ArrayList<String>();
            matchingCookieValues.add(base64Decode(request.getParameter("SESSION")));
            return matchingCookieValues;
        }
        else{
            return this.cookieSerializer.readCookieValues(request);
        }
    }

    public void setSessionId(HttpServletRequest request, HttpServletResponse response, String sessionId) {
        if (!sessionId.equals(request.getAttribute(WRITTEN_SESSION_ID_ATTR))) {
            request.setAttribute(WRITTEN_SESSION_ID_ATTR, sessionId);
            this.cookieSerializer.writeCookieValue(new CookieSerializer.CookieValue(request, response, sessionId));
        }
    }

    public void expireSession(HttpServletRequest request, HttpServletResponse response) {
        this.cookieSerializer.writeCookieValue(new CookieSerializer.CookieValue(request, response, ""));
    }

    public void setCookieSerializer(CookieSerializer cookieSerializer) {
        if (cookieSerializer == null) {
            throw new IllegalArgumentException("cookieSerializer cannot be null");
        } else {
            this.cookieSerializer = cookieSerializer;
        }
    }

    private String base64Decode(String base64Value) {
        try {
            byte[] decodedCookieBytes = Base64.getDecoder().decode(base64Value);
            return new String(decodedCookieBytes);
        }
        catch (Exception e) {
            return null;
        }
    }

}
