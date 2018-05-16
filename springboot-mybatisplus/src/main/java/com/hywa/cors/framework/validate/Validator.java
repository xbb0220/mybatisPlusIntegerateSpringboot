package com.hywa.cors.framework.validate;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.hywa.cors.kit.AjaxJson;
import com.hywa.cors.kit.StrKit;
import com.hywa.cors.web.BaseController;

public abstract class Validator {
	// TODO set the DEFAULT_DATE_PATTERN in Const and config it in Constants.
	// TypeConverter do the same thing.
	protected static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd";
	protected static final String emailAddressPattern = "\\b(^['_A-Za-z0-9-]+(\\.['_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\\.[A-Za-z0-9-]+)*((\\.[A-Za-z0-9]{2,})|(\\.[A-Za-z0-9]{2,}\\.[A-Za-z0-9]{2,}))$)\\b";
	protected static final String cellphonePattern = "^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$";
	protected String errorKey;
	protected String errorMessage;
	protected String datePattern = null;
	protected BaseController controller;

	protected abstract void validate();

	public AjaxJson check(BaseController controller){
		this.controller = controller;
		try{
			validate();
		}
		catch (ValidateException validateException){
			return AjaxJson.failure().setCode(this.errorKey).setMsg(this.errorMessage);
		}
		return null;
	}
	
	protected void addError(String errorKey, String errorMessage) {
		this.errorKey = errorKey;
		this.errorMessage = errorMessage;
		throw new ValidateException();
	}

	/**
	 * Validate Required. Allow space characters.
	 */
	protected void validateRequired(String field, String errorKey, String errorMessage) {
		String value = controller.getPara(field);
		if (value == null || "".equals(value)) { // 经测试,form表单域无输入时值为"",跳格键值为"\t",输入空格则为空格"
													// "
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate required string.
	 */
	protected void validateRequiredString(String field, String errorKey, String errorMessage) {
		if (StrKit.isEmpty(controller.getPara(field))) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate integer.
	 */
	protected void validateInteger(String field, int min, int max, String errorKey, String errorMessage) {
		validateIntegerValue(controller.getPara(field), min, max, errorKey, errorMessage);
	}

	private void validateIntegerValue(String value, int min, int max, String errorKey, String errorMessage) {
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			int temp = Integer.parseInt(value.trim());
			if (temp < min || temp > max) {
				addError(errorKey, errorMessage);
			}
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate integer.
	 */
	protected void validateInteger(String field, String errorKey, String errorMessage) {
		validateIntegerValue(controller.getPara(field), errorKey, errorMessage);
	}

	private void validateIntegerValue(String value, String errorKey, String errorMessage) {
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			Integer.parseInt(value.trim());
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate long.
	 */
	protected void validateLong(String field, long min, long max, String errorKey, String errorMessage) {
		validateLongValue(controller.getPara(field), min, max, errorKey, errorMessage);
	}

	private void validateLongValue(String value, long min, long max, String errorKey, String errorMessage) {
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			long temp = Long.parseLong(value.trim());
			if (temp < min || temp > max) {
				addError(errorKey, errorMessage);
			}
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate long.
	 */
	protected void validateLong(String field, String errorKey, String errorMessage) {
		validateLongValue(controller.getPara(field), errorKey, errorMessage);
	}

	private void validateLongValue(String value, String errorKey, String errorMessage) {
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			Long.parseLong(value.trim());
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate double.
	 */
	protected void validateDouble(String field, double min, double max, String errorKey, String errorMessage) {
		String value = controller.getPara(field);
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			double temp = Double.parseDouble(value.trim());
			if (temp < min || temp > max) {
				addError(errorKey, errorMessage);
			}
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate double.
	 */
	protected void validateDouble(String field, String errorKey, String errorMessage) {
		String value = controller.getPara(field);
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			Double.parseDouble(value.trim());
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	protected String getDatePattern() {
		return (datePattern != null ? datePattern : DEFAULT_DATE_PATTERN);
	}

	/**
	 * Validate date. Date formate: yyyy-MM-dd
	 */
	protected void validateDate(String field, String errorKey, String errorMessage) {
		String value = controller.getPara(field);
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			new SimpleDateFormat(getDatePattern()).parse(value.trim()); // Date
																		// temp
																		// =
																		// Date.valueOf(value);
																		// 为了兼容
																		// 64位
																		// JDK
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate date.
	 */
	protected void validateDate(String field, Date min, Date max, String errorKey, String errorMessage) {
		String value = controller.getPara(field);
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			Date temp = new SimpleDateFormat(getDatePattern()).parse(value.trim()); // Date
																					// temp
																					// =
																					// Date.valueOf(value);
																					// 为了兼容
																					// 64位
																					// JDK
			if (temp.before(min) || temp.after(max)) {
				addError(errorKey, errorMessage);
			}
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate date. Date formate: yyyy-MM-dd
	 */
	protected void validateDate(String field, String min, String max, String errorKey, String errorMessage) {
		// validateDate(field, Date.valueOf(min), Date.valueOf(max), errorKey,
		// errorMessage); 为了兼容 64位 JDK
		try {
			SimpleDateFormat sdf = new SimpleDateFormat(getDatePattern());
			validateDate(field, sdf.parse(min.trim()), sdf.parse(max.trim()), errorKey, errorMessage);
		} catch (Exception e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate equal field. Usually validate password and password again
	 */
	protected void validateEqualField(String field_1, String field_2, String errorKey, String errorMessage) {
		String value_1 = controller.getPara(field_1);
		String value_2 = controller.getPara(field_2);
		if (value_1 == null || value_2 == null || (!value_1.equals(value_2))) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate equal string.
	 */
	protected void validateEqualString(String s1, String s2, String errorKey, String errorMessage) {
		if (s1 == null || s2 == null || (!s1.equals(s2))) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate equal integer.
	 */
	protected void validateEqualInteger(Integer i1, Integer i2, String errorKey, String errorMessage) {
		if (i1 == null || i2 == null || (i1.intValue() != i2.intValue())) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate email.
	 */
	protected void validateEmail(String field, String errorKey, String errorMessage) {
		validateRegex(field, emailAddressPattern, false, errorKey, errorMessage);
	}
	
	/**
	 * Validate cellphone.
	 */
	protected void validateCellphone(String field, String errorKey, String errorMessage) {
		validateRegex(field, cellphonePattern, false, errorKey, errorMessage);
	}

	/**
	 * Validate URL.
	 */
	protected void validateUrl(String field, String errorKey, String errorMessage) {
		String value = controller.getPara(field);
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		try {
			value = value.trim();
			if (value.startsWith("https://")) {
				value = "http://" + value.substring(8); // URL doesn't
														// understand the https
														// protocol, hack it
			}
			new URL(value);
		} catch (MalformedURLException e) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate regular expression.
	 */
	protected void validateRegex(String field, String regExpression, boolean isCaseSensitive, String errorKey,
			String errorMessage) {
		String value = controller.getPara(field);
		if (value == null) {
			addError(errorKey, errorMessage);
			return;
		}
		Pattern pattern = isCaseSensitive ? Pattern.compile(regExpression)
				: Pattern.compile(regExpression, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(value);
		if (!matcher.matches()) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * Validate regular expression and case sensitive.
	 */
	protected void validateRegex(String field, String regExpression, String errorKey, String errorMessage) {
		validateRegex(field, regExpression, true, errorKey, errorMessage);
	}

	/**
	 * Validate string.
	 */
	protected void validateString(String field, int minLen, int maxLen, String errorKey, String errorMessage) {
		validateStringValue(controller.getPara(field), minLen, maxLen, errorKey, errorMessage);
	}

	private void validateStringValue(String value, int minLen, int maxLen, String errorKey, String errorMessage) {
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		if (value.length() < minLen || value.length() > maxLen) {
			addError(errorKey, errorMessage);
		}
	}

	/**
	 * validate boolean.
	 */
	protected void validateBoolean(String field, String errorKey, String errorMessage) {
		validateBooleanValue(controller.getPara(field), errorKey, errorMessage);
	}

	private void validateBooleanValue(String value, String errorKey, String errorMessage) {
		if (StrKit.isEmpty(value)) {
			addError(errorKey, errorMessage);
			return;
		}
		value = value.trim().toLowerCase();
		if ("1".equals(value) || "true".equals(value)) {
			return;
		} else if ("0".equals(value) || "false".equals(value)) {
			return;
		}
		addError(errorKey, errorMessage);
	}

	public class ValidateException extends RuntimeException {
		private static final long serialVersionUID = 20920496215941871L;
	}
	
}


