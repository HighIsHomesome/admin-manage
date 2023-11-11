import LAxios from '@/service/request/index'

export function get_list(book_id, date, page, page_size = 5) {
    return LAxios.get({
        url: `/bill/list?book_id=${book_id}&date=${date}&page_size=${page_size}&page=${page}`,
    })
}
export function del_bill(data) {
    return LAxios.post({
        url: `/bill/delete`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function detail(id) {
    return LAxios.get({
        url: `/bill/detail?id=` + id,
    })
}
export function add_bill(data) {
    return LAxios.post({
        url: `/bill/add`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function transform(data) {
    return LAxios.post({
        url: `/bill/transform`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function create_plan(data) {
    return LAxios.post({
        url: `/plan/add`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function delete_plan(data) {
    return LAxios.post({
        url: `/plan/delete`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}
export function Update_plan(data) {
    return LAxios.post({
        url: `/plan/update`,
        Headers: {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data,
    })
}