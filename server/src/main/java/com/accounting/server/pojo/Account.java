package com.accounting.server.pojo;

import java.io.Serializable;


/**
 * <p>
 * 
 * </p>
 *
 * @author LHS
 * @since 2022-05-01
 */

public class Account implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer id;

    private Integer type;

    private String category;

    private String subCategory;

    private String description;

    private Float value;

    private String date;

    private String pay;

    private String userid;

    public Account(Integer id, Integer type, String category, String subCategory, String description, Float value, String date,
            String pay, String userid) {
        this.id = id;
        this.type = type;
        this.category = category;
        this.subCategory = subCategory;
        this.description = description;
        this.value = value;
        this.date = date;
        this.pay = pay;
        this.userid = userid;
    }

    public Account() {
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public String getdescription() {
        return description;
    }

    public void setdescription(String description) {
        this.description = description;
    }

    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPay() {
        return pay;
    }

    public void setPay(String pay) {
        this.pay = pay;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    @Override
    public String toString() {
        return "Account [category=" + category + ", date=" + date + ", description=" + description + ", id=" + id + ", pay=" + pay
                + ", subCategory=" + subCategory + ", type=" + type + ", userid=" + userid + ", value=" + value + "]";
    }


}
