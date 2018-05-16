package com.hywa.cors;

import com.hywa.cors.framework.MySessionIdResolver;
import com.hywa.cors.interceptor.LoginRedirectInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.HttpSessionIdResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableRedisHttpSession
public class WebMvc implements WebMvcConfigurer {

	// @Bean
	// public HttpMessageConverters customConverters() {
	// MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter = new
	// MappingJackson2HttpMessageConverter();
	// ObjectMapper objectMapper = new ObjectMapper();
	//// SimpleDateFormat smt = new SimpleDateFormat("yyyy-MM-dd");
	//// objectMapper.setDateFormat(smt);
	// return new HttpMessageConverters(mappingJackson2HttpMessageConverter);
	// }
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoginRedirectInterceptor()).addPathPatterns("/view/index").excludePathPatterns("/*/login","/**/*.css", "/**/*.js");
	}

	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
	
	@Bean
	public HttpSessionIdResolver httpSessionStrategy() {
		return new MySessionIdResolver();
	}

}
