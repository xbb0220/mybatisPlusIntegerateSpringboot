//此日期格式化方法，兼容IE浏览器
function dateFormat(dateString, format) {
	if (!dateString)
		return "";
	var time = new Date(dateString.replace(/-/g, '/').replace(/T|Z/g, ' ').trim());
	var o = {
		"M+" : time.getMonth() + 1, // 月份
		"d+" : time.getDate(), // 日
		"h+" : time.getHours(), // 小时
		"m+" : time.getMinutes(), // 分
		"s+" : time.getSeconds(), // 秒
		"q+" : Math.floor((time.getMonth() + 3) / 3), // 季度
		"S" : time.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
	return format;
}