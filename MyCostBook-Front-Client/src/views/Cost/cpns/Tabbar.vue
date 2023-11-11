<script setup>
import { ref } from 'vue'
import data from '@/assets/img/tabbar/tabbarData'
import { useRouter } from 'vue-router'
const router = useRouter()
console.log(data);
/**
* var
*/
/**
* function
*/
defineProps({})
defineEmits({})
defineExpose({})

const currentIndex = ref(0)

function changePath(playload, index) {
    router.push({
        path: playload,
        // query: {
        //     name: 77,
        //     age: 7
        // }
    })
    currentIndex.value = index
}
function getUrl(img) {
    return new URL(`../../../assets/img/tabbar/${img}`, import.meta.url).href
}
</script>

<template>
    <div class="tabBar">
        <template v-for="(item, index) in data" :key="index">
            <div class="tab-bar-item" @click="changePath(item.JumpPath, index)"
                :class="{ active: currentIndex === index }" :style="item.style">
                <img v-if="currentIndex == index" :src="getUrl(item.activeimg)" alt="">
                <img v-else :src="getUrl(item.img)" alt="">
                <!-- <p class="text">{{ item.text }}</p> -->
            </div>
        </template>
        <div class="add">
            <van-button round type="success" size="large"
                color="linear-gradient(133.36deg, rgba(66.17,149.81,143.75,1) -6%,rgba(42.47,124.31,118.38,1) 96%)"><span>+</span></van-button>
        </div>
    </div>

</template>

<style lang="less" scoped>
@color: linear-gradient(133.36deg, rgba(66.17, 149.81, 143.75, 1) -6%, rgba(42.47, 124.31, 118.38, 1) 96%);

.tabBar {
    height: 58px;
    // display
    display: flex;
    justify-content: center;
    align-items: center;
    // position
    position: fixed;
    z-index: 9999;
    background-color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    // boundaries
    border-top: 1px solid #aaa;

    .tab-bar-item {
        // flex
        flex: 1;
        // display
        display: flex;
        flex-direction: column;
        // padding: 0;
        // 居中
        // text-align: center;
        justify-content: center;
        align-items: center;
        // margin-left: 20px;

        img {
            width: 32px;
        }

        .text {
            margin: 0;
            font-size: 12px;
        }

        &.active {
            color: var(--primary--color)
        }
    }

    .add {
        position: fixed;
        top: 0;
        // z-index: 100000;
        // left: 50%;
        // bottom: 50px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        box-shadow: inset -1px 3px 1px 5px #74a3a0, 1px 8px 20px 0px #74a3a0, 5px 5px 10px 5px rgba(0, 0, 0, 0);

        span {
            font-family: Inter;
            font-weight: 700;
            font-size: 26px;
        }
    }
}
</style>