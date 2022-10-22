package com.accounting.server.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class CommonUtils {
    /**
     * 日期转换为localdatetime
     * @param dateToConvert
     * @return
     */
    public static LocalDateTime convertToLocalDateTimeViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }


    public static String passwordEncoder(String password){
        String head = "&^%$123";
        int i = head.hashCode();
        System.out.println(i);
        return "";
    }

    public static void main(String[] args) {
        passwordEncoder("sss");
    }
}
