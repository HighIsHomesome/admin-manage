package com.accounting.server.controller;


import java.util.List;

import cn.hutool.json.JSON;
import cn.hutool.json.JSONObject;
import com.accounting.server.pojo.Account;
import com.accounting.server.pojo.CommonResponseObj;
import com.accounting.server.pojo.Share;
import com.accounting.server.pojo.dto.SumValueByDate;
import com.accounting.server.pojo.vo.AccountVO;
import com.accounting.server.pojo.vo.PieVo;
import com.accounting.server.service.IAccountService;

import com.accounting.server.service.IShareService;
import com.accounting.server.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author LHS
 * @since 2022-05-01
 */

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private IAccountService iAccountService;
    @Autowired
    private IShareService shareService;


    @PostMapping("/delete/item")
    public CommonResponseObj delItem(@RequestBody Account account) {
        System.out.println(account.getId());
        if(iAccountService.removeById(account.getId())){
            return new CommonResponseObj(200,"删除成功!",null);
        }

        return new CommonResponseObj(500,"删除失败!",null);
    }

    @PostMapping("/modify/item")
    public CommonResponseObj modifyItem(@RequestBody Account account){

        if(account.getValue()==null){
            return new CommonResponseObj(500,"金额不能为空!",null);
        }
        if(account.getCategory()==null || account.getCategory().equals("")){
            return new CommonResponseObj(500,"类别不能为空!",null);
        }
        if(account.getDate()==null || account.getDate().equals("")){
            return new CommonResponseObj(500,"日期不能为空!",null);
        }

        System.out.println(account);
        if(account != null){
            boolean result = iAccountService.modifyItemById(account);
            if(result){
                return new CommonResponseObj(200,"修改成功!",null);
            }
        }

        return new CommonResponseObj(500,"修改失败!",null);
    }
    @PostMapping("/getAccountsByCondition")
    public CommonResponseObj getAccountsByCondition(@RequestBody AccountVO accountVO, HttpServletRequest request){
        // 获取token
        String authToken = request.getHeader("authorization");
        // 根据token获取用户名
        String userNameByToken = (String) JwtUtil.getUserNameByToken(authToken);
        Integer idByToken = (Integer) JwtUtil.getUserIdByToken(authToken);
        // 根据用户名获取accounts
        List<Account> accounts = null;
        accounts = iAccountService.getAccountsByCondition(accountVO,userNameByToken,idByToken);
        return new CommonResponseObj(200,"查询成功!",accounts);
    }

//    @PostMapping("/getAccountsByConditionForColumn")
//    public CommonResponseObj getAccountsByConditionForColumn(@RequestBody AccountVO accountVO, HttpServletRequest request){
//        // 获取token
//        String authToken = request.getHeader("authorization");
//        // 根据token获取用户名
//        String userNameByToken = (String) JwtUtil.getUserNameByToken(authToken);
//        Integer idByToken = (Integer) JwtUtil.getUserIdByToken(authToken);
//        // 根据用户名获取accounts
//        List<Account> accounts = null;
//        accounts = iAccountService.getAccountsSumValueByDate(accountVO,userNameByToken,idByToken);
//        List target = null;
//        JSONObject object = new JSONObject();
//        for(int i = 0; i<accounts.size();i++){
//            object.put("时间", accounts.get(i).getDate());
//            object.put("消费",accounts.get(i).getValue());
//            target.add(object);
//        }
//        return new CommonResponseObj(200,"查询成功!",target);
//    }

    @GetMapping("/getAccounts")
    public CommonResponseObj getAccounts(String userId){
        Share share = shareService.getShares(userId);
        System.out.println(share);
        List<Account> accounts = null;
        if(share==null){
            accounts = iAccountService.getAccountsByUserId(userId);
        }else{
            if(share.getShareAccount().equals(userId)){
                accounts = iAccountService.getAccountsByUserId(userId,share.getSharedAccount());
            }else if(share.getSharedAccount().equals(userId)){
                accounts = iAccountService.getAccountsByUserId(userId,share.getShareAccount());
            }
        }

        System.out.println(accounts);
        return new CommonResponseObj(200,"获取数据成功!",accounts);
    }
    @PostMapping("/addAccount")
    public CommonResponseObj addAcount(@RequestBody Account account){
        if(account.getValue()==null){
            return new CommonResponseObj(500,"金额不能为空!",null);
        }
        if(account.getCategory()==null || account.getCategory().equals("")){
            return new CommonResponseObj(500,"类别不能为空!",null);
        }
        if(account.getDate()==null || account.getDate().equals("")){
            return new CommonResponseObj(500,"日期不能为空!",null);
        }

        System.out.println(account);
        if(iAccountService.addAccount(account)){
            return new CommonResponseObj(200,"新增成功!",null);
        };
        return new CommonResponseObj(500,"新增失败!",null);
    }

    @PostMapping("/getAccountsSumValueGroupByDate")
    public List<SumValueByDate> getAccountsSumValueGroupByDate(@RequestBody PieVo pieVo,HttpServletRequest request){
        List<SumValueByDate> sumValueByDateList = null;
        if(pieVo!=null){
            // 获取token
            String authToken = request.getHeader("authorization");
            // 根据token获取用户名
            String userNameByToken = (String) JwtUtil.getUserNameByToken(authToken);
            sumValueByDateList = iAccountService.getAccountsSumValueByDate(userNameByToken, pieVo.getStartDate(), pieVo.getEndDate());
        }
        return sumValueByDateList;
    }

    @GetMapping("/getAccountsSumValueByCategory")
    public List<SumValueByDate> getAccountsSumValueByCategory(String userId, String startDate, String endDate){
        List<SumValueByDate> sumValueByDateList = null;
        Share share = shareService.getShares(userId);
        if (share == null){
            sumValueByDateList = iAccountService.getAccountsSumValueByCategory(userId,null,startDate,endDate);
        }else{
            if(share.getShareAccount().equals(userId)){
                sumValueByDateList = iAccountService.getAccountsSumValueByCategory(userId,share.getSharedAccount(),startDate,endDate);
            }else if(share.getSharedAccount().equals(userId)){
                sumValueByDateList = iAccountService.getAccountsSumValueByCategory(userId,share.getShareAccount(),startDate,endDate);
            }
        }
//        if (sumValueByDateList == null) {
//            SumValueByDate sumValueByDate = new SumValueByDate("error",500);
//            sumValueByDateList.add(sumValueByDate);
//        }
        return sumValueByDateList;
    }


}
