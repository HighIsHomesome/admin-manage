package com.accounting.server.service.impl;

import com.accounting.server.pojo.User;
import com.accounting.server.mapper.UserMapper;
import com.accounting.server.service.IUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author LHS
 * @since 2022-09-18
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean IsUserExist(String username) {
        User user = userMapper.IsUserExist(username);
        return user==null?false:true;
    }

    @Override
    public User getUserByUserName(String username) {
        return userMapper.IsUserExist(username);
    }
}
