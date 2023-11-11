package com.accounting.server.service.impl;

import com.accounting.server.pojo.Share;
import com.accounting.server.mapper.ShareMapper;
import com.accounting.server.service.IShareService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author LHS
 * @since 2022-05-22
 */
@Service
public class ShareServiceImpl extends ServiceImpl<ShareMapper, Share> implements IShareService {

    @Autowired
    private ShareMapper shareMapper;

    @Override
    public Share getShares(String userId) {
        return shareMapper.getShares(userId);
    }

    @Override
    public boolean removeShareAccount(String shareId, String sharedId) {
        int count = shareMapper.removeShareAccount(shareId,sharedId);
        return count > 0;
    }
}
