<script setup>
// Vue
import { ref, computed } from 'vue'
// Vant
import { showSuccessToast, showFailToast } from 'vant'
import 'vant/es/toast/style'
// Utils
import dayjs from 'dayjs'
import { createURLObj } from '@/utils'
import { keepTwoDecimalStr } from '@/utils'
import getRefGroup from '@/utils/getRefGroup'
// 组件
import topBar from './cpns/topbar.vue'
import infos from './cpns/infos.vue'
import detailTitle from './cpns/title.vue'
import popup from './cpns/popup.vue'
// Router
import { useRoute } from 'vue-router'
// Store
import { storeToRefs } from 'pinia'
import useMainStore from '@/stores/modules/main'
import useCostStore from '@/stores/modules/cost'
import useCenterStore from '@/stores/modules/center'
const mainStore = useMainStore()
const centerStore = useCenterStore()
const costStore = useCostStore()
const { user } = storeToRefs(mainStore)
/**
* var
*/
const route = useRoute()
// user.value.plan
/**
* function
*/
function handle_PlanDetail(start_date, daily_money, period) {
    let detailArr = new Array()
    const hand = () => {
        for (let day = 0; day <= period - 1; day++) {
            const obj = {}
            obj.amount = daily_money
            detailArr.push(obj)
            obj.total = detailArr.reduce((pre, cur) => {
                return pre += keepTwoDecimalStr(cur.amount)
            }, 0)
            obj.date = dayjs(start_date, 'YYYY-MM-DD').add(day, 'day').format('YYYY-MM-DD')
        }
        return detailArr
    }
    return hand
}
const handler = handle_PlanDetail(dayjs(route.query.start_date).add(8, 'hour'), route.query.daily_money, route.query.period)

// 数组数组
const detail_arr = ref(handler())
let scrool_index = 0
// 计算已存的个数
_for: for (let index = 0; index < detail_arr.value.length; index++) {
    const element = detail_arr.value[index];
    if (index < route.query.light_number) element.active = true
    if (index >= route.query.light_number) {
        scrool_index = index
        break _for;
    }
}

/**
 * 跳转
 */
const { group, handle } = getRefGroup()
const Ref_Content = ref()
let isToBottom = true

function clickSrcoolTo() {
    const Top_Content = Ref_Content.value.offsetTop // 获取Content距离顶部的高度
    // 跳转
    if (isToBottom) {
        Ref_Content.value.scroll({
            top: group[scrool_index].offsetTop - Top_Content - 100 - 20, // 减去Content距离顶部的高度、卡片的高度、还不够再减20
            behavior: "smooth"
        });
    }
    else if (!isToBottom) {
        Ref_Content.value.scroll({
            top: 0, // 减去Content距离顶部的高度、卡片的高度、还不够再减20
            behavior: "smooth"
        });
    }
    isToBottom == true ? isToBottom = false : isToBottom = true // 修改状态
}

/**
 * 点击事件 
 * 翻页 
 * 加钱
 */
function clickItem(item, index, $event) {

    function sendUpdate(mode) {
        if (!mode) return
        const update_plan_info = createURLObj({ id: route.query.id, daily_money: route.query.daily_money, mode: mode })
        costStore.Update_plan(update_plan_info)
            .then(data => {
                const targetIndex = user.value.plan.findIndex(item => item.id == route.query.id)
                // 修改总金额
                if (mode == 1) {
                    user.value.plan[targetIndex].saved_money += keepTwoDecimalStr(route.query.daily_money)
                    Deposited.value = keepTwoDecimalStr(Deposited.value + keepTwoDecimalStr(route.query.daily_money))
                }
                else if (mode == 2) {
                    user.value.plan[targetIndex].saved_money -= keepTwoDecimalStr(route.query.daily_money)
                    Deposited.value = keepTwoDecimalStr(Deposited.value - keepTwoDecimalStr(route.query.daily_money))
                }
                else throw Error('翻页出错了')
                // 修改总金额 End
                showSuccessToast('成功')
                item.active == true ? item.active = false : item.active = true
            })
            .catch(() => {
                showFailToast('失败')
            })
    }
    if (item.active == undefined || item.active == false) {
        // 翻页点亮
        sendUpdate(1)
        setTimeout(() => {
            showBottomPopup.value = true
        }, 1000);
    }
    else if (item.active == true) {
        // 取消
        sendUpdate(2)
    }
}

/**
 * 计算属性 
 * 保留两位小数
 */
const Deposited = ref(Number(route.query.saved_money))
const remaining = computed(() => {
    return (route.query.target_money - Deposited.value).toFixed(2)
})

/**
 * 转账逻辑
 */
const showBottomPopup = ref(false)
function submitTransfer(pramas) {
    const { debitAccount, depositAccount } = pramas
    console.warn(debitAccount, depositAccount);
    if (!debitAccount || !depositAccount) {
        showFailToast('参数不能为空')
        return
    }
    else {
        const addAmount = Number(debitAccount.amount) - Number(route.query.daily_money)
        const subAmount = Number(depositAccount.amount) + Number(route.query.daily_money)
        const post_debitAccount = createURLObj({ id: debitAccount.id, name: debitAccount.name, amount: addAmount })
        const post_depositAccount = createURLObj({ id: depositAccount.id, name: depositAccount.name, amount: subAmount })
        console.warn('addAmount:', addAmount, 'subAmount:', subAmount);
        // 
        const p2 = centerStore.post_ModifyAccount(post_depositAccount).then(data => {
            if (!data) {
                console.log('❌  p2失败', data)
                return
            }
            console.log('🔥  p2成功', data)
        }).then(() => {
            const p1 = centerStore.post_ModifyAccount(post_debitAccount).then(data => {
                if (!data) {
                    console.log('❌  p1失败', data)
                    return
                }
                console.log('🔥  p1成功', data);
            })
        }).catch(reason => {
            throw new Error(reason)
        })

        const success = Promise.all([p2])
        success.then(() => {
            // debit
            const targetdebitIndex = user.value.account.findIndex(el => {
                return el.id === debitAccount.id
            })
            console.warn('debit:', user.value.account[targetdebitIndex]);
            user.value.account[targetdebitIndex].amount = debitAccount.amount - Number(route.query.daily_money)
            // deposit
            const targetdepositIndex = user.value.account.findIndex(el => {
                return el.id === depositAccount.id
            })
            console.warn('deposit:', user.value.account[targetdepositIndex]);
            user.value.account[targetdepositIndex].amount = depositAccount.amount + Number(route.query.daily_money)
            // 
        }).then(() => {
            showSuccessToast('转账成功')
            console.log('%c 我成功啦', 'background:green');
            showBottomPopup.value = false
        }).catch(reason => {
            showSuccessToast(`转账失败:${reason}`)
        })
    }
}
</script>   
<template>
    <div class="plan_detail">
        <topBar />
        <infos :Deposited="Deposited" :remaining="remaining" />
        <div class="line"> </div>
        <detailTitle @update:scrooTo="clickSrcoolTo" />
        <div class="content" ref="Ref_Content">
            <template v-for="(item, index) in detail_arr" :key="index">
                <div class="item" :ref="handle" :class="{ flip: item.active, 'style-filled': item.active }"
                    @click="clickItem(item, index)">
                    <div class="amount">
                        ￥ <span>{{ item.amount }}</span>
                    </div>
                    <div class="total">total ￥<span>{{ item.total.toFixed(2) }}</span></div>
                    <div class="date">{{ item.date }}</div>
                </div>
            </template>
        </div>
        <popup @click-submit="submitTransfer" @click-overlay="showBottomPopup = false" :showBottomPopup="showBottomPopup" />
    </div>
</template>

<style lang="less" scoped>
@keyframes flip-vertical {

    0% {
        transform: translateZ(-800px) rotateY(90deg);
        opacity: 0;
    }

    50% {
        transform: translateZ(-160px) rotateY(87deg);
        opacity: 1;
    }

    100% {
        transform: translateZ(0) rotateY(0);
    }
}


.flip {
    background-color: #ffe672;
    animation-name: flip-vertical;
    animation-duration: .5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;

}

.style-filled {
    color: aliceblue !important;
    background-color: rgba(66, 150, 144, 1) !important;

    span {
        color: aliceblue !important;
    }
}


.plan_detail {
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    z-index: 999;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    overflow-y: hidden;




    .line {
        margin-top: 20px;
        width: 100%;
        height: 20px;
        border-bottom: .7vw solid #d5d5d5aa;
        border-radius: 12px;
    }

    .content {
        margin-top: 25px;
        padding-bottom: 50px;
        display: grid;
        overflow-y: auto;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(autp-fill 1fr);
        grid-gap: 20px 20px;



        .item {
            color: #483c3c;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100px;
            background-color: rgba(66, 150, 144, .8);
            border-radius: 16px;
            border: 1px solid rgba(66, 150, 144, .2);
            box-shadow: 0 0 10px rgba(66, 150, 144, .8);

            .amount {
                margin-bottom: 5px;

                span {
                    color: #333;
                    font-weight: 700;
                    font-size: 20px;
                }
            }

            .total {
                margin-bottom: 10px;

                span {
                    color: #333;
                    font-weight: 700;
                }
            }
        }
    }
}
</style>