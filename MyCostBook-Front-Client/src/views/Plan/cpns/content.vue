<script setup>
import { ref, reactive, onMounted, computed, toRaw, watch } from 'vue';
import gsap from 'gsap'
// 组件
import empty from '@/components/empty.vue';
// Vant
import { showConfirmDialog, closeDialog } from 'vant';
import 'vant/es/dialog/style'
import { showNotify } from 'vant';
import 'vant/es/notify/style'
// Store
import usePlanStore from '@/stores/modules/plan';
import { storeToRefs } from 'pinia';
import { createURLObj } from '@/utils';
import { get } from 'vant/lib/utils';
const planStore = usePlanStore()
const { shopping_list, delete_ShoppingList_info, del_goods_info_id } = storeToRefs(planStore)

// Touch事件
const Ref_content = ref()
// ********
let targetDom = {}
// ********
const visualHeight = document.documentElement.clientHeight           // 视口高度
let isUp = true    //上拉
let isDown = false  //下拉
let start_y = ref()      //初始位置y
let moveY = ref()

// ********
const ideal = {
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
// ********
function handlerMounted() {
    // 基础：
    // 处理目标元素的初始信息：位置等
    targetDom = Ref_content.value                                // 实例

    // Ideal
    // 可删
    ideal.start_top = Math.floor(targetDom.getBoundingClientRect().top)    // 距离视口顶部的高度
    ideal.start_bottom = Math.floor(targetDom.getBoundingClientRect().bottom)    // 距离视口顶部的高度
}
function handleTouchstart(e) { // 开始拖拽
    console.log('start');
    // 基础：
    targetDom.style['overflow-y'] = 'hidden'      // 点击时，List不可滑动       
    const click_y = e.targetTouches[0].clientY
    if (click_y && start_y.value == undefined) {
        start_y.value = click_y
    }
    // ideal--可删
    else {
        ideal.current_y = click_y
    }
}
function handleTouchmove(e) { // 拖拽中
    // Ideal 
    // 可删
    if (isUp) {
        // 判断是否超出顶部，是则改isUp为false  然后return
        if (ideal.excess_top(visualHeight - 35) == true) return
    } else if (isUp == false) {
        // 判断是否超出，是则改isUp为true   然后return
        if (ideal.excess_bottom(ideal.start_top) == true) return
    }
    // 基础：
    // 正常的话，位移
    let realTimeClick_y = e.targetTouches[0].clientY
    moveY.value = realTimeClick_y - start_y.value                 // 根据初始 client 位置计算移动距离   // 移动的距离==-y
    targetDom.style.cssText = `overflow-y:hidden;transform: translate(${0}px, ${moveY.value}px);`;

    // Ideal 
    // 可删
    ideal.edit_finish(-moveY.value, 0.2)
        .then(() => { ideal.isfinish = true })
        .catch(() => { ideal.isfinish = false })
}
function handleTouchend(e) { // 拖拽结束
    // Ideal
    // 可删
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
onMounted(handlerMounted)

const isEmpty = computed(() => {
    if (toRaw(shopping_list.value.length == 0 && Object.prototype.toString.call(shopping_list.value) == '[object Array]')) return true
})
/**展开与折叠 */
function fold(item, index) {
    item.isShow = item.isShow == true ? false : true
}

/**Map 商品序号和名字 */
function map_goods_name(iten, indey) {
    if (iten.isAddBtn) return `${iten.name}`
    else return `No.${indey + 1} --   ${iten.name}    ￥${iten.amount}`
}
/**删除购物清单 */
function Delete_list(item, index) {
    const beforeClose = (action) => {
        if (action === 'confirm') {
            delete_ShoppingList_info.value = createURLObj({ id: item.id })
            planStore.Post_Delete_Shopping_list().then(res => {
                shopping_list.value.splice(index, 1)
                showNotify({ type: 'success', message: '删除成功' });
                closeDialog()
            }).catch(() => {
                showNotify({ type: 'warning', message: '删除失败' });
                closeDialog()
            })
        }
        else {
            closeDialog()
        }
    }
    /**确认 */
    showConfirmDialog({
        message:
            `确定删除清单：${item.name}吗？`,
        beforeClose,
    });
    console.log(item, index);
}
/**点击+ */
const text_add_title = ref('Add Goods')


const emit = defineEmits(['clickAddGoods'])
function clickIten(item, index, iten, indey) {

    // 
    console.log('del_id:', iten.id);
    console.log(item.goods_list[indey]);
    if (iten.name !== '+') {
        console.log(toRaw(item), iten);
        const beforeClose = (action) => {
            if (action === 'confirm') {
                del_goods_info_id.value = iten.id
                planStore.Post_Del_Goods().then(res => {
                    item.goods_list.splice(indey, 1)
                    showNotify({ type: 'success', message: '删除成功' });
                    closeDialog()
                }).catch(() => {
                    showNotify({ type: 'warning', message: '删除失败' });
                    closeDialog()
                })
            }
            else {
                closeDialog()
            }
        }
        /**确认 */
        showConfirmDialog({
            message:
                `确定删除商品：${iten.name} 吗？`,
            beforeClose,
        });
    }
    else {
        emit('clickAddGoods', item, indey)
    }
}

/**勾选 */
function click_gou(iten, indey) {
    console.log('gou');
    console.log(toRaw(iten), indey);
}
/**一键记账 */
function charge(item, index) {
    console.log(toRaw(item));
    // 过滤
    const checked_iten_list = item.goods_list.filter(el => el.checked == true)
    if (checked_iten_list.length == 0 && Object.prototype.toString.call(checked_iten_list) == '[object Array]') {
        alert('没有勾选商品')
        return
    }
    // 弹窗 ： 选择账户

    // 
    const goods_list_id = checked_iten_list.map(mp => mp.id)
    // 计算金额
    const _CIL_amount = checked_iten_list.reduce((pre, cur) => {
        return pre += Number(cur.amount)
    }, 0)
    // 获取用户的购物清单ID，名 
    console.log(item.id, item.name);
    console.log(_CIL_amount, goods_list_id);
    // 内含商品数、总金额
    console.log(item.include_number, item.total_amount);
    console.log(item.describe);
    // 构建JSON对象
    const json_obj = {
        inventory_id: item.id, account_id: 6, total_amount: _CIL_amount, goods_number: goods_list_id.length,
        goods_id_list: goods_list_id
    }
    // Request接口
    planStore.Post_charge(json_obj).then(data => {
        console.log('data:', data);
        // ✔ => 更新View
        // 根据 goods_list_id 删除数组元素
        for (const iterator of goods_list_id) {
            const targetindex = item.goods_list.findIndex(item => {
                console.log('finding : ', item.id, iterator,);
                return item.id == iterator
            })
            if (targetindex == -1) return
            console.log('❌targetIndex', targetindex);
            item.goods_list.splice(targetindex, 1)
        }
        item.total -= _CIL_amount
        showNotify({ type: 'success', message: '❀ 一键记账成功 !' });
    }).catch(message => {
        // × => 返回并提示 
        console.log(message);
        // 轻提示Error
        showNotify({ type: 'warning', message: '出错了' });
    })
    /**
     * （inventory_id）
     * 弹出选择框，选择扣款账户（account_id）
     * 账本默认为购物清单，分类也默认为购物清单
     * 金额 需要计算
     * /**
     *  *  根据复选框选中的item，计算总金额，并且将每个item的id提交（goods_list_id）
     *  *  服务器根据id列表，在goods表里，删除它们，并且在inventory里的include_number减去列表的长度.总金额也需扣掉 (goods_total_amount)
     * 
     *  *  完成inventory表和goods的变化
     * 
     *  *  之后，再判断当前total_amount和include_number是否为0，是则 在subscription写入finish，返回
     *  *  前端根据subscription字段 选择不渲染此清单，而是转入已完成的地方。 
     *  */
}

/**格式化金额 -- 随勾选数量而变 */
const itemAmount = computed(() => {
    return item => {
        let total = 0
        // ❌ 用 reduce就不行 , forEach可以 。
        item.goods_list.forEach(el => {
            if (el.checked) {
                total += Number(el.amount)
            }
        })
        return total
    }
})

</script>

<template>
    <!-- ref可判断当前组件位置 -->
    <div class="content" ref="Ref_content">
        <!-- 在整个Plan页面中是foot -->
        <div id="foot" class="foot">
            <!-- Touch事件触发口 -->
            <div class="FootBanner" @touchstart="handleTouchstart" @touchmove="handleTouchmove" @touchend="handleTouchend"
                @touchmove.stop.prevent>
                <div class="line"></div>
            </div>
            <!-- Touch事件触发口 -->
            <h2 class="title">Shopping List</h2>
            <!-- 清单列表 -->
            <div class="list" v-if="!isEmpty">
                <template v-for="(item, index) in shopping_list" :key="index">
                    <!-- 滑动单元格--右滑删除 -->
                    <van-swipe-cell right-width="100">
                        <div class="item">
                            <div class="item-inner">
                                <!-- 图表、标题、总金额 -->
                                <div class="ul">
                                    <div class="left">
                                        <div class="icon">
                                            <img v-if="item.icon !== ''" :src="item.icon" alt="">
                                            <img v-else src="@/assets/img/cost/list/airbnb.svg" alt="">
                                        </div>
                                        <div class="name">{{ item.name }} </div>
                                    </div>
                                    <div class="right">
                                        <div class="top">
                                            <div class="money">
                                                <img src="../img/money.svg" alt="">
                                            </div>
                                            <div class="amount">￥{{ itemAmount(item).toFixed(2) }}</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 图表、标题、总金额 -->
                                <!-- 商品Goods列表 -->
                                <div class="lis" v-if="item.isShow">
                                    <van-cell-group inset>
                                        <van-cell @click="clickIten(item, index, iten, indey)"
                                            :class="{ 'lastLi': iten.isAddBtn }"
                                            style="background-color: #c7dcda;text-shadow: 0 0 2px #799;"
                                            v-for="(iten, indey) in item.goods_list" :title="map_goods_name(iten, indey)"
                                            class="li" :key="iten">
                                            <template #right-icon>
                                                <van-checkbox @click="click_gou(iten, indey)" v-if="!iten.isAddBtn"
                                                    icon-size="24px"
                                                    style="border: 0;border-radius: 50%;box-shadow:0 1px 6px #799;"
                                                    v-model="iten.checked" checked-color="#ffda72FF" :name="item"
                                                    @click.stop />
                                            </template>
                                        </van-cell>
                                    </van-cell-group>
                                </div>
                                <!-- 商品Goods列表 -->
                                <!-- "展开"和"一键记账"按钮 -->
                                <div class="fooot">
                                    <div class="show">
                                        <van-icon v-if="!item.isShow" @click="fold(item, index)" name="arrow-down"
                                            size="15" />
                                        <van-icon v-else @click="fold(item, index)" name="arrow-up" size="15" />
                                    </div>
                                    <div class="purchase" @click="charge(item, index)"><span>一键记账</span></div>
                                </div>
                                <!-- "展开"和"一键记账"按钮 -->
                            </div>
                        </div>
                        <!-- 删除按钮 -->
                        <template #right>
                            <div @click="Delete_list(item, index)"
                                style="height:100%;display: flex;justify-content: center;align-items: center;" class="icon">
                                <img src="@/assets/img/Profile_Center/chacha.svg" style="width: 35px;height: 35px;" alt="">
                            </div>
                        </template>
                        <!-- 删除按钮 -->
                    </van-swipe-cell>
                    <!-- 滑动单元格--右滑删除 -->
                </template>
            </div>
            <div class="empty" v-if="isEmpty">
                <empty>
                    <template #icon>
                        <div class="iconfont icon-queshengye_zanwujiaofei"></div>
                    </template>
                </empty>
            </div>
            <!-- 清单列表 -->
        </div>

        <!-- 在整个Plan页面中是foot -->
    </div>
    <!-- ref可判断当前组件位置 -->
</template>

<style lang="less" scoped>
.lastLi {
    display: flex;
    justify-content: center;
    align-items: center;

}

.content {
    position: relative;
    width: 100vw;
    height: 80%;
    position: fixed;
    bottom: -50%;
    border-radius: 40px 40px 0 0;
    overflow-y: auto;
    background: rgb(223, 232, 231);

    &::-webkit-scrollbar {
        display: none;
    }

    .foot {

        .FootBanner {
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 5px;

            .line {
                // padding-top: 5px;
                width: 10%;
                height: 5px;
                border-radius: 15px;
                background-color: #333;
            }
        }

        .title {
            // color: #ffdf5aFF;
            padding: 2px 0 0 20px;
        }

        .list {
            .item {
                position: relative;
                margin: 10px 40px;
                padding: 10px 20px;
                background-color: #5baba5aa;
                border-radius: 15px;


                .ul {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .left {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .icon {
                            img {
                                width: 25px;
                                height: 25px;
                            }
                        }

                        .name {
                            margin-left: 15px;
                            font-size: 14px;
                            font-weight: 700;
                        }
                    }

                    .right {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        .top {
                            // margin-top: 15px;
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            .money {
                                img {
                                    width: 15px;
                                    height: 15px;
                                }
                            }

                            .amount {
                                font-weight: 700;
                                font-size: 16px;
                                color: #ffdf5aFF
                            }
                        }



                    }
                }

                .lis {
                    margin-top: 15px;
                    padding-left: 20px;

                    .li {

                        .number {
                            font-size: 16px;
                        }
                    }
                }

                .fooot {
                    margin-top: 15px;
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: flex-start;
                    align-items: center;

                    .show {
                        margin-top: 6px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        right: 50%;
                        transform: translate(50%);
                    }

                    .purchase {
                        // position: absolute;
                        // bottom: 8px;
                        // right: 15px;
                        position: relative;
                        left: 1.4rem;
                        width: 80px;
                        height: 20px;
                        border-radius: 12px;
                        background-color: #ffdf5aDD;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 1px;

                        span {
                            // color: rgba(255, 255, 255, 1);
                            color: #333;
                            font-weight: 800;
                        }
                    }

                }


            }
        }

        .empty {
            width: 200px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }



    .popup {
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        &.webkit-scroll {
            display: none;
        }

        .inner {
            box-sizing: border-box;
            padding: 10px;

            .banner {
                display: grid;
                grid-template-columns: .5fr 2fr 1fr;

                .submit {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    .btn {
                        width: 80px;
                        height: 40px;
                        border-radius: 24px;
                        background-color: rgb(255, 211, 158);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                .left {
                    display: flex;
                    align-items: center;
                }

                .middle {
                    display: flex;
                    justify-content: center;
                }
            }

            .conten {
                padding: 10px 10px 0 10px;

                .box {
                    margin-top: 25px;
                }

                .icon {
                    display: flex;

                    .iright {
                        flex: 1;
                        margin-left: 20px;
                        display: grid;
                        grid-template-rows: repeat(2, 1fr);
                        grid-row-gap: 10px;

                        .line {
                            position: relative;
                            width: 250px;
                            background-color: #bfbfbfAA;
                            border-radius: 24px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;

                            input {
                                margin-left: 20px;
                                border: 0;
                                background-color: #d6d8d8;
                            }

                            // margin-top   : 10px;
                            .color {
                                margin-left: 10px;
                                color: #1b1b1b;
                                font-weight: 550;
                                font-size: 16px;
                            }
                        }

                        span {
                            position: relative;
                            left: 15px;
                            color: #6d6d6d // display: block;
                                // background-color: pink;
                                // width: 200px;
                                // margin-top: 8px;
                                // padding-top: 20px;
                        }
                    }

                    img {
                        background-color: #bfbfbfAA;
                        border-radius: 50px;
                        width: 100px;
                        width: 100px;
                    }
                }

                .describe {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    input {
                        box-sizing: border-box;
                        width: 95%;
                        height: 50px;
                        padding-left: 20px;
                        border-radius: 24px;
                        background-color: #bfbfbfDD;
                        border: 0;
                        outline: none;
                    }

                    ::-webkit-input-placeholder {
                        font-weight: 400;
                    }

                }


            }
        }
    }
}
</style>