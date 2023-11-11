<script setup>
// Vue
import { ref } from 'vue';
// 组件
import photoPopUp from './cpns/photoPopup.vue'
/**
 * 变量
 */
const showBottom = ref(false)   // "修改用户信息" 以及 "退出登陆" 页面

const props = defineProps({
    user: {
        type: Object,
        default: () => { }
    }
})
</script>

<template>
    <div class="photo" @click="showBottom = true" @touchStart.stop.prevent>
        <img src="../../../assets/img/Profile_Center/Center_avatar.png" alt="">
        <span class="name">{{ user?.userInfo?.username }}</span>
        <span class="sign">@{{ user?.userInfo?.username }}</span>
        <photoPopUp @click:overlay="showBottom = false" :user="user" @close:popup="showBottom = false"
            :showBottom="showBottom" />
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

.photo {
    z-index: 3;
    position: relative;
    .flex();
    flex-direction: column;
    top: 40vw;
    left: 25vw;
    width: 200px;
    height: 200px;
    font-family: Inter;

    img {
        width: 140px;
        height: 140px;
        border-radius: 60px;
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.04);
    }

    .name {
        width: 188px;
        height: 24px;
        color: rgb(34, 34, 34);
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0%;
        text-align: center;
    }

    .sign {
        margin-top: 5px;
        margin-right: 5px;
        color: rgb(67, 136, 131);
        font-size: 14px;
        font-weight: 600;
    }



}
</style>