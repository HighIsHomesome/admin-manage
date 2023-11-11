<script setup>
// Vue
const emit = defineEmits(['click:addSavingPlan'])

</script>

<template>
    <div class="title">
        <div class="left">
            <span>SaveMoney Plan</span>
        </div>
        <div class="right">
            <van-icon @click="emit('click:addSavingPlan')" name="smile" color="rgba(66.17, 149.81, 143.75, 1) "
                size="2rem" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.title {
    font-size: 18px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    vertical-align: middle;
    margin-bottom: 10px;

    .left {
        span {
            margin-right: 10px;
        }
    }
}
</style>