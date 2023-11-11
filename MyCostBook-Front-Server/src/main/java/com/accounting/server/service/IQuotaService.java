package com.accounting.server.service;

import com.accounting.server.pojo.Quota;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author LHS
 * @since 2023-02-19
 */
public interface IQuotaService extends IService<Quota> {
    boolean setQuota(Object map,Integer userId);
}
