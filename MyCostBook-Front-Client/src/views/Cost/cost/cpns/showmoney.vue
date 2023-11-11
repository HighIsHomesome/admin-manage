<script setup>
// Vue
import { computed } from 'vue';
// Store
import useCostStore from '@/stores/modules/cost';
import { storeToRefs } from 'pinia';
const costStore = useCostStore()
const { obj } = storeToRefs(costStore)

/**
 * 保留两位小数
 */
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


const expense = computed(() => keepTwoDecimalStr(obj.value.total_expense))
const income = computed(() => keepTwoDecimalStr(obj.value.total_income))

const net = computed(() => income.value - expense.value)


</script>

<template>
    <div class="showMoney">
        <div class="inner">
            <div class="top">
                <div class="topSelect">
                    <div class="topLeft">
                        <span>Total Balance </span>
                        <van-icon name="arrow-up" size="8" />
                    </div>
                    <div class="topRight"><van-icon name="ellipsis" size="20" /></div>
                </div>
                <div class="totalBalance">${{ net }}</div>
            </div>
            <div class="foot">
                <div class="item footleft">
                    <div class="itemtop">
                        <div class="icon"><span>↓</span></div>
                        <span class="type">Income</span>
                    </div>
                    <div class="itembottom">${{ income }}</div>
                </div>
                <div class="item footright">
                    <div class="itemtop">
                        <div class="icon"><span>↑</span></div>
                        <span class="type">Expenses</span>
                    </div>
                    <div class="itembottom" id="last">${{ expense }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.showMoney {
    position: absolute;
    z-index: 999;
    width: 374px;
    height: 202px;
    // background-color: #ffffffaa;
    background-color: #2E7E79;
    left: 23px;
    right: 20px;
    top: 155px;
    border-radius: 20px;

    .inner {
        color: #ffffff;
        padding: 35px 20px;

        .top {
            .topSelect {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                opacity: .95;

            }

            .totalBalance {
                margin-top: 2px;
                font-weight: 750;
                font-size: 26px;
                // filter: blur(0.01px);
                // opacity: .8;
            }

            .totalBalance::first-letter {
                margin-right: 2px;
            }
        }

        .foot {
            position: relative;
            margin-top: 35px;
            display: flex;
            justify-content: space-between;

            .item {
                display: flex;
                flex-direction: column;


                .itemtop {
                    display: flex;
                    align-items: center;



                    .icon {
                        display: flex;
                        justify-content: center;
                        width: 22px;
                        height: 22px;
                        background-color: #4e918d;
                        border-radius: 11px;
                        color: #ffffffaa;
                        margin-right: 5px;

                        span {
                            font-size: 16px;
                            color: #ffffffCC;
                            position: relative;
                            top: 1px;
                        }
                    }

                    .type {
                        font-size: 14px;
                        position: relative;
                        top: 2px;
                    }
                }

                .itembottom {
                    font-weight: 700;
                    margin-top: 8px;
                    font-size: 20px;
                }

                .itembottom::first-letter {
                    margin-right: 2px;
                }

                // .itembottom
            }

            span {

                color: #a7dbd7;
            }

            #last {
                position: relative;
                left: 15px
            }
        }
    }


}

.showMoney::before {
    content: "";
    display: block;
    width: 356px;
    height: 14px;
    position: absolute;
    // z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #1B5C58;
    border-radius: 18px;
    margin-top: 192px;
    margin-left: 10px;
    filter: blur(15px);
    opacity: .8;
}
</style>