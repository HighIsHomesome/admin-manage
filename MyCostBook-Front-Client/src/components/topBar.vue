<template>
    <div class="topbar">
        <img src="../assets/img/Common/common_Top.svg" alt="">
        <div class="circle">
            <img src="../assets/img/Common/common_circle.png" alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
.topbar {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;

    img {
        width: 100vw;
    }

    .circle {
        img {
            position: absolute;
            top: -30px;
            left: -70px;
            width: 267px;
            height: 219px;
        }
    }
}
</style>