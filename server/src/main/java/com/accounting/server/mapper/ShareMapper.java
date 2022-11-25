package com.accounting.server.mapper;

import com.accounting.server.pojo.Share;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author LHS
 * @since 2022-05-22
 */
public interface ShareMapper extends BaseMapper<Share> {

    Share getShares(String userId);

    int removeShareAccount(String shareId, String sharedId);
}
