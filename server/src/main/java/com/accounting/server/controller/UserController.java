package com.accounting.server.controller;


import com.accounting.server.pojo.Account;
import com.accounting.server.pojo.CommonResponseObj;
import com.accounting.server.pojo.Share;
import com.accounting.server.pojo.User;
import com.accounting.server.service.IAccountService;
import com.accounting.server.service.IShareService;
import com.accounting.server.service.IUserService;
import com.accounting.server.utils.CommonUtils;
import com.accounting.server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author LHS
 * @since 2022-09-18
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private IUserService iUserService;

    @Autowired
    private IAccountService iAccountService;
    @Autowired
    private IShareService shareService;

    @PostMapping("/getAccount")
    public CommonResponseObj getAccounts(String userId){

        return new CommonResponseObj(200,"获取数据成功!",null);
    }

    @PostMapping("/register")
    public CommonResponseObj register(@RequestBody User user){
        if(user.getUsername() == null){
            return new CommonResponseObj(500,"请以正确的方式注册！",null) ;
        }
        if(iUserService.IsUserExist(user.getUsername())){
            return new CommonResponseObj(500,"很遗憾,用户名已被注册!",user);
        }
        user.setRegTime(CommonUtils.convertToLocalDateTimeViaInstant(new Date()));
        // 前段密码加密
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        if(iUserService.save(user)){
            return new CommonResponseObj(200,"恭喜你,注册成功!",user);
        }
        return new CommonResponseObj(500,"很遗憾,注册失败!",user);
    }

    @PostMapping("/login")
    public CommonResponseObj login(@RequestBody User user){
        User result = iUserService.getUserByUserName(user.getUsername());
        if(result == null){
            return new CommonResponseObj(500,"请注册后再进行登录!",null);
        }
        // 前段密码匹配数据库加密密码
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if(!bCryptPasswordEncoder.matches(user.getPassword(),result.getPassword())){
            return new CommonResponseObj(500,"用户名或密码不正确!",null);
        }
        String token = JwtUtil.generateToken(result);
        Map<String,Object> map = new HashMap<>();
        map.put("tol_token",token);
        map.put("user",result);
        return new CommonResponseObj(200,"登录成功,即将进入主页!",map);
    }
}

