<script setup>
const emit = defineEmits(['click:showPopup'])

</script>

<template>
    <div class="options">
        <div class="one box" @click="emit('click:showPopup')">Shopping List</div>
        <div class="two box">Saving Plan</div>
    </div>
</template>

<style lang="less" scoped>
.options {
    margin-top: 5px;
    display: flex;
    overflow-x: auto;
    position: relative;
    // width: 200vw;
    padding: 40px 40px;

    &::-webkit-scrollbar {
        display: none;
    }

    .box {
        flex-shrink: 0;
        width: 70vw;
        height: 100px;
        backdrop-filter: blur(10px);
        border-radius: 36px;
        border: 1px solid #c6dbd9AA;
        box-shadow: inset 0 0 10px #ffffffAA;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .one {
        background-color: #027f87;
        margin-right: 30px;
    }

    .two {
        background-color: #57e3b9;
    }

}
</style>