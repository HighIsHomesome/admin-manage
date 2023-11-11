<script setup>
import { onBeforeMount } from 'vue'
// 组件
import tabbar from './components/tabbar.vue';
import Plane from './components/Plane.vue';
// 路由
import { RouterView, useRoute } from 'vue-router'
// Store
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main'
const mainStore = useMainStore()
const { user, isShowPlaneLoading } = storeToRefs(mainStore)

const route = useRoute(); // 路由

onBeforeMount(() => {
  setTimeout(() => {
    if (route.path !== '/' && route.path !== '/login' && route.path !== '/register') mainStore.getUserInfo() // 全局用户信息
  }, 1000);
})

</script>

<template>
  <div class="app">
    <!-- 加载动画 -->
    <Plane v-if="isShowPlaneLoading" />
    <RouterView v-slot="{ Component }">
      <!-- <KeepAlive> -->
      <!-- <component :is="Component" :key="$route.name" v-if="$route.meta.KeepAlive" /> -->
      <!-- </KeepAlive> -->
      <component :user="user" :is="Component" />
    </RouterView>
    <!-- 导航栏 -->
    <tabbar class="tabbar" v-if="!route.meta.is_hidden_tabbar" />
  </div>
</template>

<style lang="less" scoped>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: hidden;

  .tabbar {
    position: fixed;
    bottom: -15px;
    left: -25px;
    z-index: 999;
  }
}
</style>
