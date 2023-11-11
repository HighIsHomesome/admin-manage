<script setup>
import listData from '@/assets/centerData/listData'
// 路由
import { useRouter } from 'vue-router';
const router = useRouter()

function getUrl(img) {
    return new URL(`../../../assets/img/Profile_Center/${img}`, import.meta.url).href
}

const click = (path, index) => {
    if (index == (3 || 4)) return
    router.push(path)
}
</script>

<template>
    <div class="list">
        <template v-for="(item, index) in listData">
            <div class="item" @click="click(item.JumpPath, index)">
                <img :src="getUrl(item.img)" alt="">
                <span>{{ item.text }}</span>
            </div>
        </template>
    </div>
</template>

<style lang="less" scoped>
@color: rgba(77, 136, 131, 0.1);

.list {
    z-index: 1;
    position: absolute;
    top: 406px;
    width: 100%;
    padding: 30px;
    margin-bottom: 100px;

    .item {
        width: 82%;
        margin-bottom: 28px;
        padding: 10px;
        border-radius: 10px;
        background-color: rgba(77, 136, 131, 0.1);
        box-shadow: inset -1px 3px 8px 5px @color, 1px 2px 3px 0px #505653, 5px 5px 15px 5px rgba(0, 0, 0, 0);



        img {
            width: 35px;
            height: 35px;
            vertical-align: middle;
        }

        span {
            margin-left: 25px;
            color: rgb(34, 34, 34);
            font-family: Inter;
            font-size: 20px;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
        }
    }


}
</style>