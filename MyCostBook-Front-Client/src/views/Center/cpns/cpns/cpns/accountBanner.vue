<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const emit = defineEmits('start:edit')

</script>

<template>
    <div class="banner">
        <div class="left" @click="router.back()"><van-icon name="arrow-left" size="16px" /></div>
        <div class="middle">Asset Management</div>
        <div class="right" @click="$emit('start:edit')"></div>
    </div>
</template>

<style lang="less" scoped>
.banner {
    width: 100%;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .middle {
        font-weight: 600;
        font-size: 18px;
    }
}
</style>