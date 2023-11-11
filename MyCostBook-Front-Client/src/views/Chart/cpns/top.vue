<script setup>
import { computed } from 'vue'
// 组件
import empty from '@/components/empty.vue';
import topList from './cpns/cpns/topList.vue'
// Store
import useChartStore from '@/stores/modules/chart';
import { storeToRefs } from 'pinia';
const chartStore = useChartStore()
const { data, current_menu, current_tab, current_dateIndex } = storeToRefs(chartStore)
//

const date_arr = computed(() => {
    return data.value[current_menu.value][current_tab.value].time  // 后端返回可选择的日期（用户有账单记录的）
})
const current_key = computed(() => {
    return date_arr.value[current_dateIndex.value]
})

const top_obj = computed(() => {
    return data.value[current_menu.value][current_tab.value].top_obj
})
const top_array = computed(() => {
    return top_obj.value[current_key.value]
})
const isEmpty = computed(() => {
    if (top_array.value == undefined) return true
})
//
</script>

<template>
    <div class="top">
        <div id="title">Top</div>
        <topList :isEmpty="isEmpty" :top_array="top_array" v-if="!isEmpty" />
        <div id="top-empty" v-if="isEmpty">
            <empty v-if="isEmpty">
                <template #icon>
                    <div class="iconfont icon-jiluqueshengshuxing"></div>
                </template>
            </empty>
        </div>
    </div>
</template>

<style lang="less" scoped>
.top {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
    margin-top: 20px;

    #title {
        margin-left: 25px;
        font-size: 28px;
        font-weight: 800;
        color: var(--primary--color) // color: #333;
    }

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

    #top-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20% 0;
    }
}
</style>