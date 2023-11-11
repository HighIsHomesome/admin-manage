<script setup>
import bannerVue from '@/components/banner.vue';

</script>

<template>
    <div class="banner">
        <bannerVue>
            <template #left>
                <div class='text'>
                    <!-- <img src="@/assets/img/home/sharpicons_Rabbit.svg" alt=""> -->
                    <span>&ensp;</span>
                </div>
            </template>
            <template #right>
                <div class='text'>
                    <!-- <img src="@/assets/img/home/sharpicons_Rabbit.svg" alt=""> -->
                    <div> </div>
                </div>
            </template>
        </bannerVue>
    </div>
</template>

<style lang="less" scoped>
.banner {
    top: 25px;

    .text {
        display: flex;
        font-size: 16px;
        line-height: 32px;
        width: 135px;
        margin-right: 50px;


        div {
            position: relative;
            right: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 135px;
        }
    }


}
</style>