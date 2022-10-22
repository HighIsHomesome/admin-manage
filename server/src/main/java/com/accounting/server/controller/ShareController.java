package com.accounting.server.controller;


import com.accounting.server.pojo.Share;
import com.accounting.server.service.IShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author LHS
 * @since 2022-05-22
 */

@RestController
@RequestMapping("/api/share")
public class ShareController {

    @Autowired
    private IShareService shareService;

    @GetMapping("/shareAccount")
    public String shareAccout(Share shares) {
        System.out.println(shares);
        if (shareService.save(shares)) {
            return "共享成功";
        }
        return "共享失败";
    }

}
