<script setup>
// Vue
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
// 组件
import Banner from './cpns/detailBanner.vue'
import Pie from './cpns/detailPie.vue'
import Menu from './cpns/detailMenu.vue'
import Top from './cpns/detailTop.vue'
/**
 * Store
 */
import { storeToRefs } from 'pinia'
import useMainStore from '@/stores/modules/main'
import useChartStore from '@/stores/modules/chart'
const chartStore = useChartStore()
const { data, current_menu, current_tab, current_dateIndex } = storeToRefs(chartStore)

// 取消动画
onBeforeMount(() => {
    useMainStore().isShowPlaneLoading = false
})
/**
* var
*/
const current_key = computed(() => {
    return data.value[current_menu.value][current_tab.value].time[current_dateIndex.value]
})
const top_obj = computed(() => {
    return data.value[current_menu.value][current_tab.value].top_obj
})
const top_array = computed(() => {
    return top_obj.value[current_key.value]
})
const obj = computed(() => {
    return top_array.value.find(el => el.billLedger == route.params.ledger.replace(':', ''))
})
const current_option = ref('Types')
const TypeOrCategory = computed(() => {
    if (current_option.value == 'Types') {
        return 'type_'
    }
    else if (current_option.value == 'Categories') {
        return 'category_'
    }
})
// 
const route = useRoute()
//

/**
* function
*/
function updateOption(newV) {
    if (newV == 'Categories') {
        current_option.value = 'Categories'
    }
    else if (newV == 'Types') {
        current_option.value = 'Types'
    }
}
</script>

<template>
    <div class="type-category">
        <Banner @update:option="updateOption" />
        <Pie :obj="obj" :TypeOrCategory="TypeOrCategory" />
        <Menu />
        <Top :obj="obj" :TypeOrCategory="TypeOrCategory" />
    </div>
</template>

<style lang="less" scoped>
.type-category {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
    background: linear-gradient(180.00deg, rgba(67, 136, 131, 0.3) -28%, rgba(67, 136, 131, 0) 97%);
    color: #7d7f7f;
}
</style>