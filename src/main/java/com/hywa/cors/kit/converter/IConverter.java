package com.hywa.cors.kit.converter;

import java.text.ParseException;

/**
 * 将一个字符串转换成特定类型
 * @ClassName: IConverter
 * @since V1.0.0
 */
public interface IConverter<T> {
	T convert(String s) throws ParseException;
}
