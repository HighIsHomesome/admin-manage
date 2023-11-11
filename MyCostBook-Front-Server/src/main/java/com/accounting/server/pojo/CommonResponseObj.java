package com.accounting.server.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResponseObj {
    private Integer code;
    private String msg;
    private Object obj;
}
