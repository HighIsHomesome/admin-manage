<script setup>

</script>

<template>
    <div class="banner">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot name="middle"></slot>
        </div>
        <div class="right">
            <slot name="right">
                <img src="@/assets/img/Profile_Center/Center_tip.png" alt="">
            </slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.banner {
    width: 100vw;
    position: relative;
    z-index: 1;
    top: 81px;
    display: flex;
    justify-content: space-between;

    .left {
        /* Icon/chevron-left */
        // color: wheat;
        width: 28px;
        height: 28px;
        margin-left: 24px;
    }

    .middle {
        display: inline-block;

        /* Profile */
        width: 56px;
        height: 22px;
        color: rgb(255, 255, 255);
        font-family: Inter;
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;
        position: relative;
        top: 3px;
    }

    .right {
        display: inline-block;

        /* Frame 4 */
        width: 40px;
        height: 40px;
        border-radius: 6.666666507720947px;
        margin-right: 24px;
        /* 自动布局 */
        position: relative;
        top: -5px;
    }
}
</style>