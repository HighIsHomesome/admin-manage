package com.accounting.server.service;

import java.util.List;

import com.accounting.server.pojo.Account;
import com.accounting.server.pojo.dto.SumValueByDate;
import com.accounting.server.pojo.vo.AccountVO;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author LHS
 * @since 2022-05-01
 */
public interface IAccountService extends IService<Account> {

    List<Account> getAccountsByUserId(String userId);

    boolean addAccount(Account account);

    List<Account> getAccountsByUserId(String userId, String shareAccount);

    boolean modifyItemById(Account account);

    List<SumValueByDate> getAccountsSumValueByDate(String userName, String startDate, String endDate);

    List<SumValueByDate> getAccountsSumValueByCategory(String userId, String shareId, String startDate, String endDate);

    List<Account> getAccountsByCondition(AccountVO accountVO, String username, Integer idByToken);
}
