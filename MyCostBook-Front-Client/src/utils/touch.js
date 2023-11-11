import { ref, reactive, onMounted, onUnmounted, onBeforeMount } from "vue";

/**
 * 
 * @param {*} targetElement 
 * @returns 
 */

/**
 * Store
 */

/**
 * 节流throttle
 * * * import { throttle } from 'underscore'
 */

export default function useTouch(targetElement, ideal_Mode) {
    /**
     * targetElement => targetDom
     */
    let targetDom = {}

    const visualHeight = document.documentElement.clientHeight           // 视口高度
    let isUp = true    //上拉
    let isDown = false  //下拉
    let start_x = ref()      //初始位置y
    let start_y = ref()      //初始位置y
    let moveY = ref()
    let moveX = ref()

    if (ideal_Mode) {
        var ideal = {
            start_top: 0,    //初始list距离视口顶部的高度
            current_y: 0,    //当前list距离视口顶部的高度
            start_bottom: 0,  //初始bottom
            excess_top(height) {
                const bottom = targetDom.getBoundingClientRect().bottom
                return bottom <= height
            },
            excess_bottom(height) {
                const top = targetDom.getBoundingClientRect().top
                return top >= height
            },
            redirecte() {
                // 判断是否到达终点，并修改方向
                if (this.excess_top(visualHeight - 35)) {
                    isDown = true
                    isUp = false
                    this.current_y = targetDom.getBoundingClientRect().top
                    console.log('到顶时距离视口高度：', this.current_y);
                    console.log('到顶了:开始向下', isDown);
                } else if (this.excess_bottom(this.start_top)) {
                    isDown = false
                    isUp = true
                    console.log('到底:开始向上', isUp);
                }
            },
            isfinish: false,  //是否达到理想位置
            edit_finish(distance, standard) {
                const promise = new Promise((resolve, reject) => {
                    if (distance > visualHeight * standard) {
                        resolve()
                    } else {
                        reject()
                    }
                })
                return promise
                // 上拉的距离 > 可视窗口高度*标准 ？ 改写finish标识为true ： 改写为false .
            },

            autoScroll() {
                const promise = new Promise((resolve, reject) => {
                    if (this.isfinish) resolve()
                    else reject()
                })
                return promise
            },
            scrollTo() {
                if (isUp) {
                    this.ScrolltoTop('-70%')
                    console.log(`当前距离${ideal.isfinish}超过20%,且方向${isUp}为isUp,已自动跳转至最高处`);
                } else if (isDown) {
                    this.ScrolltoBottom(0)
                    console.log(`当前距离${ideal.isfinish}超过20%,且方向${isDown}为isDown,已自动跳转至最低处`);
                }
            },
            ScrolltoTop(autoDestination) {
                const text = `overflow-y:auto;transform: translate(${0}px, ${autoDestination});transition:transform;transition-duration: 0.5s;transition-timing-function: ease-out;`
                targetDom.style.cssText = text;
            },
            ScrolltoBottom(autoDestination) {
                const text = `overflow-y:auto;transform: translate(${0}px, ${autoDestination});transition:transform;transition-duration: 0.5s;transition-timing-function: ease-out;`
                targetDom.style.cssText = text;
            },
        }
    }
    function handleTouchstart(e) { // 开始拖拽
        // 基础：
        targetDom.style['overflow-y'] = 'hidden'      // 点击时，List不可滑动       
        const click_y = e.targetTouches[0].clientY
        const click_x = e.targetTouches[0].clientX
        if (click_y && start_y.value == undefined) {
            start_y.value = click_y
            start_x.value = click_x
        }
        // Ideal
        else if (ideal_Mode) {
            ideal.current_y = click_y
        }
    }
    function handleTouchmove(e) { // 拖拽中
        // Ideal 
        if (ideal_Mode) {
            if (isUp) {
                // 判断是否超出顶部，是则改isUp为false  然后return
                if (ideal.excess_top(visualHeight - 35) == true) return
            } else if (isUp == false) {
                // 判断是否超出，是则改isUp为true   然后return
                if (ideal.excess_bottom(ideal.start_top) == true) return
            }
        }
        // 基础：
        // 正常的话，位移
        let realTimeClick_y = e.targetTouches[0].clientY
        let realTimeClick_x = e.targetTouches[0].clientX
        moveY.value = realTimeClick_y - start_y.value                 // 根据初始 client 位置计算移动距离   // 移动的距离==-y
        moveX.value = realTimeClick_x - start_x.value
        targetDom.style.cssText = `overflow-y:hidden;transform: translate(${moveX.value}px, ${moveY.value}px);`;

        // Ideal
        if (ideal_Mode) {
            ideal.edit_finish(-moveY.value, 0.2)
                .then(() => { ideal.isfinish = true })
                .catch(() => { ideal.isfinish = false })
        }

    }
    function handleTouchend(e) { // 拖拽结束
        // Ideal
        if (ideal_Mode) {
            ideal.autoScroll().then(() => {
                ideal.scrollTo()
                // 导向(可删)
                ideal.redirecte()
            }).catch(() => {
                ideal.ScrolltoBottom(0)
                console.log(`当前距离${ideal.isfinish}未超过20%，回来把你`);
                // 导向(可删)
                ideal.redirecte()
            })
        }
    }
    /**
     * onMounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码
     */
    onMounted(() => {
        // 基础：
        if (targetElement) {
            targetDom = targetElement.value
            // 处理目标元素的初始信息：位置等
            // targetDom = Ref_content.value                                // 实例
            targetDom.addEventListener('touchstart', handleTouchstart)
            targetDom.addEventListener('touchmove', handleTouchmove)
            targetDom.addEventListener('touchend', handleTouchend)
            // Red_Index.value.addEventListener('touchmove', handlerTouchMove, { passive: false })
            // console.log('监听成功！');
        }

        //Ideal
        if (ideal_Mode) {
            ideal.start_top = Math.floor(targetDom.getBoundingClientRect().top)    // 距离视口顶部的高度
            ideal.start_bottom = Math.floor(targetDom.getBoundingClientRect().bottom)    // 距离视口顶部的高度
        }
    })

    onUnmounted(() => {
        targetDom.removeEventListener('touchstart', handleTouchstart)
        // console.log('移除监听！')
    })
    return { start_y, moveX, moveY }
}