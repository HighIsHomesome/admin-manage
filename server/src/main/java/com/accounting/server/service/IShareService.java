package com.accounting.server.service;

import com.accounting.server.pojo.Share;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author LHS
 * @since 2022-05-22
 */
public interface IShareService extends IService<Share> {

    Share getShares(String userId);
}
