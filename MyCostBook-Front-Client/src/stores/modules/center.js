import { defineStore, storeToRefs } from "pinia";
import { addCategory, deleteCategory, modifyCategory, gerAllAcount, modifyAcount, addBook, delBook, updateBook, editUserInfos, addAcount, delAccount } from "@/service";
import useMainStore from "./main";

const useCenterStore = defineStore('center', {
    state: () => ({
        isClicktoEdit: false,
        enterDetail: false,
        // 
        enterCategoryManner_count: 0,
        enterIncome_number: 0,
        isFirstEnterIncome: true,
        isFirstEnterExpend: false,
        current_option: 'Expend',
        // Account
        account_data: {},
    }),
    actions: {
        /**
         * 用户
         */
        async Post_editUserInfos(data) {
            const result = await editUserInfos(data)
            if (result) {
                const { user } = storeToRefs(useMainStore())
                user.value.userInfo.username = result.data.new_username
            }
        },
        /**
         * 类别
         */
        async Post_addCategory(data, first_id, type_name, isCostPage = false) {
            return new Promise(async (resolve) => {
                const result = await addCategory(data)
                if (!result) {
                    return
                }
                const { user } = storeToRefs(useMainStore())
                const target = result.data.target.flat()
                if (!isCostPage) {
                    const index = user.value.typess[type_name].findIndex(item => {
                        return item.id == first_id
                    })
                    const target_arr = user.value.typess[type_name][index].list
                    target_arr.splice(-1, 0, ...target)
                }
                // 
                resolve(target[0].id)
            })

        },
        async Post_deleteCategory(data, id, first_id) {
            return new Promise(async (resolve) => {
                const res = await deleteCategory(data)
                if (res.code == 200) {
                    const { user } = storeToRefs(useMainStore())
                    function findIn(obj) {
                        for (const key in obj) {
                            // console.group('开始遍历对象的key:', key);
                            const element = obj[key];
                            f: for (let j = 0; j < element.length; j++) {
                                const item = element[j]
                                // }
                                //     element.forEach(item => {
                                if (item.id == first_id) {
                                    const targetIndex = item.list.findLastIndex(el => {
                                        // console.group()
                                        // console.log(el.id);
                                        // console.groupEnd()
                                        return el.id == id
                                    })
                                    // console.warn('!!!找到第一分类', toRaw(item), '开始找二级索引');
                                    if (targetIndex !== -1) {
                                        // console.warn('找到二级分类索引', targetIndex);
                                        const targetElement = item.list.splice(targetIndex, 1)
                                        if (targetElement) {
                                            // console.log('删除二级分类成功,targetElement:', toRaw(targetElement));
                                            // break f;
                                            return
                                        }
                                        else {
                                            console.log('失败--删除二级分类');
                                        }
                                    } else {
                                        console.log('没有找到二级分类');
                                    }
                                } else {
                                    console.log('未找到一级分类');
                                }
                            }
                            console.groupEnd('开始遍历对象的key:', key);
                        }
                    }
                    findIn(user.value.typess)
                    resolve(res.data)
                }
                else {
                    console.log('出错了');
                }
            })

        },
        async Post_Modify_CategoryName(data) {
            return new Promise(async (resolve) => {
                const result = await modifyCategory(data)
                if (!result) {
                    return
                }
                else if (result.code === 200) {
                    resolve()
                }
            })
        },
        /**
         * 账户
         */
        async Get_allAccount() {
            const res = await gerAllAcount()
            if (res.code == 200) {
                this.account_data = res.data
            }
            else {
            }
        },
        async post_addAccount(data) {
            return new Promise(async (resolve, reject) => {
                const res = await addAcount(data)
                if (res.code == 200) {
                    resolve(res.data.insertId)
                }
                else {
                    reject(res)
                }
            })

        },
        async post_ModifyAccount(data) {
            return new Promise(async (resolve) => {
                const res = await modifyAcount(data)
                if (res.code == 200) {
                    resolve(res.data)
                }
                else {
                    resolve(res.data)
                }
            })

        },
        async post_delAccount(data) {
            return new Promise(async (resolve, reject) => {
                const res = await delAccount(data)
                if (res.code == 200) {
                    resolve(res.data)
                }
                else {
                    reject()
                }
            })

        },
        /**
        * 账本
        */
        async post_addBook(data) {
            return new Promise(async (resolve, reject) => {
                const res = await addBook(data)
                if (res.code == 200) {
                    resolve(res.data.insertId)
                }
                else {
                    reject()
                }
            })

        },
        async post_delBook(data) {
            return new Promise(async (resolve, reject) => {
                const res = await delBook(data)
                if (res.code == 200) {
                    resolve()
                }
                else {
                    reject()
                }
            })

        },
        async post_updateBook(data) {
            return new Promise(async (resolve, reject) => {
                const res = await updateBook(data)
                if (res.code == 200) {
                    resolve(res.data)
                }
                else { }
            })
        }
    },
})
export default useCenterStore