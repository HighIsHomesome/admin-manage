<script setup>
// Vue
import { onBeforeRouteLeave, useRouter } from 'vue-router'
// Store
import useMainStore from '@/stores/modules/main';
/**
* var
*/
defineProps({
    isEmpty: {
        type: Boolean,
        default: false,
    },
    top_array: {},
})

const router = useRouter()
/**
* function
*/

// 跳转至 分类详情
function LinktoDetail(item) {
    router.push({
        path: `/categoryStatistics:${item.billLedger}`,
    })
}

onBeforeRouteLeave((to, from) => {
    if (to.name == '统计分类') useMainStore().isShowPlaneLoading = true
})

</script>

<template>
    <div id="list" v-if="!isEmpty">
        <template v-for="(item, index) in top_array" :key="index">
            <div class="item">
                <div class="left">
                    <img :src="item.avatar" alt="">
                </div>
                <div class="middle">
                    <div class="middleTop">
                        <strong class="big">{{ item.billLedger }}</strong>
                        <span class="percentage">{{ item.percentage }}</span>
                    </div>
                    <div class="middleBottom">
                        <van-progress :percentage="item.percentage.replace('%', '')" :pivot-text="item.percentage"
                            :show-pivot=false pivot-color="rgba(66,150,144,1)" stroke-width="6"
                            color="linear-gradient(to right, rgba(66,150,144,1),rgba(42.47,124.31,118.38,1)" />
                    </div>
                </div>
                <div class="right" @click="LinktoDetail(item)">
                    <div class="text">
                        <div class="up">￥{{ item.amount }}</div>
                        <div class="down">{{ item.number }}</div>
                    </div>
                    <div class="icon">
                        <van-icon name="arrow" size=18 color="#928f8f" />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="less" scoped>
#list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 360px;
        height: 50px;
        margin-top: 20px;

        .left {
            width: 45px;
            height: 45px;
            border-radius: 20px;
            background-color: var(--primary--color);
            display: flex;
            justify-content: center;
            align-items: center;

            .pic {
                width: 35px;
                height: 35px;
            }
        }

        .middle {
            width: 200px;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .middleTop {
                width: 150px;
                display: flex;
                margin-bottom: 10px;

                span {
                    position: relative;
                    top: 1px;
                    font-size: 12px;
                    margin-left: 6px;
                    color: #928f8f
                }

            }

            // .middleBottom {}
        }

        .right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex: 1;


            .text {
                position: relative;
                top: 2px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .up {
                    font-size: 16px;
                    font-weight: 700;
                    color: #ff5b5bFF
                }

                .down {
                    margin-top: 2px;
                    font-size: 12px;
                    color: #928f8f
                }
            }

            .icon {
                margin-left: 10px;
            }
        }
    }
}
</style>