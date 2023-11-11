import LAxios from '../request/index'

// 登入注册
export function setBudget(data) {
    return LAxios.post({
        url: `/budget/add`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function getUserBudget() {
    return LAxios.get({
        url: `/budget/getUserBudget`,
    })
}
export function create_ShoppingList(data) {
    return LAxios.post({
        url: `/inventory/CreateInventory`,
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        data
    })
}
export function all_inventory() {
    return LAxios.get({
        url: `/inventory/getAllInventory`,
    })
}
export function del_inventory(data) {
    return LAxios.post({
        url: `/inventory/delete`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function Add_Goods(data) {
    return LAxios.post({
        url: `/inventory/add_goods`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function Del_Goods(id) {
    return LAxios.get({
        url: `/inventory/delGoods?id=${id}`,
    })
}

export function charge(data) {
    return LAxios.post({
        url: `/inventory/charge`,
        data
    })
}