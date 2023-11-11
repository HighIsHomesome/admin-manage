import { defineStore } from "pinia";
import { setBudget, getUserBudget, create_ShoppingList, all_inventory, del_inventory, Add_Goods, Del_Goods, charge } from "@/service";

const store = {
    state() {
        return {
            userinfo: {},
            shopping_list: [],
            delete_ShoppingList_info: {},
            del_goods_info_id: 0,
            // 
        }
    },
    getters: {},
    actions: {
        async get_userBudget() {
            return new Promise(async (resolve, reject) => {
                const res = await getUserBudget()
                if (res) {
                    if (res.code == 200) {
                        const { id, budget_mode, budget, current_budget } = res.data.userInfo
                        this.userinfo = { id, budget_mode, budget, current_budget }
                        resolve(res)
                    }
                    else if (res.code == 500) {
                        reject(res)
                    }
                }
                else {
                }
            })
        },
        async Post_set_budget(data) {
            return new Promise(async (resolve, reject) => {
                const res = await setBudget(data)
                if (res) {
                    if (res.code === 200) {
                        this.userinfo = res.data.user_budget[0]
                        resolve(res)
                    }
                    else if (res.code === 500) {
                        reject(res)
                    }
                }
                else {
                }
            })
        },
        async get_all_inventory() {
            return new Promise(async (resolve, reject) => {
                const res = await all_inventory()
                if (res) {
                    if (res.code === 200) {
                        this.shopping_list = res.data.list
                        resolve(res.data)
                    }
                    else if (res.code === 500) {
                        reject(res)
                    }
                }
                else {
                }
            })
        },
        async Post_Create_Shopping_list(data) {
            return new Promise(async (resolve, reject) => {
                const res = await create_ShoppingList(data)
                if (res) {
                    if (res.code === 200) {
                        resolve(res.data)
                    }
                    else if (res.code === 500) {
                        reject(res)
                    }
                }
                else {
                }
            })
        },
        async Post_Delete_Shopping_list() {
            return new Promise(async (resolve, reject) => {
                const res = await del_inventory(this.delete_ShoppingList_info)
                if (res) {
                    if (res.code === 200) {
                        resolve(res.data)
                    }
                    else if (res.code === 500) {
                        reject(res)
                    }
                }
                else {
                }
            })
        },
        async Post_Add_Goods(data) {
            return new Promise(async (resolve, reject) => {
                const res = await Add_Goods(data)
                if (res) {
                    if (res.code === 200) {
                        resolve(res.data)
                    }
                    else if (res.code === 500) {
                        reject(res)
                    }
                }
                else {
                }
            })
        },
        async Post_Del_Goods() {
            return new Promise(async (resolve, reject) => {
                const res = await Del_Goods(this.del_goods_info_id)
                if (res) {
                    if (res.code === 200) {
                        resolve(res.data)
                    }
                    else if (res.code === 500) {
                        reject(res)
                    }
                }
                else {
                }
            })
        },
        async Post_charge(charge_infos) {
            return new Promise(async (resolve, reject) => {
                const res = await charge(charge_infos)
                if (res) {
                    if (res.code === 200) {
                        resolve(res.data)
                    }
                }
                else {
                }
            })
        },
    },
}
const usePlanStore = defineStore('Plan', store)

export default usePlanStore 