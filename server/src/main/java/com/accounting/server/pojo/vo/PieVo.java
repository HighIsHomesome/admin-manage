package com.accounting.server.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PieVo {
    private String userId;
    private String startDate;
    private String endDate;
    private String category;
    private String subCategory;
}
