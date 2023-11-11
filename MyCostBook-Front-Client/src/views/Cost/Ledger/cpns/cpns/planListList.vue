<script setup>
import { computed } from 'vue'
// Utils
import { createURLObj } from '@/utils';
// Vant
import { showSuccessToast } from 'vant'
import 'vant/es/toast/style'
// 路由
import { useRouter } from 'vue-router'
// Store 
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main';
import useCostStore from '@/stores/modules/cost';
const costStore = useCostStore()
// Main
const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)
/**
* var
*/
const PlanList = computed(() => {
    return user.value.plan
})
const emit = defineEmits(['click:planItem', 'click:delPlanItem'])

const router = useRouter()
/**
* function
*/
function toPercent(point) {
    var str = Number(point * 100).toFixed(1);
    return str;
}
/** 删除计划 */
function Del_Plan_Item(item) {
    const del_plan_info = createURLObj({ id: item.id })
    costStore.post_del_plan(del_plan_info).then(data => {
        const target_index = user.value.plan.findIndex(el => el.id == data)
        user.value.plan.splice(target_index, 1)
        showSuccessToast('成功删除');
    })
}
/** 路由跳转 */
function clickPlan_Item(item, index) {
    router.push({
        path: '/plan_detail',
        name: '计划详情',
        query: {
            id: item.id,
            name: item.name,
            period: item.period,
            start_date: item.start_date,
            'end-date': item['end-date'],
            daily_money: (item.daily_money).toFixed(2),
            target_money: (item.target_money).toFixed(2),
            saved_money: item.saved_money.toFixed(2),
            picture: item.picture,
            light_number: Math.floor(item.saved_money.toFixed(2) / item.daily_money),
        }
    })
}
</script>

<template>
    <div class="list">
        <template v-for="(item, index) in PlanList">
            <van-swipe-cell>
                <div class="item" @click="clickPlan_Item(item, index)">
                    <div class="icon">
                        <img src="@/assets/img/home/SavePlan/coffee.svg" alt="">
                    </div>
                    <div class="content">
                        <div class="ctx top">
                            <span class="left">{{ item.name }}</span>
                            <span class="top_right"><span>{{ item.period }} Day</span></span>
                        </div>
                        <div class="ctx middle">
                            <span class="current">deposited ￥{{ (item.saved_money).toFixed(2) }}</span>
                            <span class="total">￥{{ (item.target_money).toFixed(2) }}</span>
                        </div>
                        <div class=" ctx foot">
                            <div class="progress">
                                <van-progress :percentage="toPercent(item.saved_money / item.target_money)"
                                    color="linear-gradient(to right,#42958F,#7AC5CD)" />
                            </div>
                        </div>
                    </div>
                </div>
                <template #right>
                    <van-button @click="Del_Plan_Item(item)" style="margin-left: 12px;height:100%;border-radius: 18px;"
                        square type="danger" text="Delete" />
                    <van-button style="margin-left: 4px;height:100%;border-radius: 18px;" color="#30827c" square
                        type="primary" text="Modify" />
                </template>
            </van-swipe-cell>
        </template>
    </div>
</template>

<style lang="less" scoped>
.list {
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
    height: 60vh;
    overflow-y: auto;

    .item {
        display: flex;
        margin-bottom: 20px;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 65px;
            height: 65px;
            background-color: #c7bdbd;
            border-radius: 15px;

            img {
                display: block;
                width: 40px;
                height: 40px
            }
        }

        .content {
            margin-left: 10px;
            width: 300px;

            .ctx {
                margin-bottom: 6px;
            }

            .top {
                font-size: 15px;
                display: flex;
                justify-content: space-between;

                .top_right {
                    padding: 0 4px 0;
                    background-color: rgba(235, 67, 67, 0.4);
                    border-radius: 6px;

                    span {
                        font-size: 12px;
                        line-height: 18px;
                    }
                }
            }

            .middle {
                display: flex;
                justify-content: space-between;
                display: flex;

                .current {
                    font-size: 12px;
                    color: var(--second--color)
                }

                .total {
                    font-weight: 900;
                    color: rgba(235, 67, 67, 0.797);
                    font-size: 16px;
                }
            }

            .foot {
                padding-top: 8px;
                display: flex;
                justify-content: space-between;

                .progress {
                    width: 100%;
                }
            }
        }
    }
}
</style>