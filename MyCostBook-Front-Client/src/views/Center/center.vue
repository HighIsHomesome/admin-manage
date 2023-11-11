<script setup>
// Vue
import { ref } from 'vue';
// 组件
import topBackground from '@/components/topBar.vue';
import banner from './cpns/banner.vue';
import photo from './cpns/photo.vue';
import list from './cpns/list.vue'
// Store
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main';
import { onBeforeRouteUpdate } from 'vue-router';
const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)
// 发送网络请求
const data = ref({})


//专用于子路由更新的路由保安                                                                                              
onBeforeRouteUpdate((to, from) => {
    const component_name = to.path.replace('/', '') // 获取path 与后端属性匹配,动态传递数据给子组件
    data.value = user.value[component_name]
})
</script>

<template>
    <div class="center" style="position: relative;">
        <RouterView :data="data" :picture="user.inconFaultAvatar"></RouterView> <!-- 用router-view假装切换页面 -->
        <topBackground />
        <banner />
        <photo :user="user" />
        <list />
    </div>
</template>