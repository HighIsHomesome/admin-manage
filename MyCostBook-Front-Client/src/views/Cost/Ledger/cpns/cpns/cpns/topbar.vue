<script setup>
// Vue
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="topBar">
        <div class="icon"><van-icon @click="router.back()" name="arrow-left" size="24" /></div>
        <div class="headline">Plan Detail</div>
    </div>
</template>

<style lang="less" scoped>
.topBar {
    display: grid;
    grid-template-columns: .8fr 2fr;
    height: 50px;

    span {
        font-weight: 700;
        font-size: 24px;
    }

    .headline {
        position: relative;
        font-weight: 660;
        font-size: 24px;
    }

    .headline::after {
        position: absolute;
        bottom: 0px;
        left: 6px;
        content: '';
        display: block;
        width: 40%;
        height: 5px;
        border-radius: 12px;
        background-color: #429690AA;
    }

}
</style>