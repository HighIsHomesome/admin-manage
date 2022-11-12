package com.accounting.server.controller;


import java.util.List;

import com.accounting.server.pojo.Account;
import com.accounting.server.pojo.CommonResponseObj;
import com.accounting.server.pojo.Share;
import com.accounting.server.pojo.dto.SumValueByDate;
import com.accounting.server.pojo.vo.AccountVO;
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
        // 根据用户名获取accounts
        List<Account> accounts = null;
        accounts = iAccountService.getAccountsByCondition(accountVO,userNameByToken);
        return new CommonResponseObj(200,"查询成功!",accounts);
    }

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
        System.out.println(account);
        if(iAccountService.addAccount(account)){
            return new CommonResponseObj(200,"新增成功!",null);
        };
        return new CommonResponseObj(500,"新增失败!",null);
    }

    @GetMapping("/getAccountsSumValueByDate")
    public List<SumValueByDate> getAccountsSumValueByDate(String userId, String startDate, String endDate){
        List<SumValueByDate> sumValueByDateList = null;
        Share share = shareService.getShares(userId);
        if (share == null){
            sumValueByDateList = iAccountService.getAccountsSumValueByDate(userId,null,startDate,endDate);
        }else{
            if(share.getShareAccount().equals(userId)){
                sumValueByDateList = iAccountService.getAccountsSumValueByDate(userId,share.getSharedAccount(),startDate,endDate);
            }else if(share.getSharedAccount().equals(userId)){
                sumValueByDateList = iAccountService.getAccountsSumValueByDate(userId,share.getShareAccount(),startDate,endDate);
            }
        }
//        if (sumValueByDateList == null) {
//            SumValueByDate sumValueByDate = new SumValueByDate("error",500);
//            sumValueByDateList.add(sumValueByDate);
//        }
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
