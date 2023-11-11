<script setup>
// 响应式
import { ref, toRaw, computed, watch } from 'vue'
// Until
import { createURLObj } from '@/utils/URLSearchParams';
// 组件
import mydialog from '@/components/dialog.vue'
// Vant
import { showNotify } from 'vant';
import 'vant/es/notify/style'
// Store
import useCenterStore from '@/stores/modules/center';
import { storeToRefs } from 'pinia';
const centerStore = useCenterStore()
// Emit
const emit = defineEmits(['notify:itenAmount'])
// Props
const props = defineProps({
    types: {
        type: Array,
        default: () => []
    },
    current_index: {
        type: Number,
        default: 0
    },
    isClicktoEdit: {
        type: Boolean,
        default: false
    }
})
props.types[0].hide = false // 默认第一项是展开的

let newArr = computed(() => props.types)
// 创建数组并赋值

const click = (el, item, index, hide) => {
    newArr.value[index].hide == false ? newArr.value[index].hide = true : newArr.value[index].hide = false   // 改变显示属性
}
/**
 * 一级分类 右侧的金额
 */
const TypeName = computed(() => {
    if (props.current_index == 0) return 'spend'
    if (props.current_index == 1) return 'income'
})
watch(() => TypeName.value, (newV) => {
    console.warn(newV);
})
/**
 * 分类
 */
const showPopUpBottom = ref()
// 
const dialogTitle = ref('修改类别名')
const isShow_modifyDiaglog = ref(false)
const default_placeholder = ref('')
const newCategoryName = ref('')
/**
 * 记录表单信息
 */
const type = ref()              // 消费类型的数字
const type_name = ref('')       // 消费类型的名字
const first_type_name = ref('') // 一级分类的名字
const first_type_id = ref() // 一级分类的名字
const subMit_name = ref()      // 表单提交的name
let closeFn = (status, firstType_index, category_id, newValue) => { }
const clickIten = (item, iten, index, indey, $event) => {
    if (!props.isClicktoEdit) {
        if ($event.target.innerText == '+') {
            // 弹出popUp
            showPopUpBottom.value = true
            // 
            type.value = item.type
            type_name.value = item.type == 1 ? 'Expend' : 'Income'
            first_type_name.value = item.name
            first_type_id.value = item.id
        }
        else {
            // 显示分类金额在title上
            emit('notify:itenAmount', `${iten.name} : $${iten.amount}`)
            return
        }
    }
    if ($event.target.innerText != '+') {   //textContent
        // 修改名称
        default_placeholder.value = iten.name
        isShow_modifyDiaglog.value = true
        closeFn = (status, newValue = newCategoryName.value, firstType_index = index, category_index = indey, category_id) => {
            if (status === 'cancel') { isShow_modifyDiaglog.value = false }
            else if (status === 'confirm') {
                const modify_categoryName = createURLObj({ id: category_id, name: newValue })
                // 网络请求
                centerStore.Post_Modify_CategoryName(modify_categoryName).then(() => {
                    props.types[firstType_index].list[category_index].name = newValue
                    isShow_modifyDiaglog.value = false
                    showNotify({ type: 'success', message: '修改成功' });
                }).catch((error) => {
                    throw error
                })
            }
        }
        console.log(item, index, iten, closeFn);
    }
}
// 关闭对话框（修改类别名）
function Close(status) {
    closeFn(status)
}
function updateAmount(newV) {
    newCategoryName.value = newV
}
/**
 * 提交
 */
const submit = () => {
    if (subMit_name.value == undefined) {
        isInputShark.value = true
        setTimeout(() => {
            isInputShark.value = false
        }, 1000)
        return
    }
    const add_category_info = createURLObj({ name: subMit_name.value, type_id: type.value, avator: '' })
    centerStore.Post_addCategory(add_category_info, first_type_id.value, type_name.value)
        .then(() => {
            showPopUpBottom.value = false
            showNotify({ type: 'success', message: '添加分类成功' });
        })
}

/**
 * 删除类别
 */
const isInputShark = ref(false)
const del_category = (iten, item) => {
    const delete_category_info = createURLObj({ id: iten.id })
    centerStore.Post_deleteCategory(delete_category_info, iten.id, item.id).then(() => {
        showNotify({ type: 'success', message: '删除成功' });
    })
}

</script>

<template>
    <div class="category_content">
        <div class="innerItem">
            <template v-for="(item, index) in types" :key="index">
                <div class="item">
                    <div class="title" @click="click($event, item, index, hide)" :hide="item.hide">
                        <div class="left">
                            <div><img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt=""
                                    :class="{ imgshark: isClicktoEdit && item.hide == false }">
                            </div>
                        </div>
                        <div class="middle">
                            {{ item.name }}
                        </div>
                        <div class="right">
                            <span>{{ TypeName }}￥{{ item.amount.toFixed(2) }}</span>
                        </div>
                    </div>
                    <div class="list" v-if="!item.hide" :class="{ animationIn: !item.hide }">
                        <template v-for="(iten, indey) in item?.list">
                            <div class="innerIten" @click="clickIten(item, iten, index, indey, $event)">
                                <div class="iten" :class="{ imgshark: isClicktoEdit && item.id !== 0 }">
                                    <img v-if="isClicktoEdit && iten.id !== 0" src="@/assets/img/Profile_Center/chacha.svg"
                                        alt="" @click.stop="del_category(iten, item)">
                                    <span>{{ iten?.name }}</span>
                                </div>
                            </div>
                        </template>
                    </div>

                </div>
            </template>
        </div>
        <van-popup class="popup" v-model:show="showPopUpBottom" position="bottom" :style="{ height: '40%' }" round
            closeable>
            <div class="inner">
                <div class="banner">
                    <div class="left"><van-icon name="arrow-left" size="22" /></div>
                    <div class="middle">
                        <h2>Add category</h2>
                    </div>
                </div>
                <div class="conten">
                    <div class="box icon">
                        <img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt="">
                        <div class="iright">
                            <div class="line type"><span style="font-size: 12px;">类型:</span><span class="color">{{ type_name
                            }}</span></div>
                            <div class="line category"><span style="font-size: 12px;">一级分类:</span><span class="color">{{
                                first_type_name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="box name">
                        <input :class="{ inputShark: isInputShark }" type="text" v-model="subMit_name"
                            placeholder="&ensp; Please enter a category name">
                    </div>
                    <div class="box submit">
                        <div class="btn" @click="submit">
                            <van-icon name="success" size="36" />
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
        <div class="footer">
            <span> Types & Categories</span>
        </div>
        <mydialog @update:amount="updateAmount" :title="dialogTitle" :show="isShow_modifyDiaglog"
            :default_placeholder="default_placeholder" :Close="Close" />
    </div>
</template>

<style lang="less" scoped>
@keyframes slit-in-horizontal {

    0% {
        transform: translateZ(-800px) rotateX(90deg);
        opacity: 0;
    }

    50% {
        transform: translateZ(-160px) rotateX(87deg);
        opacity: 1;
    }

    100% {
        transform: translateZ(0) rotateX(0);
    }
}

@keyframes shake-center {

    0% {
        transform: rotate(0deg);
        transform-origin: 50% 50%;
    }

    10% {
        transform: rotate(5deg);
    }

    20% {
        transform: rotate(-8deg);
    }

    30% {
        transform: rotate(8deg);
    }

    40% {
        transform: rotate(-8deg);
    }

    50% {
        transform: rotate(8deg);
    }

    60% {
        transform: rotate(-8deg);
    }

    70% {
        transform: rotate(8deg);
    }

    80% {
        transform: rotate(-5deg);
    }

    90% {
        transform: rotate(5deg);
    }

    100% {
        transform: rotate(0deg);
        transform-origin: 50% 50%;
    }
}

@keyframes shake-vertical {

    0% {
        transform: translateY(0);
    }

    10% {
        transform: translateY(-8px);
    }

    20% {
        transform: translateY(8px);
    }

    30% {
        transform: translateY(-8px);
    }

    40% {
        transform: translateY(8px);
    }

    50% {
        transform: translateY(-8px);
    }

    60% {
        transform: translateY(8px);
    }

    70% {
        transform: translateY(-8px);
    }

    80% {
        transform: translateY(6.4px);
    }

    90% {
        transform: translateY(-6.4px);
    }

    100% {
        transform: translateY(0);
    }
}

:root {
    --van-popup-background: red;
    --van-background-2: red;
}

.animationIn {
    animation-name: slit-in-horizontal;
    animation-duration: 0.2s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;

    /* shorthand
		animation: slit-in-horizontal 1s linear 0s 1 normal none;*/
}

.inputShark {
    animation-name: shake-vertical;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
}

.imgshark {
    animation-name: shake-center;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: none;
}

.category_content {
    font-family: Inter;

    .innerItem {
        margin-bottom: 60px;

        .item {
            margin-bottom: 15px;

            .title {
                margin-top: 10px;
                position: relative;
                width: 100%;
                height: 60px;
                display: flex;
                // justify-content: center;
                align-items: center;
                background-color: #d0d0d0aa;
                font-size: 16px;
                border-radius: 24px;

                .left {
                    margin-left: 8px;
                    width: 15%;
                    background-color: var(--primary--color);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 21px;
                    margin-right: 15px;

                    img {
                        width: 50px;
                        height: 50px;
                    }
                }

                .middle {
                    width: 40%;
                }

                .right {
                    width: 45%;
                    display: flex;
                    justify-content: flex-end;
                    margin-right: 16px;

                    span {
                        font-size: 12px;
                        color: #6d6d6d
                    }
                }
            }

            .titleAtive::after {
                content: '';
                position: absolute;
                z-index: 2;
                top: -5px;
                right: -15px;
                display: block;
                width: 30px;
                height: 30px;
                background-image: url('@/assets/img/Profile_Center/chacha.svg');
                background-size: 70% 70%;
                background-repeat: no-repeat;
            }

            .title:active {
                background-color: #d0d0d0FF;
            }

            .list {
                position: relative;
                left: 20px;
                // grid布局
                margin-top: 20px;
                width: 90%;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-template-rows: repeat(auto-fill, 1fr);
                grid-row-gap: 20px;
                grid-column-gap: 0px;
                background: linear-gradient(120deg, #bbbbbb 0%, #bfbfbf 100%);
                // background-color: rgb(187, 187, 187);
                border-radius: 12px;
                border: 1px solid #bfbfbfAA;
                box-shadow: 0 0 15px #bfbfbf;
                padding: 20px 0;
                // margin-bottom: 60px;

                .innerIten {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .iten {
                        position: relative;
                        padding: 0;
                        width: 55px;
                        height: 55px;
                        background-color: rgba(66.17, 149.81, 143.75, .2);
                        border-radius: 25px;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            width: 20px;
                            height: 20px;
                            position: absolute;
                            top: -5px;
                            right: -5px;
                        }
                    }
                }

            }

            .list:before {
                content: '';
                position: absolute;
                z-index: -1;
                top: -22px;
                left: 50px;
                display: block;
                width: 50px;
                height: 50px;
                background-image: url('@/assets/img/Profile_Center/sjx.svg');
                background-size: 70% 70%;
                background-repeat: no-repeat;
            }


        }
    }

    .footer {
        margin-top: 60px;
        position: fixed;
        z-index: 5;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-image: linear-gradient(120deg, #84fab0 0%, #429690 100%);
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-weight: 550;
            font-size: 20px;
            color: aliceblue;
            text-shadow: 2px 2px #429690;
        }
    }
}

.popup {
    &.webkit-scroll {
        display: none;
    }

    .inner {
        padding: 10px;

        .banner {
            display: grid;

            grid-template-columns: 1fr 2fr 1fr;

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
                    // display: flex;
                    // flex-direction: column;
                    // // align-items: center;
                    // justify-content: center;
                    // align-items: center;

                    .line {
                        position: relative;
                        width: 250px;
                        background-color: #bfbfbfAA;
                        border-radius: 24px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;

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

            .name {
                display: flex;
                justify-content: center;
                align-items: center;

                input {
                    width: 95%;
                    height: 50px;
                    border-radius: 24px;
                    background-color: #bfbfbfDD;
                    border: 0;
                    outline: none;
                }
            }

            .submit {
                display: flex;
                justify-content: flex-end;

                .btn {
                    width: 100px;
                    height: 50px;
                    border-radius: 24px;
                    background-color: #429690;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}
</style>