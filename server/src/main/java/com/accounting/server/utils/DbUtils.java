package com.accounting.server.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.InputStream;
import java.util.concurrent.TimeUnit;

@Slf4j
public class DbUtils{

    /**
     * host
     */
    public static final String host = "121.4.154.199";

    /**
     * database
     */
    public static final String database = "accounting";

    /**
     * username
     */
    public static final String username = "root";

    /**
     * password
     */
    public static final String password = "520syyufonlyone";

    /**
     * 备份文件保存位置
     */
    public static final String backPath = "/Volumes/shenli/dbbackup/";

    /**
     * 备份文件命名规则
     */
    public static final String fileName = database + ".sql";

    /**
     * 备份工具绝对路径
     */
    public static final String toolPath = "/usr/local/mysql/bin/";


    /**
     * 备份操作工具
     */
    public static String dbBackUp() {

        // 备份文件名
        String finalFileName = System.currentTimeMillis() +"-" + fileName;
        //sql备份绝对路径
        String pathSql = backPath + finalFileName;
        StringBuilder backCmd = new StringBuilder();
        backCmd.append(toolPath + "mysqldump");
        backCmd.append(" -h" + host);
        backCmd.append(" -u" + username);
        backCmd.append(" -p" + password);
        backCmd.append(" --databases " + database + " > ");
        backCmd.append(pathSql);
        log.info("待备份sql文件绝对路径:{}", pathSql);
        log.info("待执行cmd命令:{}", backCmd.toString());
        log.info("开始备份数据库:{} >>>>> ", database);
        String[] cmd = {"sh", "-c", backCmd.toString()};
        return exec(cmd);
    }

    private static String exec(String[] cmd) {
        try {
            Process process = Runtime.getRuntime().exec(cmd);
            boolean res = process.waitFor(20, TimeUnit.SECONDS);
            if (!res) {
                log.info("执行time out");
                return "time out";
            }
            InputStream inputStream = process.getInputStream();
            byte[] data = new byte[1024];
            StringBuilder result = new StringBuilder();
            while (inputStream.read(data) != -1) {
                result.append(new String(data, "GBK"));
            }
            if (result.toString().equals("")) {
                InputStream errorStream = process.getErrorStream();
                while (errorStream.read(data) != -1) {
                    result.append(new String(data, "GBK"));
                }
            }else {
                result.delete(0,result.length()).append("success");
                log.info("result:{}",result);
            }
            return result.toString();
        } catch (Exception e) {
            log.info("error:{}", e.getMessage());
            return "error:" + e.getMessage();
        }
    }

    /**
     * 数据恢复操作工具
     */
    public static String dbRestore(String fileName) {
        String filePath = backPath + fileName;
        log.info("待还原sql文件:{}",filePath);
        StringBuilder restoreCmd = new StringBuilder();
        restoreCmd.append(toolPath + "mysql");
        restoreCmd.append(" -h" + host);
        restoreCmd.append(" -u" + username);
        restoreCmd.append(" -p" + password);
        restoreCmd.append(" < ");
        restoreCmd.append(filePath);
        log.info("cmd命令为：" + restoreCmd.toString());
        log.info("开始还原数据");
        String[] cmd = {"sh", "-c", restoreCmd.toString()};
        return exec(cmd);
    }


}