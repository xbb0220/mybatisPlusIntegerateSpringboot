package com.hywa.cors.kit;

import java.io.File;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StrKit {

    final static Map<Integer, String> zoneNum = new HashMap<Integer, String>();
    static {
        zoneNum.put(11, "北京");
        zoneNum.put(12, "天津");
        zoneNum.put(13, "河北");
        zoneNum.put(14, "山西");
        zoneNum.put(15, "内蒙古");
        zoneNum.put(21, "辽宁");
        zoneNum.put(22, "吉林");
        zoneNum.put(23, "黑龙江");
        zoneNum.put(31, "上海");
        zoneNum.put(32, "江苏");
        zoneNum.put(33, "浙江");
        zoneNum.put(34, "安徽");
        zoneNum.put(35, "福建");
        zoneNum.put(36, "江西");
        zoneNum.put(37, "山东");
        zoneNum.put(41, "河南");
        zoneNum.put(42, "湖北");
        zoneNum.put(43, "湖南");
        zoneNum.put(44, "广东");
        zoneNum.put(45, "广西");
        zoneNum.put(46, "海南");
        zoneNum.put(50, "重庆");
        zoneNum.put(51, "四川");
        zoneNum.put(52, "贵州");
        zoneNum.put(53, "云南");
        zoneNum.put(54, "西藏");
        zoneNum.put(61, "陕西");
        zoneNum.put(62, "甘肃");
        zoneNum.put(63, "青海");
        zoneNum.put(64, "新疆");
        zoneNum.put(71, "台湾");
        zoneNum.put(81, "香港");
        zoneNum.put(82, "澳门");
        zoneNum.put(91, "外国");
    }

    final static int[] PARITYBIT = {'1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'};
    final static int[] POWER_LIST = { 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2};
    final static char[] UPPER_LIST = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

    /**
     * 身份证验证
     *@param  certNo 号码内容
     *@return 是否有效 null和"" 都是false
     */
    public static boolean isIDCard(String certNo){
        if(certNo == null || (certNo.length() != 15 && certNo.length() != 18))
            return false;
        final char[] cs = certNo.toUpperCase().toCharArray();
        //校验位数
        int power = 0;
        for(int i=0; i<cs.length; i++){
            if(i==cs.length-1 && cs[i] == 'X')
                break;//最后一位可以 是X或x
            if(cs[i]<'0' || cs[i]>'9')
                return false;
            if(i < cs.length -1){
                power += (cs[i] - '0') * POWER_LIST[i];
            }
        }

        //校验区位码
        if(!zoneNum.containsKey(Integer.valueOf(certNo.substring(0,2)))){
            return false;
        }

        //校验年份
        String year = certNo.length() == 15 ? getIdcardCalendar() + certNo.substring(6,8) :certNo.substring(6, 10);

        final int iyear = Integer.parseInt(year);
        if(iyear < 1900 || iyear > Calendar.getInstance().get(Calendar.YEAR))
            return false;//1900年的PASS，超过今年的PASS

        //校验月份
        String month = certNo.length() == 15 ? certNo.substring(8, 10) : certNo.substring(10,12);
        final int imonth = Integer.parseInt(month);
        if(imonth <1 || imonth >12){
            return false;
        }

        //校验天数
        String day = certNo.length() ==15 ? certNo.substring(10, 12) : certNo.substring(12, 14);
        final int iday = Integer.parseInt(day);
        if(iday < 1 || iday > 31)
            return false;

        //校验"校验码"
        if(certNo.length() == 15)
            return true;
        return cs[cs.length -1 ] == PARITYBIT[power % 11];
    }

    private static int getIdcardCalendar() {
        GregorianCalendar curDay = new GregorianCalendar();
        int curYear = curDay.get(Calendar.YEAR);
        int year2bit = Integer.parseInt(String.valueOf(curYear).substring(2));
        return  year2bit;
    }

    public static boolean isEmpty(String str) {
        if (null == str || "".equals(str)) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean isNotEmpty(String str) {
        return !isEmpty(str);
    }

    /**
     * 通过文件路径得到文件后缀名。如：hello.txt得到.txt
     *
     * @param filePath
     *            文件路径
     * @return
     */
    public static String getFileSuffix(String filePath) {
        int pointIndex = filePath.lastIndexOf(".");
        return filePath.substring(pointIndex, filePath.length());
    }

    public static String getFileNameWithoutSuffix(File file){
        String fileName = file.getName();
        int pointIndex = fileName.lastIndexOf(".");
        return fileName.substring(0, pointIndex);
    }

    public static boolean isEmail(String str) {
        if (StrKit.isEmpty(str)){
            return false;
        }
        Pattern p = Pattern.compile("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\\.([a-zA-Z0-9_-])+)+$");
        Matcher m = p.matcher(str);
        return m.matches();
    }

    public static boolean isCellPhone(String str) {
        if (isEmpty(str)) {
            return false;
        }
        Pattern p = Pattern.compile("^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$");
        Matcher m = p.matcher(str);
        return m.matches();
    }

    /**
     * 生成手机验证码
     *
     * @return 长度为6的数字字符串
     */
    public static String getVilidateCode() {
        char[] codeSequence = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
        StringBuffer codeStr = new StringBuffer();
        for (int i = 0; i < 6; i++) {
            int j = (int) (Math.random() * 10);
            codeStr.append(codeSequence[j]);
        }
        return codeStr.toString();
    }

    /**
     * MD5加密
     *
     * @param
     * @return 加密后的字符串
     */
    public static String MD5(String s) {
        char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };

        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static boolean isInteger(String str) {
        if (isEmpty(str)) {
            return false;
        }
        Pattern pattern = Pattern.compile("[0-9]*");
        Matcher isNum = pattern.matcher(str);
        return isNum.matches();
    }

    /**
     * 小数点保留方法
     *
     * @param value
     *            需要处理的数值
     * @param scale
     *            需要保留的小数位数
     * @return
     */
    public static float round(double value, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException("The scale must be a positive integer or zero");
        }
        BigDecimal bigDecimal = new BigDecimal(Double.toString(value));
        BigDecimal one = new BigDecimal("1");
        return bigDecimal.divide(one, scale, BigDecimal.ROUND_HALF_UP).floatValue();
    }

    public static String SHA1(String decript) {
        try {
            MessageDigest digest = java.security.MessageDigest.getInstance("SHA-1");
            digest.update(decript.getBytes());
            byte messageDigest[] = digest.digest();
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < messageDigest.length; i++) {
                String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
                if (shaHex.length() < 2) {
                    hexString.append(0);
                }
                hexString.append(shaHex);
            }
            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }


    public static String getFieldName(String fieldName){
        return fieldName.replaceFirst(fieldName.substring(0), fieldName.substring(0).toLowerCase());
    }



    /**
     * 根据oauth2入口参数找到定向到前端的路由
     * @param route
     * @return
     */
    public static String translateRoute(String route){
        route = StrKit.isEmpty(route) ? "" : route;
        String redirectRoute = route.replaceAll("!", "/").replaceAll("~", "?");
        return redirectRoute;
    }

    public synchronized static String getRandomUpper(int lenght){
        Random random = new Random();
        StringBuffer upperStr = new StringBuffer();
        for (int i = 0; i < lenght; i++) {
            upperStr.append(UPPER_LIST[random.nextInt(UPPER_LIST.length)]);
        }
        return upperStr.toString();
    }

    public static void main(String[] args) {
        System.err.println(MD5("1"));
    }

}
