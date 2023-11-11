<script setup>
// Vue
import { ref, computed } from 'vue'

const props = defineProps({
    obj: {
        type: Object,
        default: () => { }
    },
    TypeOrCategory: {
        type: String,
        default: 'type_'
    }
})
/**
* var
*/
const topArrKey = computed(() => {
    return props.TypeOrCategory + 'topArr'
})
// 
const showCategoryDetail = ref(false)
let current_clickCategory = ref()
/**
* function
*/
function LinktoDetail(item) {
    if (props.TypeOrCategory == 'category_') return
    showCategoryDetail.value = true
    // 
    current_clickCategory.value = item.category_pieArr
}

</script>

<template>
    <div class="Top">
    <div class="top">
        <div id="title">Top</div>
        <div id="list">
                <template v-for="(item, index) in obj[topArrKey]" :key="index">
                    <div class="item">
                        <div class="left">
                            <img :src="item.avatar" alt="">
                        </div>
                        <div class="middle">
                            <div class="middleTop">
                                <strong class="big">{{ TypeOrCategory == 'type_' ? item.type : item.category }}</strong>
                                <span class="percentage">{{ item.percentage }}</span>
                            </div>
                            <div class="middleBottom">
                                <van-progress :percentage="item.percentage.replace('%', '')" :pivot-text="item.percentage"
                                    :show-pivot=false pivot-color="rgba(66,150,144,1)" stroke-width="6"
                                    color="linear-gradient(to right, rgba(66,150,144,1),rgba(42.47,124.31,118.38,1)" />
                            </div>
                        </div>
                        <div class="right" @click="LinktoDetail(item)">
                            <div class="text">
                                <div class="up">￥{{ item.amount }}</div>
                                <div class="down">{{ item.number }}</div>
                            </div>
                            <div class="icon" v-if="TypeOrCategory == 'type_'">
                                <van-icon name="arrow" size=18 color="#928f8f" />
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- <div id="top-empty" v-if="isEmpty">
                                                                                                                                                                        <empty v-if="isEmpty">
                                                                                                                                                                            <template #icon>
                                                                                                                                                                                <div class="iconfont icon-jiluqueshengshuxing"></div>
                                                                                                                                                                            </template>
                                                                                                                                                                        </empty>
                                                                                                                                                                    </div> -->
        </div>
    </div>
    <van-overlay :show="showCategoryDetail" @click="showCategoryDetail = false">
        <div class="detail">
            <div class="top">
                {{ current_clickCategory }}
            </div>
        </div>
    </van-overlay>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
}

.Top {
    .flex();
    margin-top: 15%;
    overflow-y: auto;

    .top {
        display: flex;
        flex-direction: column;

        #title {
            position: sticky;
            top: 0;
            z-index: 1;
            width: 100%;
            // margin-left: 25px;
            font-size: 28px;
            font-weight: 800;
            color: var(--primary--color); // color: #333;
            background: #f1f6f6;
        }

        #list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .item {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 360px;
                height: 50px;
                margin-top: 20px;

                .left {
                    width: 45px;
                    height: 45px;
                    border-radius: 20px;
                    background-color: var(--primary--color);
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .pic {
                        width: 35px;
                        height: 35px;
                    }
                }

                .middle {
                    width: 200px;
                    margin-left: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    .middleTop {
                        width: 150px;
                        display: flex;
                        margin-bottom: 10px;

                        span {
                            position: relative;
                            top: 1px;
                            font-size: 12px;
                            margin-left: 6px;
                            color: #928f8f
                        }

                    }

                    // .middleBottom {}
                }

                .right {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    flex: 1;


                    .text {
                        position: relative;
                        top: 2px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;

                        .up {
                            font-size: 16px;
                            font-weight: 700;
                            color: #ff5b5bFF
                        }

                        .down {
                            margin-top: 2px;
                            font-size: 12px;
                            color: #928f8f
                        }
                    }

                    .icon {
                        margin-left: 10px;
                    }
                }
            }
        }

        #top-empty {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20% 0;
        }
    }

}

.detail {
    position: absolute;
    display: grid;
    width: 75%;
    height: 55%;
    // background-color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, .7);
    border-radius: 12px;
    font-family: sans-serif;
    backdrop-filter: blur(10px); // -webkit-backdrop-filter: blur(10px);
    left: 50%; //起始是在body中，横向距左50%的位置
    top: 50%; //起始是在body中，纵向距上50%的位置，这个点相当于body的中心点，div的左上角的定位
    transform: translate(-50%, -50%); //水平、垂直都居中,也可以写成下面的方式
    color: #fff;
    font-size: 20px;
    font-weight: 700;

    .top {
        display: grid;

        .info {
            display: grid;

            img {
                width: 150px;
            }


            .net {
                font-size: 16px;
            }

            .asset {
                display: flex;
                width: 100%;
                justify-content: space-evenly;

                .expend {
                    color: rgb(211, 53, 53)
                }

                .income {
                    color: green;
                }
            }
        }

        .info>* {
            place-self: center;
        }
    }

    .bottom {
        display: grid;
        grid-template-rows: .5fr 1fr;


        .month {
            justify-self: center;
            font-size: 20px;
            font-weight: 600;
        }

        .box {
            display: flex;
            justify-content: space-evenly;

            .btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100px;
                height: 50px;
                border-radius: 24px;
                box-shadow: 0 0 5px #9f9f9f;
                color: #e2e1e1DD;
                font-weight: 550;
            }

            .expend {
                background-color: #c25a6a;
            }

            .income {
                background-color: #489a4a;
            }
        }
    }
}
</style>