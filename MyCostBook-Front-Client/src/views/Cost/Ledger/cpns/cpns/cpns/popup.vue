<script setup>
// Vue
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
// Store
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main';
const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)
/**
* var
*/
const showDebit = ref(false)
const props = defineProps({
    showBottomPopup: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['click-overlay', 'click-submit'])


const _showBottomPopup = computed(() => {
    return props.showBottomPopup
})

const route = useRoute()

// 
const test_selectAccount = ref('Select Debit Account')
const debitAccount_name = ref()
const debitAccount = ref()
const depositAccount_name = ref()
const depositAccount = ref()
const targetMoney = ref(route.query.daily_money)

/**
* function
*/
function selectedAccount(item) {
    if (test_selectAccount.value === 'Select Debit Account') {
        debitAccount.value = { id: item.id, name: item.name, amount: item.amount }
        debitAccount_name.value = item.name
        showDebit.value = false
    }
    else if (test_selectAccount.value === 'Select Deposit Account') {
        depositAccount.value = { id: item.id, name: item.name, amount: item.amount }
        depositAccount_name.value = item.name
        showDebit.value = false
    }
}
</script>

<template>
    <div class="popUp">
        <van-popup v-model:show="showDebit" round position="bottom" :style="{ height: '40%' }">
            <div class="Select-Account">
                <h1 v-html="test_selectAccount"></h1>
                <div class="list">
                    <template v-for="(item, index) in user.account">
                        <div class="item" @click="selectedAccount(item)">
                            <div class="list-icon">
                                <img src="@/assets/img/cost/list/evernote.svg" alt="">
                            </div>
                            <div class="name">{{ item.name }}</div>
                            <div class="amount"><span>￥{{ item.amount }}</span></div>
                        </div>
                    </template>
                </div>
            </div>
        </van-popup>
        <!-- Select debit deposit-->
        <van-popup @click-overlay="emit('click-overlay')" v-model:show="_showBottomPopup" round position="bottom"
            :style="{ height: '60%' }">
            <div class="inner">
                <div class="topBar">
                    <div class="icon">
                        <img src="@/assets/img/home/SavePlan/building.svg" alt="">
                    </div>
                    <h3>Deposit ￥{{ targetMoney }}</h3>
                    <p>stick to it for your savings plan</p>
                </div>
                <div class="select debit">
                    <input @click="showDebit = true; test_selectAccount = 'Select Debit Account'" type="text"
                        v-model="debitAccount_name" placeholder="Select debit account">
                    <div>debit</div>
                </div>
                <div class="select deposit">
                    <input @click="showDebit = true; test_selectAccount = 'Select Deposit Account'"
                        v-model="depositAccount_name" type="text" placeholder="Select deposit account">
                    <div> deposit</div>
                </div>
                <div class="btnInner">
                    <div class="btn" @click="emit('click-submit', { debitAccount, depositAccount })"><van-icon
                            name="success" color="#a9e0d1" size="56" /></div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<style lang="less" scoped>
.Select-Account {
    .flex();
    flex-direction: column;
    align-items: center;

    .list {
        box-sizing: border-box;
        padding: 0 30px;
        width: 100%;
        color: #333;
        overflow-y: auto;

        .item {
            margin-top: 15px;
            display: grid;
            grid-template-columns: .3fr 1fr .3fr;

            .list-icon {
                align-self: center;
                display: grid;
                width: 50px;
                height: 50px;
                background-color: #bfbfbfAA;
                border-radius: 24px;

                img {
                    place-self: center;
                    width: 35px;
                    height: 35px;
                    text-align: center;
                }
            }

            .name {
                align-self: center;
                margin-left: 5px;
                font-size: 16px;
            }

            .amount {
                margin-right: 10px;
                align-self: center;
                display: flex;
                justify-content: flex-end;
                font-size: 16px;
                font-weight: 550;

            }
        }

        .item:active {
            border-radius: 24px;
            background-color: #bfbfbfAA;
        }

    }

}

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
        margin-top: 20px;
        box-sizing: border-box;
        padding: 20px;
        color: #333;

        .topBar {
            display: flex;
            flex-direction: column;
            align-items: center;

            .icon {
                .flex();
                width: 100px;
                height: 100px;
                background-color: rgba(84, 193, 164, .5);
                border-radius: 24px;

                img {
                    width: 80px;
                    height: 80px;
                }
            }

        }

        .select {
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
</style>