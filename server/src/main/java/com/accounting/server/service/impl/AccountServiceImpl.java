package com.accounting.server.service.impl;



import java.util.List;

import com.accounting.server.mapper.AccountMapper;
import com.accounting.server.pojo.Account;
import com.accounting.server.pojo.dto.SumValueByDate;
import com.accounting.server.pojo.vo.AccountVO;
import com.accounting.server.service.IAccountService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author LHS
 * @since 2022-05-01
 */
@Service
public class AccountServiceImpl extends ServiceImpl<AccountMapper, Account> implements IAccountService {

    @Autowired
    private AccountMapper accountMapper;

    @Override
    public List<Account> getAccountsByUserId(String userId) {
        List<Account> accounts = accountMapper.getAccountsByUserId(userId);
        return accounts;
    }

    @Override
    public boolean addAccount(Account account) {
        return accountMapper.addAccount(account);
    }

    @Override
    public List<Account> getAccountsByUserId(String userId, String shareAccount) {
        return accountMapper.getAccountsByUserIdAndSharedId(userId,shareAccount);
    }

    @Override
    public boolean modifyItemById(Account account) {

        return accountMapper.modifyItemById(account.getId(),account.getValue(),account.getDate(),account.getdescription(),
                account.getCategory(),account.getSubCategory(),account.getPay());
    }

    @Override
    public List<SumValueByDate> getAccountsSumValueByDate(String userName, String startDate, String endDate) {
        return accountMapper.getAccountsSumValueByDate(userName,startDate,endDate);
    }

    @Override
    public List<SumValueByDate> getAccountsSumValueByCategory(String userId, String shareId, String startDate, String endDate) {
        return accountMapper.getAccountsSumValueByCategory(userId,shareId,startDate,endDate);
    }

    @Override
    public List<Account> getAccountsByCondition(AccountVO accountVO, String username, Integer idByToken) {
        List<Account> listAccount = accountMapper.getAccountsByCondition(accountVO,username);
        if(listAccount.size() == 0){
            listAccount = accountMapper.getAccountsByUserName(idByToken);
        }
        return listAccount;
    }

}
