package com.accounting.server.filter;

import com.accounting.server.pojo.CommonResponseObj;
import com.accounting.server.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class TokenFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authToken = request.getHeader("authorization");
        if(request.getRequestURL().indexOf("/login")>0
                || request.getRequestURL().indexOf("/register")>0|| request.getRequestURL().indexOf("/getCode")>0
                || request.getRequestURL().indexOf("/phoneLog")>0
        ) {
            filterChain.doFilter(request, response);
        }else if(authToken == null){
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.setHeader("Access-Control-Allow-Origin","*");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type,authorization,XFILECATEGORY,XFILESIZE");
            PrintWriter out = response.getWriter();
            CommonResponseObj bean =  new CommonResponseObj(401,"请登录后再试！",null);
            out.write(new ObjectMapper().writeValueAsString(bean));
            out.flush();
            out.close();
        } else if (!JwtUtil.validateToken(authToken)) {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.setHeader("Access-Control-Allow-Origin","*");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type,authorization,XFILECATEGORY,XFILESIZE");
            PrintWriter out = response.getWriter();
            CommonResponseObj bean =  new CommonResponseObj(401,"请登录后再试！",null);
            out.write(new ObjectMapper().writeValueAsString(bean));
            out.flush();
            out.close();
        }else{
            filterChain.doFilter(request,response);
        }
    }
}
