import { onMounted, onUnmounted, ref } from 'vue'
// import useHomeStore from '@/store/modules/home'
// import { storeToRefs } from 'pinia'
// const HomeStore = useHomeStore()
// const HomeStore = storeToRefs(useHomeStore)

// 节流↓
import { throttle } from 'underscore'

export default function useScroll(elRef) {

    let el = window
    let isReachBottom = ref(false)
    const top = ref(0)
    const Top = ref(0)
    const pageHeight = ref(0)

    //
    const handler = throttle(() => {
        // console.log('滚滚滚');
        if (el == window) {
            // scroll TOP 当前滚动距离
            top.value = document.documentElement.scrollTop
            Top.value = document.documentElement.scrollHeight
            // client Height 页面的高度
            pageHeight.value = document.documentElement.clientHeight
        } else {
            top.value = el.scrollTop
            Top.value = el.scrollHeight
            pageHeight.value = el.clientHeight
        }
        if (top.value + pageHeight.value + 0.5 >= Top.value) {
            isReachBottom.value = true
            console.log('滚不动啦');
            // HomeStore.fetchFantastic()
            // fetch()
        }
        else {
            isReachBottom.value = false
        }
    }, 100)


    onMounted(() => {
        if (elRef) {
            el = elRef.value
        }
        el.addEventListener('scroll', handler)
    })
    onUnmounted(() => {
        el.removeEventListener('scroll', handler)
    })

    return { isReachBottom, top, Top, pageHeight }

}