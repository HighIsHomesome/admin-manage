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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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


    private final String host = "https://dfsns.market.alicloudapi.com";


    private final String appCode = "99a68cab482c4e90ba7940164363e3c1";

    private final String path = "/data/send_sms";

    private final String method = "POST";

    @Autowired
    private IUserService iUserService;

    @Autowired
    private IAccountService iAccountService;
    @Autowired
    private IShareService shareService;
    @Autowired
    private RedisTemplate redisTemplate;
    @PostMapping("/getAccount")
    public CommonResponseObj getAccounts(String userId){

        return new CommonResponseObj(200,"获取数据成功!",null);
    }

    /**
     * 账号注册
     * @param user
     * @return
     */
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

    /**
     * 账号密码登录
     * @param user
     * @return
     */
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

        // 将token存入redis设置过期时间为86400秒
        ValueOperations<String,Object> valueOperations =  redisTemplate.opsForValue();
        valueOperations.set("token", token, 86400, TimeUnit.SECONDS);

        Map<String,Object> map = new HashMap<>();
        map.put("tol_token",token);
        map.put("user",result);
        return new CommonResponseObj(200,"登录成功,即将进入主页!",map);
    }

    /**
     *获取手机验证码
     */
    @GetMapping("/getCode")
    public CommonResponseObj getCode(String phone){
        if(phone==null||phone==""){
            return new CommonResponseObj(500,"手机号不能为空！","");
        }
        // 调用发送短信api
        CommonResponseObj respBean =CommonUtils.getCode(host, method, path, appCode, phone);
        // 将code存入redis设置过期时间为60秒
        ValueOperations<String,Object> valueOperations =  redisTemplate.opsForValue();
        valueOperations.set("code_"+phone, respBean.getObj(), 300, TimeUnit.SECONDS);
        System.out.println(valueOperations.get("code_"+phone));
        return new CommonResponseObj(respBean.getCode(),respBean.getMsg(),respBean);
    }

    /**
     * 根据手机号和验证码登录
     * 如果手机号未注册则自动注册
     * @param phone
     * @param code
     * @return
     */
    @GetMapping("/phoneLog")
    public CommonResponseObj phoneLog(String phone, String code){
        System.out.println(code);
        ValueOperations<String,Object> valueOperations =  redisTemplate.opsForValue();
        String codeRedis = (String) valueOperations.get("code_"+phone);
        if(!code.equals(codeRedis)){
            return new CommonResponseObj(500,"验证码不正确或者已过期！","");
        }
        // 手机号作为用户名区访问数据库
        User result = iUserService.getUserByUserName(phone);
        //
        if(result == null){
            User user = new User();
            user.setPassword(phone);
            user.setUsername(phone);
            user.setRegTime(CommonUtils.convertToLocalDateTimeViaInstant(new Date()));
            // 前段密码加密
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            // 注册
            if(iUserService.save(user)){
                result = iUserService.getUserByUserName(phone);
            }else{
                return new CommonResponseObj(500,"服务器问题，请稍后再试！","");
            }
        }
        String token = JwtUtil.generateToken(result);
        Map<String,Object> map = new HashMap<>();
        map.put("tol_token",token);
        map.put("user",result);
        return new CommonResponseObj(200,"登录成功,即将进入主页!",map);
    }
    @GetMapping("/shareAccount")
    public CommonResponseObj shareAccount(String phone, HttpServletRequest request){
        // 获取token
        String authToken = request.getHeader("authorization");
        // 根据token获取用户名
        Integer idByToken = (Integer) JwtUtil.getUserIdByToken(authToken);
        // 手机号作为用户名区访问数据库
        User result = iUserService.getUserByUserName(phone);
        if(result == null){
            return new CommonResponseObj(500,"共享账号未注册!","");
        }
        Share share = new Share();
        share.setSharedAccount(result.getId().toString());
        share.setShareAccount(idByToken.toString());
        if(!shareService.save(share)){
            return new CommonResponseObj(500,"共享账号失败!","");
        }
        return new CommonResponseObj(200,"共享账号成功!","");
    }
    @GetMapping("/removeShareAccount")
    public CommonResponseObj removeShareAccount(String phone, HttpServletRequest request){
        // 获取token
        String authToken = request.getHeader("authorization");
        // 根据token获取用户名
        Integer idByToken = (Integer) JwtUtil.getUserIdByToken(authToken);
        // 手机号作为用户名区访问数据库
        User user = iUserService.getUserByUserName(phone);
        if (user == null) {
            return new CommonResponseObj(500,"解除账号未注册!","");
        }
        if(user.getId().equals(idByToken)){
            return new CommonResponseObj(500,"不能对自己进行解除操作!","");
        }
        boolean result = shareService.removeShareAccount(user.getId().toString(),idByToken.toString());
        if(result){
            return new CommonResponseObj(200,"解除共享成功!","");
        }
        return new CommonResponseObj(500,"解除共享失败!","");
    }
}

