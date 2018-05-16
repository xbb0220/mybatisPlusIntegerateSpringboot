package com.hywa.cors.kit.converter;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;
import com.hywa.cors.kit.converter.Converters.*;

public class TypeConverter {
	private final Map<Class<?>, IConverter<?>> converterMap = new HashMap<Class<?>, IConverter<?>>();
	private static TypeConverter me = new TypeConverter();
	
	private TypeConverter() {
		regist(Integer.class, new IntegerConverter());
		regist(int.class, new IntegerConverter());
		regist(Long.class, new LongConverter());
		regist(long.class, new LongConverter());
		regist(Double.class, new DoubleConverter());
		regist(double.class, new DoubleConverter());
		regist(Float.class, new FloatConverter());
		regist(float.class, new FloatConverter());
		regist(Boolean.class, new BooleanConverter());
		regist(boolean.class, new BooleanConverter());
		regist(java.util.Date.class, new DateConverter());
		regist(java.sql.Date.class, new SqlDateConverter());
		regist(java.sql.Time.class, new TimeConverter());
		regist(java.sql.Timestamp.class, new TimestampConverter());
		regist(java.math.BigDecimal.class, new BigDecimalConverter());
		regist(java.math.BigInteger.class, new BigIntegerConverter());
		regist(byte[].class, new ByteConverter());
	}
	
	public static TypeConverter me() {
		return me;
	}
	
	public <T> void regist(Class<T> type, IConverter<T> converter) {
		converterMap.put(type, converter);
	}
	
	/**
	 * 将 String 数据转换为指定的类型
	 * @param type 需要转换成为的数据类型
	 * @param s 被转换的 String 类型数据，注意： s 参数不接受 null 值，否则会抛出异常
	 * @return 转换成功的数据
	 */
	public final Object convert(Class<?> type, String s) throws ParseException {
		// mysql type: varchar, char, enum, set, text, tinytext, mediumtext, longtext
		if (type == String.class) {
			return ("".equals(s) ? null : s);	// 用户在表单域中没有输入内容时将提交过来 "", 因为没有输入,所以要转成 null.
		}
		s = s.trim();
		if ("".equals(s)) {	// 前面的 String跳过以后,所有的空字符串全都转成 null,  这是合理的
			return null;
		}
		// 以上两种情况无需转换,直接返回, 注意, 本方法不接受null为 s 参数(经测试永远不可能传来null, 因为无输入传来的也是"")
		//String.class提前处理
		
		// --------
		IConverter<?> converter = converterMap.get(type);
		if (converter != null) {
			return converter.convert(s);
		}
		throw new RuntimeException(type.getName() + " can not be converted, please use other type of attributes in your model!");
	}
}
