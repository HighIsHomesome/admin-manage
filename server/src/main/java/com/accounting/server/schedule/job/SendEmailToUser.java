package com.accounting.server.schedule.job;


import ch.qos.logback.classic.Logger;
import com.accounting.server.mapper.QuotaMapper;
import com.accounting.server.mapper.ShareMapper;
import com.accounting.server.pojo.Quota;
import com.accounting.server.pojo.Share;
import com.accounting.server.pojo.dto.SumValueByCategory;
import com.accounting.server.service.IAccountService;
import com.accounting.server.utils.EmailUtils;
import com.accounting.server.utils.JwtUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 自动发送记账信息到用户邮箱
 */
@Component
public class SendEmailToUser {
    @Autowired
    private IAccountService iAccountService;
    @Value("${spring.mail.from}")
    private String from;
    @Value("${spring.mail.password}")
    private String password;
    @Value("${spring.mail.host}")
    private String host;
    private Logger logger = (Logger) LoggerFactory.getLogger(getClass());
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private QuotaMapper quotaMapper;
    @Autowired
    private ShareMapper shareMapper;
    private final AtomicInteger counts = new AtomicInteger();

    @Scheduled(fixedRate = 20000)
    public void execute() {
        // redis获取token
        ValueOperations<String,Object> redis =  redisTemplate.opsForValue();
        String token = (String) redis.get("token");
        // 根据token获取用户id 然后获取额度设置数据
        if(token!=null && JwtUtil.validateToken(token)){
            Integer userId = (Integer) JwtUtil.getUserIdByToken(token);
            QueryWrapper<Quota> wapper = new QueryWrapper<Quota>();
            wapper.eq("userid",userId);
            List<Quota> quotaList = quotaMapper.selectList(wapper);
            if(quotaList.size()==0){
                // 获取共享id
                List<Share> shares =  shareMapper.getSharesByUserId(userId.toString());
                for(int i = 0; i < shares.size(); i++){
                    wapper.eq("userid",shares.get(i).getShareAccount());
                    quotaList = quotaMapper.selectList(wapper);
                    if(quotaList.size() == 11 ){
                        break;
                    }
                }
            }
            Date date = new Date();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY/MM/dd");
            String end = simpleDateFormat.format(date);
            String start = end.split("/")[0]+'/'+end.split("/")[1]+"/01";
            List<SumValueByCategory> sumValueByDateList = null;
            // 根据token获取用户名
            String userNameByToken = (String) JwtUtil.getUserNameByToken(token);
            sumValueByDateList = iAccountService.getAccountsSumValueByCategory(userNameByToken, start, end);
            StringBuilder text = new StringBuilder();


            for(int i = 0; i < sumValueByDateList.size(); i++){
                for(int j = 0 ; j< quotaList.size();j++){
                    if(sumValueByDateList.get(i).getCategory().equals(quotaList.get(j).getCategory().trim())){
//                        mainText += sumValueByDateList.get(i).getCategory()+"              "+
//                                sumValueByDateList.get(i).getCost()+"              "
//                                +quotaList.get(j).getQuota()+"              "+
//                                (quotaList.get(j).getQuota().subtract(
//                                        new BigDecimal(sumValueByDateList.get(i).getCost()))).setScale(2,BigDecimal.ROUND_UP)+"\n";
                        text.append("<tr><td>").append(sumValueByDateList.get(i).getCategory()).append("</td><td>").append(sumValueByDateList.get(i).getCost()).append("</td><td>").append(quotaList.get(j).getQuota()).append("<t/d><td>").append(quotaList.get(j).getQuota().subtract(
                                        quotaList.get(j).getQuota().subtract(new BigDecimal(sumValueByDateList.get(i).getCost())))
                                .setScale(2, BigDecimal.ROUND_UP)).append("</td></tr>");
                    }
                }
            }
            if(sumValueByDateList.size()>0){
                String mainText = "<table cellspacing=\"0\" align=\"center\" border=\"1\" style=\"border:1px solid\"><tr><td>类别</td><td>花费</td><td>额度</td><td>剩余</td></tr>mainTextStr</table>";
                String newMainText = mainText.replace("mainTextStr", text.toString());
                EmailUtils.sendEmail(from,"346219767@qq.com",host,password,start+"-"+end+"的消费情况",newMainText,"");
                logger.info("[execute][定时第 ({" + counts.incrementAndGet() + "}) 次执行邮箱发送]");
            }
        }

    }
}
