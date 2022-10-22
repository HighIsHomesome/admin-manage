package com.accounting.server.service;

import com.accounting.server.pojo.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author LHS
 * @since 2022-09-18
 */
public interface IUserService extends IService<User> {
    /**
     * 根据用户名查证该用户是否已经注册
     */
    boolean IsUserExist(String username);

    User getUserByUserName(String username);
}
