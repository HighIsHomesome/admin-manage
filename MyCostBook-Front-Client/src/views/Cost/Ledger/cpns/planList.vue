<script setup>
// Vue
import { ref, computed } from 'vue';
// Utils
import { createURLObj } from '@/utils';
// 组件
import ListTitle from './cpns/planListTitle.vue'
import List from './cpns/planListList.vue'
import popUp from './cpns/planListPopup.vue'
import empty from '@/components/empty.vue'
// Store 
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main';
import useCostStore from '@/stores/modules/cost';
const costStore = useCostStore()
// Main
const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)

/**
 * 选择的存钱模式
 */
const options = [
    {
        name: '7 Day',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-fire.png',
    },
    {
        name: '30 Day',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-light.png',
    },
    {
        name: '90 Day',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-water.png',
    },
    {
        name: '180 Day',
        icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/custom-icon-fire.png',
    },
];
const choice_PLan_Mode = ref()          // 值：选择模式

/**
 * 开关
 */
const isShowOptions = ref(false)
const isShowBottomPopUp = ref(false)
const isEmpty = computed(() => {
    if (Object.prototype.toString.call(user.value.plan) == '[object Array]' && user.value.plan.length === 0) return true
    else return false
})

/** 点击按钮 -- 创建计划 -- 计划选择 */
function select_planMode(option, index) {
    isShowBottomPopUp.value = true
    choice_PLan_Mode.value = index
}
/** 点击按钮 -- 创建计划 -- 计划选择 -- 确认创建 */
function Submit(pramas) {
    const { Plan_Name, now, daily_money, added_End_Date } = pramas
    function map_planMode(number) {
        switch (number) {
            case 0: return 7
            case 1: return 30
            case 2: return 90
            case 3: return 180
        }
    }
    const period = map_planMode(choice_PLan_Mode.value)  // 模式
    const obj = { name: Plan_Name, period: period, start_date: now, daily_money: daily_money }
    const add_plan_info = createURLObj(obj)
    costStore.post_create_plan(add_plan_info).then(data => {
        console.log('create_plan成功🔥', data);
        // showSuccessToast('创建成功');
        // 添加列表项
        obj.id = data.plan_id
        obj['end-date'] = added_End_Date
        obj.target_money = daily_money * period
        obj.saved_money = 0
        obj.persentage = '0.0%'
        user.value.plan.push(obj)
        isShowBottomPopUp.value = false
        isShowOptions.value = false
    })
}

</script>

<template>
    <div class="planList">
        <ListTitle @click:add-saving-plan="isShowOptions = true" />
        <List v-if="!isEmpty" />
        <empty v-else-if="isEmpty" />
        <van-share-sheet @select="select_planMode" v-model:show="isShowOptions" :options="options" />
        <popUp :isshowBottomPopUp="isShowBottomPopUp" @close:overlay="isShowBottomPopUp = false"
            @click:submitCreatePlan="Submit" :choice_PLan_Mode="choice_PLan_Mode" />
    </div>
</template>

<style lang="less" scoped>
.planList {
    width: 370px;
    height: 50vh;
    position: absolute;
    top: 350px;
    color: black;
    padding: 22px;
    margin-bottom: 80px;
    display: grid;
    grid-template-rows: .15fr 1fr;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }

}
</style>