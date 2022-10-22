package com.accounting.server.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.accounting.server.pojo.CustomResult;
import com.accounting.server.utils.HttpUtils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Value("${APPID}")
    private String APPID;
    @Value("${APP_SECRET}")
    private String APP_SECRET;
    @GetMapping("/api/login")
    public CustomResult Login(String code) throws IOException{
        String urlHeader = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String,String> urlParams = new HashMap<>();
        urlParams.put("appid", APPID);
        urlParams.put("secret", APP_SECRET);
        urlParams.put("js_code",code);
        urlParams.put("grant_type", "authorization_code");
        System.out.println(APPID);
        String httpResult = HttpUtils.getResponse(urlHeader, urlParams);
        System.out.println(httpResult);
        return new CustomResult(httpResult);
    }

}
