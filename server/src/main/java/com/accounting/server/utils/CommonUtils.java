package com.accounting.server.utils;

import com.accounting.server.pojo.CommonResponseObj;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class CommonUtils {
    /**
     * 日期转换为localdatetime
     * @param dateToConvert
     * @return
     */
    public static LocalDateTime convertToLocalDateTimeViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }
    /**
     * 获取手机验证码
     * @param host
     * @param method
     * @param path
     * @param appCode
     * @param phone
     * @return
     */
    public static CommonResponseObj getCode(String host, String method,
                                            String path, String appCode, String phone) {

        // 生成验证码
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            int random = (int) (Math.random() * 10);
            builder.append(random);
        }
        String code = builder.toString();
        Map<String, String> headers = new HashMap<String, String>();
        // 最后在header中的格式(中间是英文空格)为Authorization:APPCODE 83359fd73fe94948385f570e3c139105
        headers.put("Authorization", "APPCODE " + appCode);
        //headers.put("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        Map<String, String> querys = new HashMap<String, String>();
        Map<String, String> bodys = new HashMap<String, String>();
        bodys.put("content", "code:"+code);
        bodys.put("phone_number", phone);
        bodys.put("template_id", "TPL_0000");
        try {
            HttpResponse response = HttpUtils.doPost(host, path, method, headers, querys,bodys);
            StatusLine statusLine = response.getStatusLine();

            // 状态码: 200 正常；400 URL无效；401 appCode错误； 403 次数用完； 500 API网管错误
            int statusCode = statusLine.getStatusCode();

            String reasonPhrase = statusLine.getReasonPhrase();
            System.out.println(statusCode);
            if(statusCode == 200) {

                // 操作成功，把生成的验证码返回
                return new CommonResponseObj(statusCode,"短信验证码发送成功！",code);
            }

            return new CommonResponseObj(statusCode,"短信验证码发送失败,原因是"+reasonPhrase,"");

            // 获取response的body
            // System.out.println(EntityUtils.toString(response.getEntity()));
        } catch (Exception e) {
            e.printStackTrace();
            return new CommonResponseObj(500,"短信验证码发送失败,原因是"+e.getMessage(),"");
        }
    }


}
