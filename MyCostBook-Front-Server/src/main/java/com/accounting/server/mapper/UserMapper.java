package com.accounting.server.mapper;

import com.accounting.server.pojo.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author LHS
 * @since 2022-09-18
 */
public interface UserMapper extends BaseMapper<User> {
    User IsUserExist(String username);
}
