//日期转字符串 返回日期格式20080808
function dateToString(date) {
    if (date instanceof Date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month: month;
        var day = date.getDate();
        day = day < 10 ? '0' + day: day;
        return year + month + day;
    }
    return '';
}

// 身份证号验证 
function isIdCard(cardid) {
	return validateIdCard(cardid)==0;
}

function isEmail(str){
	  var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(reg.test(str)){
		return true;
	}else{
		return false;
	}
}

function validateIdCard(obj) {
    var aCity = {
        11 : "北京",
        12 : "天津",
        13 : "河北",
        14 : "山西",
        15 : "内蒙古",
        21 : "辽宁",
        22 : "吉林",
        23 : "黑龙江",
        31 : "上海",
        32 : "江苏",
        33 : "浙江",
        34 : "安徽",
        35 : "福建",
        36 : "江西",
        37 : "山东",
        41 : "河南",
        42 : "湖北",
        43 : "湖南",
        44 : "广东",
        45 : "广西",
        46 : "海南",
        50 : "重庆",
        51 : "四川",
        52 : "贵州",
        53 : "云南",
        54 : "西藏",
        61 : "陕西",
        62 : "甘肃",
        63 : "青海",
        64 : "宁夏",
        65 : "新疆",
        71 : "台湾",
        81 : "香港",
        82 : "澳门",
        91 : "国外"
    };
    var iSum = 0;
    // var info = "";
    var strIDno = obj;
    var idCardLength = strIDno.length;
    if (!/^\d{17}(\d|x)$/i.test(strIDno) && !/^\d{15}$/i.test(strIDno))
        return 1; // 非法身份证号
 
    if (aCity[parseInt(strIDno.substr(0, 2))] == null)
        return 2;// 非法地区
 
    // 15位身份证转换为18位
    if (idCardLength == 15) {
        sBirthday = "19" + strIDno.substr(6, 2) + "-"
                + Number(strIDno.substr(8, 2)) + "-"
                + Number(strIDno.substr(10, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"))
        var dd = d.getFullYear().toString() + "-" + (d.getMonth() + 1) + "-"
                + d.getDate();
        if (sBirthday != dd)
            return 3; // 非法生日
        strIDno = strIDno.substring(0, 6) + "19" + strIDno.substring(6, 15);
        strIDno = strIDno + GetVerifyBit(strIDno);
    }
 
    // 判断是否大于2078年，小于1900年
    var year = strIDno.substring(6, 10);
    if (year < 1900 || year > 2078)
        return 3;// 非法生日
 
    // 18位身份证处理
 
    // 在后面的运算中x相当于数字10,所以转换成a
    strIDno = strIDno.replace(/x$/i, "a");
 
    sBirthday = strIDno.substr(6, 4) + "-" + Number(strIDno.substr(10, 2))
            + "-" + Number(strIDno.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"))
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
            .getDate()))
        return 3; // 非法生日
    // 身份证编码规范验证
    for ( var i = 17; i >= 0; i--)
        iSum += (Math.pow(2, i) % 11) * parseInt(strIDno.charAt(17 - i), 11);
    if (iSum % 11 != 1)
        return 1;// 非法身份证号
 
    // 判断是否屏蔽身份证
    var words = new Array();
    words = new Array("11111119111111111", "12121219121212121");
 
    for ( var k = 0; k < words.length; k++) {
        if (strIDno.indexOf(words[k]) != -1) {
            return 1;
        }
    }
 
    return 0;
}


function generateCondition(obj, param){
	param = decodeURIComponent(param.replace(/\+/g," "));
	var paramArray = param.split('&');
	for (i = 0; i < paramArray.length; i++){
		var strArray = paramArray[i].split('=');
		obj[strArray[0]] = strArray[1];
	}
}

function isPhone(phone){
	var myreg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/; 
	if(myreg.test(phone)){ 
		return true;
	} else{
		return false;
	}
}

