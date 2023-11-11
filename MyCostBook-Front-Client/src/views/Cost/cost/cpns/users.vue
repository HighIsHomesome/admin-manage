<script setup>
// Vue
import { ref } from 'vue';
// Store
import { storeToRefs } from 'pinia';
import useCostStore from '@/stores/modules/cost';
const costStore = useCostStore()
const { isHiddenUser } = storeToRefs(costStore)

const avalist = [
    { ava: '1.svg' },
    { ava: '2.svg' },
    { ava: '3.svg' },
    { ava: '4.svg' },
    { ava: '5.svg' },
]
// function getUrl(img) {
//     return new URL(`../../../../assets/img/cost/list/avatar/${img}`, import.meta.url).href
// }
function getUrl(baseUrl) {
    return (img) => {
        return new URL(`${baseUrl}/${img}`, import.meta.url).href
    }
}
const getImg = getUrl('../../../../assets/img/cost/list/avatar')

const close = () => {
    isHiddenUser.value = true
}
</script>

<template>
    <div class="users" v-if="isHiddenUser == false">
        <div class="title">
            <div class="left"><span>Send again</span></div>
            <div class="right" @click="close"><van-icon name="eye" size="25" /></div>
        </div>
        <div class="list">
            <template v-for="(item, index) in avalist" :key="index">
                <div class="item">
                    <img :src="getImg(item.ava)" alt="">
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.users {
    width: 90%;
    height: 100px;
    position: fixed;
    bottom: 55px;
    z-index: 5;
    background-color: #fff;
    padding: 15px 20px;

    .title {
        // padding-right: 25px;
        display: flex;
        justify-content: space-between;

        .left {
            font-size: 18px;
            font-weight: 550;
        }

        .right {
            font-size: 12px;
            color: #b1a9a9
        }
    }

    .list {
        display: flex;
        position: absolute;
        bottom: 8px;

        .item {
            margin-right: 15px;

            img {
                display: block;
                width: 62px;
                height: 62px
            }
        }
    }
}
</style>