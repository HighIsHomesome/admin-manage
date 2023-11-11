<script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'

const emit = defineEmits(['update:ActiveTabs'])

const Active_tabs = ref()
watch(Active_tabs, (newV) => {
    emit('update:ActiveTabs', newV)
})
</script>

<template>
    <div class="tabs">
        <van-tabs v-model:active="Active_tabs" swipeable animated>
            <van-tab title="Expense" name="Expense"></van-tab>
            <van-tab title="Income" name="Income"> </van-tab>
            <van-tab title="transform" name="transform"></van-tab>
        </van-tabs>
    </div>
</template>

<style lang="less" scoped></style>