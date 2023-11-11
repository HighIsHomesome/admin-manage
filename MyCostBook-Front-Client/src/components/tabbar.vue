<script setup>
import { ref } from 'vue'
// Router
import { useRouter } from 'vue-router'
// Store
import useCostStore from '@/stores/modules/cost';
import useTabBarStore from '@/stores/modules/Tabbar';
import { storeToRefs } from 'pinia';
// Store
const costStore = useCostStore()
const tabBarStore = useTabBarStore()
const { tabBar, isShowBigButton, isShowBoundaries, current_index } = storeToRefs(tabBarStore)
const { show } = storeToRefs(costStore)
// Router
const router = useRouter()
// Ref
const Ref_tabBar = ref()


/**
* var
*/


/**
* function
*/
function changePath(playload, index) {
    router.push({
        path: playload,
    })
    current_index.value = index
}
function getUrl(img) {
    return new URL(`../assets/img/tabbar/${img}`, import.meta.url).href
}
// 添加账单bill
const showPopup = () => {
    console.log('showPopup');
    show.value = true
    console.log(show.value);
}
</script>

<template>
    <div class="tabBar" ref="Ref_tabBar" :class="{ boundaries: isShowBoundaries == true }">
        <div class="add" v-if="isShowBigButton == true">
            <div class="circle" @click="showPopup">
                <span>+</span>
            </div>
        </div>
        <template v-for="(item, index) in tabBar" :key="index">
            <div class="tab-bar-item" :style="item.style">
                <img v-if="current_index == index" :src="getUrl(item.activeimg)" alt=""
                    @click="changePath(item.JumpPath, index)">
                <img v-else :src="getUrl(item.img)" alt="" @click="changePath(item.JumpPath, index)">
            </div>
        </template>

    </div>
</template>

<style lang="less" scoped>
.tabBar {
    height: 60px;
    // display
    display: flex;
    // position
    position: fixed;
    background-color: #fff;
    bottom: 0;
    left: 5px;
    right: 0;
    // boundaries
    // border-top: 2px solid #aaa;
    margin-bottom: 10px;

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
        margin-left: 20px;

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
        bottom: 20px;
        left: 175px;
        ;
        // left: 50%;
        // bottom: 50px;
        // width: 50px;
        // height: auto;
        border-radius: 30px;
        box-shadow: inset -1px 3px 1px 5px #7AC5CD, 1px 10px 20px 0px #74a3a0, 5px 5px 10px 5px rgba(0, 0, 0, 0);

        .circle {
            position: relative;
            z-index: 100000;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            // box-shadow: inset -1px 3px 1px 5px #7AC5CD, 1px 8px 20px 0px #7AC5CD, 5px 5px 10px 5px rgba(0, 0, 0, 0);
            // background-color: #7AC5CD;
            background: linear-gradient(133.36deg, #7AC5CD -6%, rgba(66, 150, 144, 1) 96%);

            span {
                position: relative;
                bottom: 2px;
                // right: 1px;
                color: #fff;
                font-family: Inter;
                font-weight: 700;
                font-size: 36px;
            }
        }


    }
}

&.boundaries {
    // boundaries
    border-top: 1px solid #aaa;
}
</style>