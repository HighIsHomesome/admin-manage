import { defineStore } from 'pinia'

import { loginOrRegister } from '@/service'
import { getUserInfos } from '@/service'

const useMainStore = defineStore('Main', {
    state: () => ({
        isShowPlaneLoading: false,  // 动画
        user: {
        }
    }),
    actions: {
        delShoppingBook(rawArr) {
            const targetIndex = rawArr.findIndex(el => {
                return el.name == '购物清单'
            })
            rawArr.splice(targetIndex, 1)
            return rawArr
        },
        async getUserInfo() {
            const res = await getUserInfos()
            if (res.code !== 200) throw new Error('出错了!')
            this.user = res.data    //获取信息
            if (import.meta.env.DEV) console.warn(this.user);
            this.user.books = this.delShoppingBook(res.data.books)   // 隐藏"购物清单"账本
        },
        PostLogin(data) {
            return new Promise(async (resolve) => {
                const res = await loginOrRegister('login', data)
                if (res) {
                    if (res.code === 200) {
                        this.user = res.data    //获取信息
                        resolve(res)
                    }
                    else throw new Error('失败了'.res)
                }
                else throw new Error('出错了❌')
            })
        },
        PostRegister() {
            return new Promise(async (resolve, reject) => {
                const res = await loginOrRegister('register', this.submit_register)
                if (res.code == 200) {
                    resolve(res.data.token)
                } else if (res.code == 500) {
                    reject(res)
                }
            })
        }
    },
})
export default useMainStore