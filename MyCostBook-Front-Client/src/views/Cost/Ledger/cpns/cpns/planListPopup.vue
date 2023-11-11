<script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'
// Vant

// Utils
import dayjs from 'dayjs';
// 组件

// Store

/**
* var
*/
const emit = defineEmits(['click:submitCreatePlan', 'close:overlay'])
const props = defineProps({
    isshowBottomPopUp: {
        type: Boolean,
        default: false,
    },
    choice_PLan_Mode: {
        type: Number || String,
        default: undefined
    }
})
let iSshowStartDatePopup = ref(false)   // 日期选择器
const _isshowBottomPopUp = computed({
    get() {
        return props.isshowBottomPopUp
    },
    set(value) {
        _isshowBottomPopUp.value = value
    }
})

// 
const Plan_Name = ref()                 // 值：计划名
const daily_money = ref(0)  //每日金额
const target_money = computed(() => {   //达成金额
    return daily_money.value * map_planMode(props.choice_PLan_Mode)
})
const now = ref(dayjs().format('YYYY-MM-DD'))
const added_End_Date = computed(() => {
    const day = map_planMode(props.choice_PLan_Mode)
    return dayjs(now.value).add(day, 'day').format('YYYY-MM-DD')
})

const current_StartDate = ref([dayjs().format('YYYY'), dayjs().format('MM', dayjs().format('DD'))])


/**
* function
*/
function map_planMode(number) {
    switch (number) {
        case 0: return 7
        case 1: return 30
        case 2: return 90
        case 3: return 180
    }
}

function close() {
    console.warn('close');
    _isshowBottomPopUp.value = false
}
</script>

<template>
    <van-popup @click-overlay="emit('close:overlay')" class="popUp" v-model:show="_isshowBottomPopUp" round
        position="bottom" :style="{ height: '60%' }">
        <div class="inner">
            <div class="topBar">
                <div class="icon"><van-icon name="arrow-left" size="24" /></div>
                <span>{{ map_planMode(choice_PLan_Mode) }} Day Saving Plan</span>
            </div>
            <div class="infos">
                <div class="left">
                    <div class="icon">
                        <img src="@/assets/img/home/SavePlan/building.svg" alt="">
                    </div>
                </div>
                <div class="right">
                    <div class="text">
                        <div class="one">{{ map_planMode(choice_PLan_Mode) }}day later</div>
                        <div class="two">can save</div>
                        <div class="three">￥{{ target_money.toFixed(2) }}</div>
                    </div>
                </div>
            </div>
            <div class="box name">
                <input type="text" v-model="Plan_Name" placeholder="Enter Your Saving Plan">
                <div>Plan</div>
            </div>
            <div class="Date Start_date" @click="iSshowStartDatePopup = true">
                <div class="date">
                    <div>Start Date</div>
                </div>
                <div class="Start">{{ now }}</div>
            </div>
            <div class="Date EndDate">
                <div class="date">
                    <div>End Date </div>
                </div>
                <div class="End">{{ added_End_Date }}</div>
            </div>
            <div class="box target_amount">
                <input v-model="daily_money" type="number" placeholder="daily money">
                <div> Amount</div>
            </div>
            <div class="btnInner">
                <div class="btn" @click="emit('click:submitCreatePlan', { Plan_Name, now, daily_money, added_End_Date })">
                    <van-icon name="success" color="#a9e0d1" size="56" />
                </div>
            </div>
        </div>
    </van-popup>
    <van-popup v-model:show="iSshowStartDatePopup" round position="bottom" :style="{ height: '30%', width: '100%', }">
        <van-date-picker v-model="current_StartDate" title="选择起始日期" @confirm="confirms"
            @cancel="iSshowStartDatePopup = false" />
    </van-popup>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.gray {
    border-radius: 24px;
    background-color: #dbdbdb;
}

.popUp {
    color: #3333;

    .inner {
        box-sizing: border-box;
        padding: 20px;
        color: #333;

        .topBar {
            display: grid;
            grid-template-columns: .6fr 2fr;
            height: 50px;


            span {
                font-weight: 600;
                font-size: 22px;
            }
        }

        .infos {
            display: grid;
            grid-template-columns: .8fr 2fr;
            margin-top: 15px;
            height: 80px;

            .left {
                .flex();

                .icon {
                    .flex();
                    width: 70px;
                    height: 70px;
                    background-color: rgba(84, 193, 164, .5);
                    border-radius: 24px;

                    img {
                        width: 50px;
                        height: 50px;
                    }
                }
            }

            .right {
                display: flex;
                align-items: center;

                .text {
                    color: black;
                    font-size: 16px;

                    .three {
                        color: var(--primary--color);
                        margin-top: 5px;
                        font-size: 18px;
                        font-weight: 600;
                    }
                }
            }
        }

        .box {
            margin: 15px 0;
            display: flex;
            align-items: center;
            height: 50px;

            input {
                height: 100%;
                width: 80%;
                margin-right: 8px;
                text-align: center;
                border: 0;
                .gray();
            }


            div {
                .flex();
                flex: 1;
                height: 100%;
                border-radius: 24px;
                background-color: #dbdbdb;
            }
        }

        .Date {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .date {
                display: flex;
                color: #5c5c5c;
                position: relative;
                left: 6%
            }

            .Start {
                font-size: 16px;
                position: relative;
                right: 6%
            }

            .End {
                font-size: 16px;
                position: relative;
                right: 6%
            }
        }

        .Start_date {
            height: 50px;
            margin-top: 10px;
            background-color: #dbdbdb;
            border-radius: 24px;
            .gray();
        }

        .EndDate {
            height: 50px;
            margin-top: 10px;
            background-color: #dbdbdb;
            border-radius: 24px;
            .gray();
        }

        .btnInner {
            display: flex;
            flex-direction: row-reverse;
            margin-top: 10px;

            .btn {
                .flex();
                width: 110px;
                height: 55px;
                border-radius: 24px;
                background-color: var(--primary--color);
            }
        }

    }

}
</style>