<script setup>
// 
import { useRouter } from 'vue-router';
// 网络请求
import LAxios from '@/service/request/index'
// Store
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
// 
const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)
const router = useRouter()
//
// if (Object.prototype.toString.call(books.value) == '[object Object]' && Object.keys(books.value).length === 0) {
//     const res = await LAxios.get({
//         url: '/user/get_userinfo'
//     })
//     if (res.code == 200) {
//         // 
//         function del_shooping_book(rawArr) {
//             // console.warn('原数组：', rawArr);
//             const targetIndex = rawArr.findIndex(el => {
//                 return el.name == '购物清单'
//             })
//             rawArr.splice(targetIndex, 1)
//             return rawArr

//         }
//         const new_books = del_shooping_book(res.data.books)
//         // console.warn('新数组：', new_books);
//         // 
//         books.value = new_books
//         plan_list.value = res.data.plan
//         user_info.value.infos.budget = res.data.userInfo.budget
//         user_info.value.net = res.data.net
//         user_info.value.saved_money = res.data.Saved_Money
//         // 
//         user_info.value.account = res.data.account
//     }
//     else console.log(res);
// }
function getUrl(img) {
    return new URL(`../../../../assets/img/home/${img}`, import.meta.url).href
}
const click = (bookName, bookId, bookType) => {
    // console.log(bookName, user.value.book.current_bookName);
    // if (bookName === user.value.book.current_bookName) {
    //     console.log(true);
    // }
    // else {
    //     // 发送网络请求，
    //     // 修改current_bookName
    //     user.value.book.current_bookName = bookName
    //     user.value.book.current_book_id = bookId
    //     user.value.book.current_book_type = bookType
    //     favorStore.get_bill_list(true)
    // }
    router.push('/cost:' + bookId)
}
</script>

<template>
    <div class="mybook">
        <template v-for="(book, index) in user.books" :key="book.id">
            <!-- {{ books }} -->
            <div class="book" @click="click(book.name, book.id, book.book_type)">
                <h2>{{ book.name }}</h2>
                <img :src="getUrl(book.img)" style="position: relative; display: block;" :style="book.style" />
                <img src="@/assets/img/home/default.svg" style="position: relative; display: block;left:25px"
                    :style="book.style" />
                <div class="foot"></div>
            </div>
        </template>
    </div>
</template>

<style lang="less" scoped>
.mybook {
    position: relative;
    z-index: 2;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    top: 45px;
    color: #fff;

    // justify-content: space-evenly;
    // padding: 10px;
    &::-webkit-scrollbar {
        display: none;
    }

    .book {
        width: 105px;
        height: 130px;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        // align-items: center;
        flex-shrink: 0;
        // background-color: pink;
        background-color: #cfcfcf;
        border-color: #cfcfcfAA;
        border-radius: 25% 10% 10% 10%;
        box-shadow: 0 2px 2px #cfcfcfAA;
        margin-left: 20px;


        h2 {
            display: inline-block;
            padding: 10px;
            font-family: Inter;
            text-align: center;
            font-size: 16px;
            position: relative;
            top: -2px;
        }
    }

    .book::after {
        content: ' ';
        display: block;
        width: 105px;
        height: 130px;
        // background-color: aqua;
        border-radius: 0 0 10% 10%;
        position: absolute;
        bottom: 0;
    }
}
</style>