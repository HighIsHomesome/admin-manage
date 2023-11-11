<script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// Vant

// Utils

// 组件
import banner from '@/components/banner.vue'

// Store

/**
* var
*/
const router = useRouter()
// 

const isType = ref(true)
const titleStyle = ref({ position: 'relative', bottom: '4px', right: '10px', 'font-size': '30px', 'font-weight': 700, color: '#7d7f7f' })
const TextTitle = computed(() => {
    if (isType.value == true) {
        titleStyle.value.right = '10px'
        return 'Types'
    }
    else {
        titleStyle.value.right = '40px'
        return 'Categories'
    }
})
/**
* function
*/
const emit = defineEmits(['update:option'])
function change_TypeOrCategory() {
    isType.value == true ? isType.value = false : isType.value = true
    emit('update:option', isType.value == true ? 'Types' : 'Categories')
}

</script>

<template>
    <div class="Ban">
        <banner>
            <template #left>
                <div>
                    <van-icon @click="router.back()" name="arrow-left" size="24" color="#7d7f7f" />
                </div>
            </template>
            <template #middle>
                <div>
                    <span class="title" :style="titleStyle" v-html="TextTitle"></span>
                </div>
            </template>
            <template #right>
                <div @click="change_TypeOrCategory"
                    style="width: 35px; height: 35px;padding: 2px;display: flex;justify-content: center;align-items: center;background-color: #f1f1f1AA;border-radius: 50px;">
                    <van-icon size="30" name="cluster" />
                </div>
            </template>
        </banner>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>