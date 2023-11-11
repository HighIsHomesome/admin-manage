<script setup>
import { ref, watch } from 'vue';
// Utils
import useTouch from '@/utils/touch';
// Vant
import { showNotify } from 'vant';
import 'vant/es/notify/style'
import { showSuccessToast } from 'vant';
import 'vant/es/toast/style'
// 组件
import planBanner from './cpns/banner.vue'
import dashBoard from './cpns/dashBoard.vue';
import options from './cpns/options.vue'
import content from './cpns/content.vue';
import popInventory from './cpns/popInventory.vue';

// Store
import usePlanStore from '@/stores/modules/plan';
const planStore = usePlanStore()
/** */

//  
const Ref_target = ref()
const { moveX, moveY } = useTouch(Ref_target, false)

const Red_Index = ref()
const Ref_content = ref()
watch([moveX, moveY], ([newV1, newV2], [oldV1, oldV2]) => {
    console.log(Math.floor(newV1), Math.floor(newV2));
})




const showBottom_popup = ref(false)  //创建清单 -- PopUp
const show_addGoods_popUp = ref(false)  // 创建清单 AddGoods  -- PopUp

// 创建清单 AddGoods  -- PopUp
const cur_item = ref()
const cur_indey = ref()
// Content方法 按钮 点击添加商品
function clickAddGoods(item, indey) {
    show_addGoods_popUp.value = true
    cur_item.value = item
    cur_indey.value = indey
}
</script>

<template>
    <div class="plan" ref="Red_Index">
        <div class="inner">
            <div class="del" ref="Ref_target" @touchmove.stop.prevent>来抓我呀</div>
            <planBanner />
            <dashBoard />
            <options @click:showPopup="showBottom_popup = true" />
            <content ref='Ref_content' @clickAddGoods="clickAddGoods" />
            <!-- 创建清单 -->
            <popInventory :cur_item="cur_item" :cur_indey="cur_indey" :show_addGoods_popUp="show_addGoods_popUp"
                @click:cancelAddgoodsPopup="show_addGoods_popUp = false"
                @click:showAddgoodsPopup="show_addGoods_popUp = true" :showBottom_popup="showBottom_popup"
                @click:overlay="showBottom_popup = false" />
            <!-- 添加商品 -->
            <!-- <van-popup class="popup" v-model:show="show_addGoods_popUp" position="bottom" :style="{ height: '40%' }" round>
                                        <div class="inner">
                                            <div class="banner">
                                                <div class="left" @click="show_addGoods_popUp = false"><van-icon name="arrow-left" size="22" />
                                                </div>
                                                <div class="middle">
                                                    <h2 v-html="text_add_title"></h2>
                                                </div>
                                                <div class=" box submit">
                                                    <div class="btn" @click="submit_addGoods">
                                                        <van-icon name="success" size="36" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="conten">
                                                <div class="box icon">
                                                    <img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt="">
                                                    <div class="iright">
                                                        <div class="line type">
                                                            <span style="font-size: 12px;">金额:</span>
                                                            <input v-model="cur_Goods_amount" type="text" placeholder="￥">
                                                        </div>
                                                        <div class="line category">
                                                            <span style="font-size: 12px;">名称:</span>
                                                            <input v-model="cur_Goods_name" type="text">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class=" box describe">
                                                    <input v-model="cur_Goods_describe" type="text"
                                                        placeholder="Please describe the item  --  ( optional )">
                                                </div>
                                            </div>
                                        </div>
                                    </van-popup> -->
        </div>
    </div>
</template>

<style lang="less" scoped>
.plan {

    /**
      * margin-top传递问题:
      * 1.border: 1px solid transparent;
      * 2.padding-top: 1px;
      * 3.overflow: auto;
     */
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180.00deg, rgba(67, 136, 131, 0.3) 5%, rgba(67, 136, 131, 0.3) 97%);
    // overflow-y: auto;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;

    .inner {
        opacity: 0.9;
        width: 100%;
        height: 100%;

        .del {
            position: fixed;
            top: 15px;
            right: 15px;
        }
    }

    .popUp-inner {
        box-sizing: border-box;
        padding: 20px;

        .topBar {
            display: grid;
            grid-template-columns: .7fr 2fr;

            .title {
                font-size: 20px;
                font-weight: 550;
            }
        }

        .infos {
            display: flex;
            padding: 20px;


            .icon {
                display: grid;
                width: 70px;
                height: 70px;
                background-color: bisque;
                border-radius: 24px;

                img {
                    place-self: center;
                    width: 50px;
                    height: 50px;
                }
            }

            .name {
                display: flex;
                flex: 1;
                align-items: center;
                margin-left: 10%;

                input {
                    flex: 1;
                    height: 80%;
                    text-align: center;
                    border: 0;
                    background-color: bisque;
                    border-radius: 24px;
                }
            }
        }

        .list {
            padding: 0 30px 15px;
            overflow-y: auto;
            height: 35vh;
            border-top: 2px solid #429690;
            border-radius: 12px;
            border-bottom: 2px solid #429690;

            .nav {
                // position: sticky;
                // top: 0;
                margin-top: 10px;
                display: flex;
                justify-content: center;
                // background-color: #fff;

                span {
                    position: relative;
                    right: 4px;
                    font-size: 20px;
                    font-weight: 550;
                    color: #027f87;
                }
            }

            .item {
                display: grid;
                grid-template-columns: .6fr 1fr .3fr;
                grid-template-rows: repeat(auto-fill 1fr);
                margin-top: 10px;
                padding: 10px;
                background-color: #fae3c6;
                border-radius: 24px;

                .icon {
                    img {
                        width: 50px;
                        height: 50px;
                    }
                }

                .middle {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color: #7d7f7f;

                    .name {
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .sub {
                        margin-top: 6px;
                        font-size: 12px;
                    }
                }

                .right {
                    display: flex;
                    align-items: center;

                    .amount {
                        display: flex;
                        justify-content: flex-end;
                        width: 80px;
                        font-size: 18px;
                        font-weight: 550;
                        margin-right: 15px
                    }

                }
            }
        }

        .btns {
            padding: 20px;
            display: flex;
            justify-content: space-evenly;


            .btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 50px;
                font-size: 16px;
                font-weight: 600;
                text-shadow: 0 0 2px #eeeeee;
                background-color: #429690;
                border-radius: 24px;
                color: aliceblue;
                box-shadow: 0 0 5px #027f87;
            }
        }
    }

    .popup {
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