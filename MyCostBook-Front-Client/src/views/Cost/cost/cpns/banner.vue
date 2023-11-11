<script setup>
import { ref } from 'vue';
// 组件
import banner from '@/components/banner.vue'
// Store
import { storeToRefs } from 'pinia'
import useCostStore from '@/stores/modules/cost'     //Cost
// Utils
import dayjs from 'dayjs';
// Store
defineProps({
    reach100: {
        type: Boolean,
        default: false
    }
})
var { obj } = storeToRefs(useCostStore())
/**
* var
*/
const welcome = ref('Good afternoon,')
function changeWelcomText() {
    const time = dayjs().format('HH')
    if (time >= 6 && time < 12) welcome.value = 'Good Morning'
    if (time >= 12 && time < 19) welcome.value = 'Good Afternoon'
    if (time >= 19) welcome.value = 'Good Evening'
}
changeWelcomText()
/**
* function
*/

</script>

<template>
    <div class="banner">
        <banner ref="Ref_banner">
            <template #left>
                <div class="left" :class="{ 'out-left': reach100 }">
                    <span v-html="welcome"></span>
                    <div class="name">{{ obj?.username }}</div>
                </div>
            </template>
            <template #right>
                <div @click="ShowUsers" :class="{ 'out-right': reach100 }"
                    style="display: flex;justify-content: center;align-items: center; height: 35px; background-color: rgba(255, 255, 255, .15);">
                    <img style="width: 25px;height: 25px;" src="@/assets/img/cost/frineds.svg" alt="">
                </div>
            </template>
        </banner>
    </div>
</template>

<style lang="less" scoped>
@keyframes shutter-out-left {

    0% {
        transform: translateX(0);
        transform-origin: left;
        opacity: 1;
    }

    100% {
        transform: translateX(-131px);
        transform-origin: left;
        // opacity: 0;
        display: none;
    }
}



@keyframes shutter-out-right {

    0% {
        transform: translateX(0);
        transform-origin: right;
        opacity: 1;
    }

    100% {
        transform: translateX(100px);
        transform-origin: right;
        // opacity: 0;
        display: none;
    }
}

.out-left {
    width: 100px;
    height: 100px;
    background-color: transparent;

    animation-name: shutter-out-left;
    animation-duration: .2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;

    /* shorthand
		animation: shutter-out-left 1s linear 0s 1 normal none;*/
}


.out-right {
    width: 100px;
    height: 100px;
    background-color: transparent;
    animation-name: shutter-out-right;
    animation-duration: .2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
}

.left {
    color: #ffffff;
    width: 150px;

    .name {
        width: 250px;
        margin-top: 2px;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
    }
}
</style>