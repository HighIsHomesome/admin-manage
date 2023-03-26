package com.accounting.server.controller;


import com.accounting.server.mapper.QuotaMapper;
import com.accounting.server.mapper.ShareMapper;
import com.accounting.server.pojo.Account;
import com.accounting.server.pojo.CommonResponseObj;
import com.accounting.server.pojo.Quota;
import com.accounting.server.pojo.Share;
import com.accounting.server.service.IQuotaService;
import com.accounting.server.utils.JwtUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author LHS
 * @since 2023-02-19
 */
@RestController
@RequestMapping("/api/quota")
public class QuotaController {

    @Autowired
    private IQuotaService iQuotaService;

    @Autowired
    private QuotaMapper quotaMapper;

    @Autowired
    private ShareMapper shareMapper;

    @RequestMapping("/getQuota")
    public CommonResponseObj getQuota(HttpServletRequest request){
        QueryWrapper<Quota> wapper = new QueryWrapper<Quota>();
        // 获取token
        String authToken = request.getHeader("authorization");
        // 根据token获取用户名
        String userNameByToken = (String) JwtUtil.getUserNameByToken(authToken);
        // 获取用户id
        Integer userId = (Integer) JwtUtil.getUserIdByToken(authToken);
        wapper.eq("userid",userId);
        List<Quota> quotaList = quotaMapper.selectList(wapper);
        if(quotaList.size()==0){
            // 获取共享id
           List<Share> shares =  shareMapper.getSharesByUserId(userId.toString());
           for(int i = 0; i < shares.size(); i++){
               wapper.eq("userid",shares.get(i).getShareAccount());
               quotaList = quotaMapper.selectList(wapper);
               if(quotaList.size() == 8 ){
                   break;
               }
           }
        }
        if(quotaList.size() == 0){
           return new CommonResponseObj(200,"",null);
        }
        Map<String, BigDecimal> map = new HashMap<>();
        for(int j = 0 ; j < quotaList.size(); j++){
            map.put(quotaList.get(j).getCategory().trim(),quotaList.get(j).getQuota());
        }
        return new CommonResponseObj(200,"",map);
    }

    @RequestMapping("/setQuota")
    public CommonResponseObj setQuota(@RequestBody Object obj, HttpServletRequest request){
        System.out.println(obj);
        // 获取token
        String authToken = request.getHeader("authorization");
        // 根据token获取用户名
        String userNameByToken = (String) JwtUtil.getUserNameByToken(authToken);
        // 获取用户id
        Integer userId = (Integer) JwtUtil.getUserIdByToken(authToken);
        boolean result = iQuotaService.setQuota(obj,userId);
        if(result){
            return new CommonResponseObj(200,"额度设置成功！",null);
        }
        return new CommonResponseObj(500,"额度设置失败！",null);
    }

}
