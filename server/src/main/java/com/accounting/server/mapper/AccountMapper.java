package com.accounting.server.mapper;

import java.util.List;

import com.accounting.server.pojo.Account;
import com.accounting.server.pojo.dto.SumValueByDate;
import com.accounting.server.pojo.vo.AccountVO;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author LHS
 * @since 2022-05-01
 */
public interface AccountMapper extends BaseMapper<Account> {

    List<Account> getAccountsByUserId(String userId);

    boolean addAccount(Account account);

    List<Account> getAccountsByUserIdAndSharedId(String userId, String shareAccount);

    boolean modifyItemById(Integer id,float value,String date,String description,String category, String subCategory,String pay);

    List<SumValueByDate> getAccountsSumValueByDate(@Param("userId") String userId, @Param("shareId") String shareId,@Param("startDate") String startDate,@Param("endDate") String endDate);

    List<SumValueByDate> getAccountsSumValueByCategory(@Param("userId") String userId, @Param("shareId") String shareId,@Param("startDate") String startDate,@Param("endDate") String endDate);

    List<Account> getAccountsByCondition(AccountVO  accountVO,String username);

    List<Account> getAccountsByUserName(Integer id);
}
