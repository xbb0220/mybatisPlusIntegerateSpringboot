/**
 * Created by geekyu on 16/1/8.
 */
//操作消息提示  调用说明: pop("提示消息标题","提示消息内容")
function pop(titles, msg) {
    jQuery.messager.show({
        title: titles,
        msg: msg,
        timeout: 1500,
        showType: 'slide'
    });
}

function dictValue(comboValue, codeField, valueField, value) {
    for (var i = 0; i < comboValue.length; i++) {
        if (comboValue[i][codeField] == value) {
            return comboValue[i][valueField];
        }
    }
    return ""
}

function comboxValue(comboId, codeField, valueField, value) {
    var comboValue = $('#' + comboId).combobox('getData');
    return dictValue(comboValue, codeField, valueField, value);
}


function generateCondition(obj, param) {
    param = decodeURIComponent(param.replace(/\+/g, " "));
    var paramArray = param.split('&');
    for (i = 0; i < paramArray.length; i++) {
        var strArray = paramArray[i].split('=');
        obj[strArray[0]] = strArray[1];
    }
}

function synGrid(idtagName, gridIdTag, result) {
    if (!$('#' + idtagName).val()) {
        $('#' + gridIdTag).datagrid('insertRow', {
            index: 0,
            row: result
        });
    }
    else {
        var row = $('#' + gridIdTag).datagrid('getSelected');
        var ind = $('#' + gridIdTag).datagrid('getRowIndex', row);
        $('#' + gridIdTag).datagrid('updateRow', {
            index: ind,
            row: result
        });
    }
}

function insertRowToGrid(gridIdTag, result) {
    $('#' + gridIdTag).datagrid('insertRow', {
        index: 0,
        row: result
    });
}

function updateRowInGrid(gridIdTag, result) {
    var row = $('#' + gridIdTag).datagrid('getSelected');
    var ind = $('#' + gridIdTag).datagrid('getRowIndex', row);
    $('#' + gridIdTag).datagrid('updateRow', {
        index: ind,
        row: result
    });
}

function getSelectedRow(gridTagId) {
    return $('#' + gridTagId).datagrid('getSelected');
}

function deleteSelectedRow(gridTagId) {
    var row = $('#' + gridTagId).datagrid('getSelected');
    var ind = $('#' + gridTagId).datagrid('getRowIndex', row);
    $('#' + gridTagId).datagrid('deleteRow', ind);
}

//日期转字符串 返回日期格式20080808
function dateToString(date) {
    if (date instanceof Date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        return year + month + day;
    }
    return '';
}

// 身份证号验证 
function isIdCard(cardid) {
    return validateIdCard(cardid) == 0;
}

function validateIdCard(obj) {
    var aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
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
    for (var i = 17; i >= 0; i--)
        iSum += (Math.pow(2, i) % 11) * parseInt(strIDno.charAt(17 - i), 11);
    if (iSum % 11 != 1)
        return 1;// 非法身份证号

    // 判断是否屏蔽身份证
    var words = new Array();
    words = new Array("11111119111111111", "12121219121212121");

    for (var k = 0; k < words.length; k++) {
        if (strIDno.indexOf(words[k]) != -1) {
            return 1;
        }
    }

    return 0;
}

function isPhone(phone) {
    var myreg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    if (myreg.test(phone)) {
        return true;
    } else {
        return false;
    }
}


var myview = $.extend({}, $.fn.datagrid.defaults.view, {
    onAfterRender: function (target) {
        $.fn.datagrid.defaults.view.onAfterRender.call(this, target);
        var opts = $(target).datagrid('options');
        var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
        vc.children('div.datagrid-empty').remove();
        if (!$(target).datagrid('getRows').length) {
            var d = $('<div style="font-size:20px;" id="needHide" class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
            d.css({
                position: 'absolute',
                left: 0,
                top: 50,
                width: '100%',
                textAlign: 'center'
            });
        }
    }
});

var code = "sessionTimeout";
$(document).ajaxComplete(function (event, xhr, settings) {
    if (xhr.responseText === code) {
        $.messager.confirm('提示', '长时间未操作，请重新登录！', function (r) {
            if (r) {
                window.location.href = "/view/login";
            }
        });
    }
});

/*为conbobox添加清空样式 strat*/
$.fn.combobox.defaults.icons = [{
    iconCls: 'icon-no',
    handler: function (e) {
        $(e.handleObj.data.target).combobox('clear');
    }
}];
$.fn.combobox.defaults.editable = false;
$.fn.combobox.defaults.panelHeight = 'auto';
/*为conbobox添加清空样式 end */

/*给日期控件添加清空样式 strat*/
var buttons = $.extend([], $.fn.datebox.defaults.buttons);
buttons.splice(1, 0, {
    text: '清空',
    handler: function (target) {
        $(target).combo("setValue", "").combo("setText", ""); // 设置空值
        $(target).combo("hidePanel"); // 点击清空按钮之后关闭日期选择面板
    }
});
$.fn.datebox.defaults.buttons = buttons;
/*给日期控件添加清空样式 end*/

/*为textbox添加清空样式 strat*/
/*$.fn.textbox.defaults.icons=[{
    iconCls:'icon-no',
    handler:function(e){
        $(e.handleObj.data.target).textbox('clear');
    }
}];*/
/*为textbox添加清空样式 strat*/

$.extend($.fn.validatebox.defaults.rules, {
    phoneNum: { //验证手机号   
        validator: function (value, param) {
            return /^1[3-8]+\d{9}$/.test(value);
        },
        message: '请输入正确的手机号码'
    },
    telNum: { //既验证手机号，又验证座机号
        validator: function (value, param) {
            return /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d{3})|(\d{3}\-))?(1[358]\d{9})$)/.test(value);
        },
        message: '请输入正确的电话号码'
    },
    idCardNum: { //身份证号码验证
        validator: function (value, param) {
            return isIdCard(value);
        },
        message: '请输入正确的身份证号'
    },
    /*必须和某个字段相等*/
    equalTo: {
        validator: function (value, param) {
            return $(param[0]).val() == value;
        },
        message: '字段不匹配'
    },
    beUsed: {
        validator: function (value, param) {
            $.fn.validatebox.defaults.rules.beUsed.message = param[0];
            exists = false;
            $.ajax({
                async: false,
                type: 'post',
                url: basePath + param[1] + value,
                success: function (result) {
                    exists = result;
                }
            });
            return exists;
        },
        message: ''
    },
    beUsedExceptThis: {
        validator: function (value, param) {
            $.fn.validatebox.defaults.rules.beUsedExceptThis.message = param[0];
            exists = false;
            $.ajax({
                async: false,
                type: 'post',
                url: basePath + param[1] + value + param[2],
                success: function (result) {
                    exists = result;
                }
            });
            return exists;
        },
        message: ''
    }
});

function conveterParamsToJson(paramsAndValues) {
    var jsonObj = {};

    var param = paramsAndValues.split("&");
    for (var i = 0; param != null && i < param.length; i++) {
        var para = param[i].split("=");
        jsonObj[para[0]] = para[1];
    }

    return jsonObj;
}

function queryParamByFormId(form) {
    var formValues = $("#" + form).serialize();
    //关于jquery的serialize方法转换空格为+号的解决方法  
    formValues = formValues.replace(/\+/g, " ");   // g表示对整个字符串中符合条件的都进行替换
    var temp = JSON.stringify(conveterParamsToJson(formValues));
    var queryParam = JSON.parse(temp);
    return queryParam;
}

function openWin(winId, width, height) {
    $('#' + winId).window({
        width: width,
        height: height,
        modal: true
    });
}