package com.accounting.server.schedule.job;
import ch.qos.logback.classic.Logger;
import com.accounting.server.utils.DbUtils;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DbBackUp {
//    private Logger logger = (Logger) LoggerFactory.getLogger(getClass());
//    @Scheduled(fixedRate = 86400000)
//    public void execute() {
//
//       String result = DbUtils.dbBackUp();
//        logger.info(result);
//    }
}
