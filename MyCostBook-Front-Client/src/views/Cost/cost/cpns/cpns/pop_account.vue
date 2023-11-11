<script setup>
// Vue
const emit = defineEmits(['ShowPopUp:account'])
const props = defineProps({
    text_select_account: {
        type: String,
        default: ''
    },
    Plus_or_Subtract: {
        type: String,
        default: '-'
    },
    amount_value: {
        type: String,
        default: undefined
    }
})

function click() {
    emit('ShowPopUp:account')
}
</script>

<template>
    <div class="cost-popUp-box account">
        <div class="cost-popUp-box-left accountLeft" @click="click">
            <div class="pic">
                <img class="cost-popUp-img" src="@/assets/img/cost/list/paypal.svg" alt="">
            </div>
            <div class="text" v-html="text_select_account"></div>
        </div>
        <div class="accountRight">
            <span class="amount"><span v-html="Plus_or_Subtract"></span>￥{{ amount_value }}</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.account {

    left: 48px;
    top: 220px;

    .accountLeft {

        .text {
            display: block;
            margin-left: 15px;
            width: 128px;
            height: 17px;
            color: #666666;
            font-size: 14px;
            line-height: 20px;
        }


        .text::after {
            content: '';
            position: relative;
            left: 8px;
            display: inline-block;
            box-sizing: border-box;
            // background-color: #000;
            width: 10px;
            height: 10px;
            border: 5px transparent solid;
            border-top-color: #888;
            // 
            // transform: rotate();
        }
    }

    .accountRight {
        .amount {
            color: #5e10bf;
            font-weight: 700;
            font-size: 18px;
        }
    }
}
</style>