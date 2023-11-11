<script setup>
// Vue
import { ref } from 'vue';
// Vant
import { showSuccessToast } from 'vant';
import 'vant/es/toast/style'
// 组件
import Banner from './cpns/accountBanner.vue'
import top from './cpns/accountTop.vue'
import list from './cpns/accountList.vue'
import popUp from './cpns/accountPopup.vue'
// Util
import { createURLObj } from '@/utils';
// Store
import { storeToRefs } from 'pinia';
import useCenterStore from '@/stores/modules/center';
import useMainStore from '@/stores/modules/main';
const { user } = storeToRefs(useMainStore())
const centerStore = useCenterStore()
// Props -- 由Index传入 （通过RouterView） 
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    },

})
// 创建/修改账户
const text_popupTtile = ref('Create Account')

let subMit = ref({
    id: undefined,
    name: undefined,
    amount: undefined,
})
// 开关
const showPopUpBottom = ref(false)
// 打开修改账户弹出层
const popModifyUp = (item, index) => {
    text_popupTtile.value = 'Modify Account'
    subMit.value = { id: item.id, name: item.name, amount: item.amount }
    console.log(`%c ${item}, ${index}`, 'background:green');
    showPopUpBottom.value = true
}
const clickPopUp = () => {
    text_popupTtile.value = 'Create Account'
    showPopUpBottom.value = true
}
// 提交
function submit() {
    if (text_popupTtile.value === 'Modify Account') {
        const modifyAccount_info = createURLObj(subMit.value)
        centerStore.post_ModifyAccount(modifyAccount_info).then(data => {
            console.log('成功🔥', data);
            // 修改视图
            const targetIndex = user.value.account.findIndex(el => {
                return el.id === subMit.value.id
            })
            user.value.account[targetIndex].name = subMit.value.name
            user.value.account[targetIndex].amount = subMit.value.amount
            // 还原
            showSuccessToast('修改成功');
            setTimeout(() => { showPopUpBottom.value = false }, 500);
        }).catch(reason => {
            showSuccessToast('失败!');
            console.error(reason)
        })
    }
    else {
        console.warn({ name: subMit.value.name, pay_type: 0, amount: subMit.value.amount });
        const add_account_info = createURLObj({ name: subMit.value.name, pay_type: 0, amount: subMit.value.amount })
        centerStore.post_addAccount(add_account_info).then(insertId => {
            user.value.account.push({ id: insertId, name: subMit.value.name, pay_type: 0, user_id: user.value.userInfo.id, amount: subMit.value.amount })
            showSuccessToast('添加成功');
            setTimeout(() => {
                showPopUpBottom.value = false
            }, 500);
        }).catch((reason) => {
            showSuccessToast('失败!');
            console.error(reason)
        })
    }
}
// 还原
function clearPopup() {
    subMit.value.name = undefined
    subMit.value.amount = undefined
}

</script>

<template>
    <div class="accountMananger">
        <Banner />
        <top />
        <div class="line"></div>
        <list @click:ModifyPopup="popModifyUp" :data="data" />
        <div class="footer" @click="clickPopUp"><span>Add your Asset</span></div>
        <popUp @submit="submit" @close:clearPopup="clearPopup"
            @update:subMitAmount="(newAmount) => subMit.amount = newAmount"
            @update:subMitName="(newName) => subMit.name = newName" v-model.submit="subMit"
            @click:overlay="showPopUpBottom = false" :showPopUpBottom="showPopUpBottom"
            :text_popupTtile="text_popupTtile" />
    </div>
</template>

<style lang="less">
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.accountMananger {
    box-sizing: border-box;
    padding: 30px 20px 60px;
    position: fixed;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    background-color: #e2e2e2;
    display: flex;
    flex-direction: column;
    font-family: Inter;

    .line {
        position: relative;
        right: 20px;
        height: 10px;
        width: 100vw;
        background-color: #e8e8e8;
    }

    .footer {
        margin-top: 60px;
        position: fixed;
        z-index: 5;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-image: linear-gradient(120deg, #84fab0 0%, #429690 100%);
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-weight: 550;
            font-size: 20px;
            color: aliceblue;
            text-shadow: 2px 2px #429690;
        }
    }


}
</style>