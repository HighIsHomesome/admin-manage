package com.accounting.server.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountVO {
    private String userId;
    private String type;
    private String startDate;
    private String endDate;
    private String keyword;
    private String category;
    private String subCategory;
}
