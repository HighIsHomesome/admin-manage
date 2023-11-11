<script setup>
// Vue
import { ref, toRaw, computed, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

// 组件
import options from './cpns/options.vue'
import categoryContent from './cpns/category_content.vue'
// Until
import { Myfor } from '@/utils'
// Store
import { storeToRefs } from 'pinia';
import useCenterStore from '@/stores/modules/center';
const centerStore = useCenterStore()
const { enterCategoryManner_count } = storeToRefs(centerStore)

const isClicktoEdit = ref(false)
const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})
/**当前选项 Income or Expense */
const current_index = ref(0)
const current_option = ref('Expend')
/* 分 Expend 和 Income */
const types = computed(() => {
    if (typeof props.data == 'undefined') return       // 卸载时也会计算 ，需要返回
    else return props.data[current_option.value]
})
/**提取出一级分类 */
const options_keys = computed(() => {
    if (typeof props.data == 'undefined') return       // 卸载时也会计算 ，需要返回
    else return Object.keys(props.data)
})


// 新增一个属性控制显示隐藏
function addProperty() {
    if (props.data['Expend'][0].list.at(-1).name == '+') return
    if (enterCategoryManner_count.value === 0) {
        const for_cb = (element) => {
            element.hide = true
            if (element.list) {
                element.list.push({ id: 0, name: '+', type_id: 1, user_id: 2, avator: '0', noShark: true })
            }
            else {
                element.list = [{ id: 0, name: '+', type_id: 1, user_id: 2, avator: '0', noShark: true }]
            }
        }
        const insert_Last_Button = (arr) => {
            Myfor(arr, for_cb)
        }
        insert_Last_Button(props.data['Expend'])
        insert_Last_Button(props.data['Income'])
        enterCategoryManner_count.value++
    }
}
addProperty()

onBeforeUnmount(() => {
    /**卸载的时候 Props不会被卸载？？？ */
    enterCategoryManner_count.value = 0
})



/**
 * 子组件的属性和事件👇
 */
const text_title = ref('Categories')
/**监听子组件 -- 更新 option */
function update_current_option(index, key) {
    current_index.value = index
    current_option.value = key
}
/**开启编辑状态 -- 可删除类别 */
function edit_category() {
    isClicktoEdit.value == true ? isClicktoEdit.value = false : isClicktoEdit.value = true
}
/**点击iten 查看消费金额 */
function notify(params) {
    text_title.value = params
    setTimeout(() => {
        text_title.value = 'Categories'
    }, 1500);
}
</script>

<template>
    <div class="categoryManager">
        <div class="banner">
            <div class="middle" v-html="text_title"></div>
        </div>
        <options @edit:category="edit_category" @update:current_option="update_current_option"
            :current_index="current_index" :options="options_keys" />
        <categoryContent :isClicktoEdit="isClicktoEdit" @notify:itenAmount="notify" :types="types"
            :current_index="current_index" class="content" />
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    align-items: center;
}

.categoryManager {
    position: fixed;
    z-index: 4;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 30px 20px 10px;
    width: 100vw;
    height: 100vh;
    background-color: #e2e2e2;

    .banner {
        display: grid;
        flex-shrink: 0;
        margin-top: 10px;
        height: 40px;

        .middle {
            place-self: center;
            font-weight: 600;
            font-size: 22px;
        }
    }

    .content {
        margin-top: 25px;
        height: calc(100vh-10px-5vh-20px-30px);
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

}
</style>