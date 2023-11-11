<script setup>
const emit = defineEmits(['ShowPopUp:category', 'ShowPopUp:select_outAccount'])
const props = defineProps({
    Text_category: {
        type: String,
        default: ''
    },
    active_tab: {
        type: String,
        default: ''
    },
    text_select_account_out: {
        type: String,
        default: ''
    },
    outAccount_Plus_or_Subtract: {
        type: String,
        default: '-'
    }
})
function click() {
    emit('ShowPopUp:category')
}
function select_outAccount() {
    emit('ShowPopUp:select_outAccount')
}
</script>

<template>
    <div class="category">
        <div v-if="active_tab == 'Expense' || active_tab == 'Income'" class="cost-popUp-box category" @click="click">
            <div class="cost-popUp-box-left categoryLeft">
                <img v-if="active_tab == 'Expense'" class="cost-popUp-img" src="@/assets/img/cost/list/other/shoubiao.svg"
                    alt="">
                <img v-else-if="active_tab = 'Income'" class="cost-popUp-img" src="@/assets/img/cost/list/other/yuechi.svg"
                    alt="">
                <span v-html="Text_category"></span>
            </div>
            <div class="categoryRight">
                <van-icon name="arrow-down" />
            </div>
        </div>
        <div v-else-if="active_tab == 'transform'" class="cost-popUp-box category" @click="select_outAccount">
            <div class="cost-popUp-box-left categoryLeft">
                <div class="pic">
                    <img class="cost-popUp-img" src="@/assets/img/cost/list/other/gongwenbao.svg" alt="">
                </div>
                <span class="text" v-html="text_select_account_out"></span>
            </div>
            <div class="categoryRight">
                <span class="amount"><span v-html="outAccount_Plus_or_Subtract"></span>￥</span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.category {
    /* Rectangle 19 */
    left: 48px;
    top: 140px;

    .categoryLeft {


        img {
            vertical-align: middle;
        }

        span {
            display: block;
            width: 93px;
            height: 17px;
            color: #666666;
            font-size: 14px;
            line-height: 20px;
            margin-left: 15px;

        }
    }

    .categoryRight {
        .amount {
            color: #5e10bf;
            font-weight: 700;
            font-size: 18px;
        }
    }
}
</style>