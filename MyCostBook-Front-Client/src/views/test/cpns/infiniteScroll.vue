<script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'
// Vant

// Utils

// 组件
import observer from './observer.vue'

/**
* var
*/
const Ref_scrollerFooter = ref()
const ref_index = ref()
let items = ref([])
function Pagination(arr, _baseURL, params) {
    const baseURL = _baseURL
    const { current_page, total_page, total_number } = params
    let current_number = 1

    const getURL = () => {
        return `${baseURL}?${current_page}=${current_number}&${total_page}=${total_number}`
    }
    const AddPage = () => current_number++

    async function get() {
        /**发送请求 */
        const res = await fetch(getURL())
        /**更新数组 */
        const newItems = await res.json()
        arr.value = [...arr.value, ...newItems]
        /**给下一次加页 */
        AddPage()
    }

    return { getURL, AddPage, get }
}
const { get } = new Pagination(items, `https://jsonplaceholder.typicode.com/comments`, { current_page: '_page', total_page: '_limit', total_number: 40 })

/**
* function
*/


</script>

<template>
    <div class="main">
        <h1> infinite scroll </h1>
        <div class="observer">
            <template v-for="(item, index) in items">
                <div class="period">
                    <div class="picInner">
                        <template v-for="(iten, indey) in 3 ">
                            <img src="@/assets/logo.svg" style="width: 50px;height: 50px;" alt="">
                        </template>
                    </div>
                    <span ref="ref_index">{{ item.name }}</span>
                    <span>{{ item.email }}</span>
                </div>
            </template>
            <observer :handle-intersect="get" root-selector=".main" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.main {
    .flex();
    flex-direction: column;

    .observer {
        height: 50vh;
        overflow-y: scroll;

        .period {
            .flex();
            flex-direction: column;
            width: 300px;
            height: 200px;
            margin-top: 20px;
            border: 1px solid #bfbfbfAA;
            box-shadow: 0 2px 5px #bbbbbbAA;

            .picInner {
                display: flex;
            }

            span {
                margin-top: 20px;
            }
        }
    }
}
</style>