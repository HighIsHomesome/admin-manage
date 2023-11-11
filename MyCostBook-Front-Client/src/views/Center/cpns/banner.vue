<script setup>
import banner from '@/components/banner.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div class="center_banner">
        <banner>
            <template #left>
                <span></span>
            </template>
            <template #middle>
                <span>Profile</span>
            </template>
            <template #right>
                <div class="inner" @click="router.push('/test')">
                    <img class="calendar" src="@/assets/img/Profile_Center/calendar.svg" alt="">
                </div>
            </template>
        </banner>
    </div>
</template>

<style lang="less" scoped>
.center_banner {
    .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        border-radius: 20px;
        background-color: rgba(215, 215, 215, 0.2);

    }

    img.calendar {
        position: relative;
        width: 20px;
        height: 20px;
    }
}
</style>