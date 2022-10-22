package com.accounting.server.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author LHS
 * @since 2022-09-18
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("t_user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private String username;

    private String password;

    private String nickname;

    @TableField("profile_photo")
    private String profilePhoto;

    @TableField("recent_login")
    private String recentLogin;

    @TableField("reg_time")
    private LocalDateTime regTime;

    @TableField("extension_filed1")
    private String extensionFiled1;

    @TableField("extension_filed2")
    private String extensionFiled2;

    @TableField("extension_filed3")
    private String extensionFiled3;

    @TableField("extension_filed4")
    private String extensionFiled4;


}
