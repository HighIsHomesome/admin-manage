<script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance, onUnmounted } from 'vue'
// Vant

// Utils
import getRefGroup from '@/utils/getRefGroup';
// 组件

// Store

/**
* var
*/
const { group, handle } = getRefGroup()
/**
* function
*/
function getUrl(img) {
    return new URL(`../../../assets/img/home/${img}`, import.meta.url).href
}
onMounted(() => {
    //
    var observer = new IntersectionObserver((changes) => {
        changes.forEach(function (change) {
            if (change.intersectionRatio <= 0) return
            const picture = change.target.getAttribute('data-src')
            setTimeout(() => {
                change.target.setAttribute('src', getUrl(change.target.getAttribute('data-src')))
            }, 200);
        });
    }
    );
    group.forEach(el => observer.observe(el))
})
onUnmounted(() => {
    if (observer) observer.disconnect();
})
</script>

<template>
    <div class="IntersectionObserver">
        <h1>IntersectionObserver </h1>
        <div class="inner">
            <template v-for="(item, index) in 111">
                <!-- 每个元素都被观察 -->
                <div class="lazy-loaded" :data-index="index">
                    <img src="/eat.svg" alt="">
                    <img :ref="handle" src="@/assets/img/Common/loading.gif" data-src="eat.svg"
                        style="width: 100%;height: 100%;" alt="">
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.IntersectionObserver {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .inner {
        height: 70vh;
        overflow-y: auto;

        .lazy-loaded {
            margin-top: 20px;
            width: 300px;
            height: 200px;
            border: 1px solid #bfbfbfaa;
            box-shadow: 0 0 10px #bbbbbbAA;
        }
    }


}
</style>