<script setup>
import banner from '@/components/banner.vue';

</script>

<template>
    <banner class="banner">
        <template #left>
            <span style="font-size:28px; line-height:30px; font-weight:800;opacity: 0.9;">Fortune</span>
        </template>
        <template #right>
            <!-- <span></span> -->
            <span></span>
        </template>
</banner>
</template>

<style lang="less" scoped>
.banner {
    position: static;
    padding-top: 80px;
}

.left {
    /* Icon/chevron-left */
    width: 28px;
    height: 28px;
}

.text {
    // /* Statistics */
    position: relative;
    right: 15px;
    width: 82px;
    height: 22px;
    color: rgb(34, 34, 34);
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    text-align: center;
}

.download {
    position: relative;
    top: 3px;
    width: 28px;
    height: 28px;
}
</style>