package com.hywa.cors.service.impl;

import com.hywa.cors.entity.Log;
import com.hywa.cors.mapper.LogDao;
import com.hywa.cors.service.LogService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 日志文件 服务实现类
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
@Service
public class LogServiceImpl extends ServiceImpl<LogDao, Log> implements LogService {

}
