<script setup>
// Vue
import { ref, onMounted, onBeforeUnmount } from 'vue'
// Vant

// Utils

// 组件

const props = defineProps({
    handleIntersect: {
        type: Function,
        default: () => { console.log('默认props'); }
    },
    rootSelector: {
        type: String,
        default: '默认props'
    }
})
/**
* var
*/
const { handleIntersect, rootSelector } = props;
let observer = null
const target = ref(null)

/**
* function
*/
onMounted(() => {
    const options = {
        root: document.querySelector(rootSelector),
        rootMargin: "200px 0px"
    }

    // 构建观察器
    observer = new IntersectionObserver(([entry]) => {
        // console.group()
        /**异步，只在其他任务执行完，浏览器有了空闲才会执行。 */
        // console.log('观察元素:', entry.target);
        // console.log('根元素:', entry.rootBounds);
        // console.log('是否存在交叉区域', entry.isIntersecting);
        // console.log('观察元素是否全部露出', entry.intersectionRatio);
        // console.groupEnd()

        // 目标元素与根元素相交
        if (entry && entry.isIntersecting) {
            handleIntersect()
        }
    }, options)

    // 观察目标元素
    observer.observe(target.value)
})

// 组件销毁前停止监听
onBeforeUnmount(() => {
    if (!observer) return
    observer.disconnect()
})

</script>

<template>
    <div class="target" ref="target"></div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.target {
    width: 100%;
    height: 50px;
    background: transparent;
}
</style>