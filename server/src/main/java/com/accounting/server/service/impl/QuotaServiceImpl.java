package com.accounting.server.service.impl;

import com.accounting.server.mapper.AccountMapper;
import com.accounting.server.mapper.ShareMapper;
import com.accounting.server.pojo.Quota;
import com.accounting.server.mapper.QuotaMapper;
import com.accounting.server.pojo.Share;
import com.accounting.server.service.IQuotaService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sun.org.apache.xpath.internal.operations.Quo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author LHS
 * @since 2023-02-19
 */
@Service
public class QuotaServiceImpl extends ServiceImpl<QuotaMapper, Quota> implements IQuotaService {

    @Autowired
    private QuotaMapper quotaMapper;

    @Autowired
    private ShareMapper shareMapper;

    @Override
    public boolean setQuota(Object map,Integer userId) {
        try {
            // 将Object转为Map
            Map entity = (Map) map;
            // map 转为 string 解析 字符串 成 数组
            String[] quotaList = entity.get("obj").toString().replace("{","")
                    .replace("{","").replace("}","").split(",");
            // 将数组遍历插入数据库
            for(int j = 0; j < quotaList.length;j++){
                // 构建额度对象
                Quota quota = new Quota();
                quota.setCategory(quotaList[j].toString().split("=")[0].replace(" ",""));
                quota.setQuota(new BigDecimal(quotaList[j].toString().split("=")[1]));
                quota.setCreateTime(LocalDateTime.ofInstant(new Date().toInstant(), ZoneId.systemDefault()));
                quota.setUserid(userId);
                // 先查询类别是否已经设置额度
                QueryWrapper<Quota> wapper = new QueryWrapper<Quota>();
                wapper.eq("category",quotaList[j].toString().split("=")[0]);
                wapper.eq("userid",userId);
                Quota result = quotaMapper.selectOne(wapper);
                // 查询到没有额度 查询共享好友有没有设置 则新增 有则修改
                if(result == null){
                    // 查询共享id
                    List<Share> shares = shareMapper.getSharesByUserId(userId.toString());
                    if(shares.size() == 0){
                        quotaMapper.insert(quota);
                        continue;
                    }
                    else{
                        for(int i = 0; i < shares.size(); i++){
                            wapper.eq("userid",shares.get(i).getShareAccount());
                            Quota quotaResult = quotaMapper.selectOne(wapper);
                            if(quotaResult == null){
                                quotaMapper.insert(quota);
                                break;

                            }else{
                                if(!Objects.equals(result.getQuota(), new BigDecimal(quotaList[j].toString().split("=")[1]))){
                                    quotaMapper.update(quota,wapper);
                                    break;
                                }
                            }
                        };
                    }
                }else{
                    if(!Objects.equals(result.getQuota(), new BigDecimal(quotaList[j].toString().split("=")[1]))){
                        quotaMapper.update(quota,wapper);
                    }
                }
            };
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
