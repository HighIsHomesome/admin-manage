import { defineStore } from "pinia";

import { get_list, del_bill, detail, add_bill, create_plan, delete_plan, Update_plan, transform } from '@/service/index'

import dayjs from 'dayjs'

const store = {
    state() {
        return {
            reach150: false,
            // 
            current_month: dayjs().format('YYYY-MM'),
            // 
            del_bill_info: {},
            add_bill_info: {},
            transform_bill_info: {},
            // 
            obj: {
                username: '',
                total_expense: 0,
                total_income: 0,
                total_net: 0,
                list: {},
            },
            fixedTitle: false,
            // 点击按钮添加账单
            show: false,
            // 
            isHiddenUser: false,  // 默认cost页 -- User(friends) 隐藏
            get_list_infos: {},
            popUp_category_list: [],
            popUp_account: [],
            current_page: 1,
            totalPage: 1,
            bill_detail: {},
            type: {},
        }
    },
    getters: {},
    actions: {
        // 记账页--列表
        async get_bill_list(book_id) {
            if (this.current_page > this.totalPage && this.totalPage !== 0) return false
            return new Promise(async (resolve, reject) => {
                const res = await get_list(book_id, this.current_month, this.current_page++)
                if (res.code == 200) {
                    resolve(res)
                    this.isShowanimation = false
                    this.totalPage = res.data.totalPage
                    this.popUp_account = res.data.account
                    //
                    // console.log(toRaw(this.popUp_account));
                    this.popUp_account.forEach(item => {
                        item.icon = 'wechat'
                    })
                    // 
                    this.popUp_category_list = res.data.category_list
                    this.type = res.data.typess
                }
                else {
                    reject(res)
                }
            })
        },
        async post_add_bill() {
            return new Promise(async (resolve, reject) => {
                const res = await add_bill(this.add_bill_info)
                if (res.code == 200) {
                    resolve(res.data)
                }
            })
        },
        async post_transform() {
            return new Promise(async (resolve, reject) => {
                const res = await transform(this.transform_bill_info)
                if (res.code == 200) {
                    resolve(res.data)
                }
                else {
                }
            })
        },
        async post_del_bill() {
            return new Promise(async (resolve, reject) => {
                const res = await del_bill(this.del_bill_info)
                if (res.code == 200) {
                    resolve(res.data)
                }
                else {
                    reject(res)
                }
            })
        },
        // 记账页--详情
        async get_detail(id) {
            const res = await detail(id)
            if (res.code == 200) {
                this.bill_detail = res.data
            }
        },
        // 首页--计划
        async post_create_plan(data) {
            return new Promise(async (resolve, reject) => {
                const res = await create_plan(data)
                if (res.code == 200) {
                    resolve(res.data)
                }
                else {
                }
            })
        },
        async post_del_plan(data) {
            return new Promise(async (resolve, reject) => {
                const res = await delete_plan(data)
                if (res.code == 200) {
                    resolve(res.data)
                }
                else {
                }
            })
        },
        async Update_plan(data) {
            return new Promise(async (resolve, reject) => {
                const res = await Update_plan(data)
                if (res.code === 200) {
                    resolve(res.data)
                }
                else {
                    reject()
                }
            })
        }
    }
}
const useCostStore = defineStore('Cost', store)

export default useCostStore