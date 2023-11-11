<script setup>
</script>

<template>
    <div class="plane">
        <div class="loading-box">
            <img src="@/assets/img/Common/Plane.gif" alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.plane {
    position: absolute;
    z-index: 99999;
    .flex();
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);

    .loading-box {
        width: 150px;
        height: 150px;

        img {
            border-radius: 32px;
            opacity: .85;
        }
    }
}
</style>