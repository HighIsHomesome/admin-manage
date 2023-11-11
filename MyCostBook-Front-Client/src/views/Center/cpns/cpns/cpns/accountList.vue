<script setup>
// Util
import { createURLObj } from '@/utils';
// Vant
import { showSuccessToast } from 'vant';
import 'vant/es/toast/style'
// Store
import { storeToRefs } from 'pinia';
import useCenterStore from '@/stores/modules/center';
import useMainStore from '@/stores/modules/main';
const { user } = storeToRefs(useMainStore())
const centerStore = useCenterStore()
/**
* var
*/
const emit = defineEmits(['click:ModifyPopup'])
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
/**
* function
*/
function account_detail(item, index) {
    // console.log(toRaw(item, index))
}
// 删除账户
function del(item, index) {
    const del_account_info = createURLObj({ id: item.id })
    centerStore.post_delAccount(del_account_info).then(res => {
        console.log('Del_account:', res);
        const targetIndex = user.value.account.findIndex(el => {
            return el == item
        })
        user.value.account.splice(targetIndex, 1)
        showSuccessToast('删除成功');
    })
}
</script>

<template>
    <div class="content">
        <div class="titleBanner">
            <div class="title">
                <div>Asset Accounts</div>
            </div>
            <div class="icon">
                <div><img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt=""></div>
            </div>
        </div>
        <div class="list">
            <template v-for="(item, index) in data">
                <van-swipe-cell name="删除" :stop-propagation="true">
                    <div class="item" @click="account_detail(item, index)">
                        <div class="left">
                            <div><img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt=""></div>
                        </div>
                        <div class="middle">
                            <div>{{ item.name }}</div>
                        </div>
                        <div class="right">
                            <div class="amount"><span>￥{{ item.amount }}</span></div>
                        </div>
                    </div>
                    <template #right class="swipe-button-inner">
                        <van-button class="swipe-button" round type="danger" text="删除" @click="del(item, index)" />
                        <van-button @click="emit('click:ModifyPopup', item, index)" class="swipe-button" round
                            color="#429690" type="primary" text="修改" />
                    </template>
                </van-swipe-cell>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    margin-top: 25px;
    width: 100%;
    overflow-y: auto;


    .titleBanner {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 22px;
            font-weight: 550;
        }

        .icon {
            img {
                width: 50px;
                height: 50px;
            }
        }
    }

    .list {
        margin-top: 10px;
        padding: 10px;

        --van-button-default-height: 100%;

        .item {
            color: #111111;
            text-shadow: 0 0 2px #6d6d6dAA;
            height: 60px;
            background: linear-gradient(120deg, #bbbbbb 0%, #bfbfbf 100%);
            border: 1px solid #bfbfbfAA;
            border-radius: 24px;
            box-shadow: 0px 0px 10px #bfbfbfCC;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            box-sizing: border-box;
            padding: 10px;

            .swipe-button-inner {
                .flex();

                .swipe-button {
                    .flex();
                    height: 100%;
                }
            }


            .left {
                width: 15%;
                margin-right: 20px;

                img {
                    background-color: var(--primary--color);
                    box-shadow: 0px 0px 20px rgba(66, 150, 144, .2);
                    border-radius: 50%;
                }
            }

            .middle {
                font-size: 16px;
                width: 60%;
            }

            .right {
                width: 30%;
                height: 100%;
                border-radius: 24px;
                border: 2px solid #b7b7b7;
                box-shadow: 0px 0px 15px #bfbfbfCC;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f7e36dDD;
            }
        }
    }
}
</style>