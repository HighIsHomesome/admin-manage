package com.accounting.server.utils;


import com.accounting.server.pojo.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.util.StringUtils;

import java.util.Date;

public class JwtUtil {

    public static final String SUBJECT = "shenli";

    // 密钥
    public static final String APPSECRET = "shenli";
    // 过期时间
    public static final long EXPIRE = 1000*60*60*24;

    /**
     * 生成token
     * @param user
     * @return
     */
    public static String generateToken(User user){
        if(user == null || StringUtils.isEmpty(user.getUsername())||
                StringUtils.isEmpty(user.getId())||
                StringUtils.isEmpty(user.getPassword())){
            return null;
        }

        String token = Jwts.builder()
                .setSubject(SUBJECT)
                .claim("id",user.getId())
                .claim("username",user.getUsername())
                .claim("password",user.getPassword())
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRE))
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,APPSECRET).compact();

        return token;
    }

    /**
     * 验证token
     * @param token
     * @return
     */
    public static boolean validateToken(String token){
        Claims claims = null;
        try {
            claims = Jwts.parser().setSigningKey(APPSECRET).parseClaimsJws(token)
                    .getBody();
        }catch (Exception e){
            return false;
        }


        // 验证token是否存在
        if(claims.get("username")==null||claims.get("id")==null){
            return false;
        }

        // 验证token是否过期
        Date expire = claims.getExpiration();
        if (expire.before(new Date())){
            return false;
        }
        return true;
    }

    /**
     * 根据toke获取用户名
     * @param token
     * @return
     */
    public static Object getUserNameByToken(String token){
        return Jwts.parser().setSigningKey(APPSECRET).parseClaimsJws(token).getBody().get("username");
    }
    /**
     * 根据toke获取用户名
     * @param token
     * @return
     */
    public static Object getUserIdByToken(String token){
        return Jwts.parser().setSigningKey(APPSECRET).parseClaimsJws(token).getBody().get("id");
    }
}
