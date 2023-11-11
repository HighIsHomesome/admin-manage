<script setup>
// Vue
// Store
import { storeToRefs } from 'pinia';
import useCenterStore from '@/stores/modules/center';
const { account_data } = storeToRefs(useCenterStore())

</script>

<template>
    <div class="top">
        <div class="box toop">
            <div class="net">
                <div class="title">Net Assets</div>
                <div class="amount">￥<span class="total">{{ account_data.net }}</span></div>
            </div>
        </div>
        <div class="box second money">
            <div class="left">
                <span id="assets">assets</span>
                <div class="progress"></div>
            </div>
            <span class="right" id="asset_amount"><span>+￥{{ account_data.assets }}</span></span>
        </div>
        <div class="box bottom money">
            <div class="left">
                <span id="debt">debt</span>
                <div class="progress"></div>
            </div>
            <span class="right" id="debt_amount"><span>-￥{{ account_data.debt }}</span></span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.top {
    width: 100%;
    height: 20vh;
    display: flex;
    flex-direction: column;
    padding-top: 35px;

    .box {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .net {
            font-size: 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .title {
                color: #919191;
            }

            .amount {
                color: #429690;
                position: relative;
                right: 5px;
                margin-top: 10px;
                font-size: 26px;
                font-weight: 600;
                text-shadow: 1px 1px 2px #848484aa;
            }

            .amount::first-letter {
                font-size: 16px;
                font-weight: 500;
            }
        }
    }

    .toop {
        margin-bottom: 20px;
    }

    .money {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;

        .left {
            display: flex;
            align-items: center;
            width: 70%;
            color: #919191;

            span {
                width: 20%;
            }

            .progress {
                width: 50%;
                height: 1vh;
                border-radius: 12px;
                background-image: linear-gradient(120deg, #68e696 0%, #429690 100%);
            }
        }



        .right {
            font-weight: 550;
            width: 30%;
            color: #429690DD;
            font-weight: 600;
            text-shadow: 0px 0px 1px #848484aa;

            span {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>