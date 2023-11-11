<script setup>
// utils
import { createURLObj } from '@/utils';
// 组件
import empty from '@/components/empty.vue'
// router
import { useRouter } from 'vue-router';
// 
import dayjs from 'dayjs';
import { ref, watch, computed, toRaw, onMounted, onUnmounted } from 'vue';
// Vant
import { showNotify } from 'vant';
import 'vant/es/notify/style'
// 
import useCostStore from '@/stores/modules/cost'     //Cost
import { storeToRefs } from 'pinia';
const costStore = useCostStore()
const { obj, del_bill_info, reach150 } = storeToRefs(costStore)
// import { resolveBaseUrl } from 'vite';
// 
const router = useRouter()
// 
const props = defineProps({
    list: {
        type: Object,
        default: () => { }
    },
    reach150: {
        type: Boolean,
        default: false
    },
    testt: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['changeMonth'])

// 保留两位小数
function keepTwoDecimalStr(num) {
    const result = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
    let s = result.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return Number(s);
};
const showPickDate = ref(false)
const currentDate = ref([dayjs().format('YYYY'), dayjs().format('MM')])
/** */
const left = ref({
    color: '#222',
    'font-size': '16px',
    transition: 'all .5s ease-out',

})
watch(reach150, (newV) => {
    !newV ? left.value.color = '#222' : left.value.color = '#2e7e79'
})
watch(() => props.testt, (newV) => {
    console.log(newV);
})

function getUrl(img) {
    return new URL(`../../../../assets/img/cost/list/other/${img}`, import.meta.url).href
}
// const getTime = computed((date) => {
//     return dayjs(date).format('HH:mm:ss')
// })
function getTime(date) {
    return dayjs(date).format('HH:mm:ss')
}
// 
function clickItem(item, value) {
    console.log('ID:', item.id, 'date:', item.date, toRaw(value), value.date, '同组账单', value.bills);
    router.push({
        path: '/detail:id' + item.id,
        query: item.id,
        params: item
    })
}

//
const titleText = ref(`This Month Transactions`)

function confirms(value,) {
    const year = value.selectedValues[0]
    const month = value.selectedValues[1]
    console.log(`${year}-${month}`);
    /**
    * 事件 emit =>给cost
    * 
    * 选择：只能今年1-12月
    * 
    * costStore.get_bill_list(book_id, current_month)
    * 
    * 重新发送网络请求：当前分页改为1   book_id不变    current_month 变
    */
    emit('changeMonth', `${year}-${month}`)
    titleText.value = `${year}-${month} Transactions`
    showPickDate.value = false
}
function del_bill(value, item) {
    console.group('开始删除');
    console.log('删除项:', toRaw(item));
    console.log('删除数组:', toRaw(value.bills));
    // 发送网络请求，
    del_bill_info.value = createURLObj({ id: item.id })
    // 返回200
    costStore.post_del_bill().then(data => {
        console.log(data);
        const targetIndex = value.bills.findIndex(el => {
            return el.id == item.id
        })
        console.log('targetIndex', targetIndex, value.bills[targetIndex], toRaw(value.bills));
        // 删除数据
        if (item.pay_type == 1) {
            obj.value.total_income -= keepTwoDecimalStr(value.bills[targetIndex].amount)    //修改总金额
        }
        else if (item.pay_type == 2) {
            obj.value.total_expense -= keepTwoDecimalStr(value.bills[targetIndex].amount)    //修改总金额
        }
        value.bills.splice(targetIndex, 1)
        setTimeout(() => { showNotify({ type: 'success', message: '删除成功' }); }, 500);
        console.groupEnd('开始删除');
    })
        .catch(error => {
            console.warn(error);
        })
}
const red_style = { color: '#ff5b5b' }
const green_style = { color: '#52a3a1' }
function set_style(type) {
    if (type == 2) return red_style
    if (type == 1) return green_style
}



</script>

<template>
    <router-view></router-view>
    <van-popup v-model:show="showPickDate" round position="center" :style="{ height: '30%', width: '100%', }">
        <van-date-picker :columns-type="['year', 'month']" v-model="currentDate" title="选择日期" @confirm="confirms"
            @cancel="showPickDate = false" />
    </van-popup>
    <div class="list">
        <div class="title" @click="showPickDate = true" ref="Ref_title">
            <div class="titleInner">
                <!-- 列表标题 -- 月份 -->
                <div :style="left">
                    <h3 v-html="titleText"></h3>
                </div>
                <!-- 选择月份 -->
                <div class="right"><span>See More</span></div>
            </div>
        </div>
        <div class="bills" v-if="list.length > 0">
            <template v-for="(value, key, index) in list" :key="index">
                <div class="item">
                    <h3>{{ value.date }}</h3>
                    <template v-for="(item, indey) in value.bills" :key="indey">
                        <van-swipe-cell>
                            <template #left>
                                <van-button square type=" primary" text="标记" class="delete-button-left" />
                            </template>
                            <div class="iten" @click="clickItem(item, value)">
                                <div class="left">
                                    <div class="picture">
                                        <!-- <img src="../../../../assets/img/cost/list/airbnb.svg" alt=""
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                style="display: block;width: 44px;height:40px"> -->
                                        <img src="@/assets/img/cost/list/other/jinggao.svg" alt=""
                                            style="display: block;width: 35px;height:35px">
                                        <!-- <img :src="getUrl(item.icon)" alt="" style="display: block;width: 35px;height:35px"> -->
                                    </div>
                                    <div class="infos">
                                        <div class="top"><span>{{ item.category_name }}</span></div>
                                        <div class="bottom"><span> {{ getTime(item.date) }} </span></div>
                                    </div>
                                </div>
                                <div class="amount" :style="item.style"><span :style="set_style(item.pay_type)">${{
                                    item.amount
                                }}</span>
                                </div>
                            </div>
                            <template #right>
                                <van-button square type="danger" @click="del_bill(value, item)" text="删除"
                                    class="delete-button-right" />
                                <van-button square type="primary" text="退款" class="delete-button-right"
                                    style="background-color: pink;border-color: pink;" />
                            </template>
                        </van-swipe-cell>
                    </template>
                </div>
            </template>
        </div>
        <div class="empty" v-else-if="list.length === 0">
            <empty />
        </div>
    </div>
</template>

<style lang="less" scoped>
.list {
    position: absolute;
    top: 370px;
    padding: 0 25px;
    width: 90vw;
    // 视口的高度-表格的bottom-（users顶部到页面视口的距离）
    // height: 100vh;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;

    ::-webkit-scrollbar {
        overflow-y: hidden;
        overflow-x: hidden;
    }

    .title {
        position: sticky;
        z-index: 9;
        top: 0;
        background-color: #fff;
        // box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

        .titleInner {
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;

            .right {
                color: #666666;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                position: relative;
                right: 10px;
            }
        }

    }

    .bills {
        display: flex;
        flex-direction: column;
        margin-bottom: 60px;


        .item {
            .delete-button-right {
                margin-left: 1px;
                height: 100%;
            }

            .delete-button-left {
                margin-right: 1px;
                height: 100%;
                background-color: var(--primary--color);
                border-color: var(--primary--color);
            }

            .iten {
                display: flex;
                width: 100%;
                height: 66px;
                padding: 0 0 0 0;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;

                .left {
                    display: flex;

                    .picture {
                        display: flex;
                        position: relative;
                        justify-content: center;
                        align-items: center;
                        width: 50px;
                        height: 50px;
                        border-radius: 25px;
                        background-color: #D0E6E4FF;

                    }

                    .infos {
                        margin-left: 15px;
                        display: flex;
                        flex-direction: column;

                        .top {
                            font-size: 16px;
                            font-weight: 550;
                            color: #333;
                        }

                        .bottom {
                            color: #8c8686;
                            font-size: 12px;
                            margin-top: 10px;
                        }
                    }
                }

                .amount {
                    font-weight: 700;
                    font-size: 16px;
                    filter: blur(0.1px);
                }


            }
        }

    }

    .empty {
        display: grid;
        margin-top: 100px;
    }
}
</style>