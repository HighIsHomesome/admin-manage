<script setup>
import { ref } from 'vue';
// Hook
import { createURLObj } from '@/utils/URLSearchParams';
// 路由
import { useRouter } from 'vue-router';
// Store
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main';
const mainStore = useMainStore()
const { user, isShowPlaneLoading } = storeToRefs(mainStore)
// 路由
const router = useRouter()
/**
 * 转场动画
 */
const Ref_page = ref()
const Ref_pic = ref()
const Ref_regis = ref()
const title = ref('注册')
const zhuce = ref('注册')
const start_animition = ref(false)
const showRegisterWindow = ref(false)
const formdata = ref({
    username: undefined,
    password: undefined,
    bookname: undefined,
})

function startRegister() {
    start_animition.value = true
    setTimeout(() => {
        Ref_regis.value.style.cssText = `display:none`
        Ref_pic.value.style.display = 'block'
    }, 475)
    setTimeout(() => {
        showRegisterWindow.value = true
    }, 495)
}

function click() {
    console.warn(formdata.value.username, formdata.value.password);
    // 获取数据
    if (!formdata.value.username || !formdata.value.password) {
        title.value = '用户名和密码不能为空哦!'
        setTimeout(() => {
            title.value = '注册'
        }, 1000)
        return
    }
    else {
        const submit_register = createURLObj(formdata.value)
        mainStore.PostRegister(submit_register)
            .then(token => {
                zhuce.value = `Let's Go`
                router.push('/home')
                sessionStorage.setItem('token', token)
            })
            .catch(res => {
                title.value = res.msg
                setTimeout(() => {
                    title.value = '注册'
                }, 1000)
            })
    }

    // 发送请求
    // 开启动画
    // 关闭动画
}
</script>

<template>
    <div class="register" ref="Ref_page" :class="{ bgActive: showRegisterWindow == true }">
        <div class="inner">
            <!-- Form 注册页 -->
            <div class="pic" ref="Ref_pic">
                <!-- 图片 -->
                <img src="@/assets/img/register/topperson.svg" alt="">
                <div class="title">
                    <h1 v-html="zhuce"></h1>
                </div>
                <!-- Form -->
                <form class="form">
                    <!-- 用户名 -->
                    <div class="username glass">
                        <div class="icon"><img class="little" src="@/assets/img/register/user.svg" alt=""></div>
                        <div class="text"><input v-model="formdata.username" type="text" placeholder="用户名" name="name"
                                id="name" onfocus="if(this.value=='用户名'){this.value='';}" required autofocus>
                        </div>
                    </div>
                    <!-- 密码 -->
                    <div class="password glass">
                        <div class="icon"><img class="little" src="@/assets/img/register/password.svg" alt=""></div>
                        <div class="text"><input v-model="formdata.password" type="text" placeholder="密码" name="name"
                                id="name" onfocus="if(this.value=='密码'){this.value='';}" required autofocus></div>
                    </div>
                    <!-- 账本 -->
                    <div class="ledger glass">
                        <div class="icon"><img class="little" src="@/assets/img/register/book.svg" alt=""></div>
                        <div class="text"><input v-model="formdata.bookname" type="text" placeholder="默认账本名" name="name"
                                id="name" onfocus="if(this.value=='默认账本名'){this.value='';}" required autofocus></div>
                    </div>
                    <!-- 按钮 -->
                    <div class="signUp galss" @click="click">
                        <span v-html="title"></span>
                    </div>
                    <!-- 其他注册方式 -->
                    <div class="others">
                        <div class="box">
                            <div class="qq item"><img class="little" src="@/assets/img/register/qie.svg" alt=""></div>
                            <div class="wechat item"><img class="little" src="@/assets/img/register/wexin.svg" alt=""></div>
                        </div>
                    </div>
                    <!-- 跳转到登录页面 -->
                    <div class="tip">
                        <div>Already Have Account? <span @click="router.push('/login')"> Sign in</span></div>
                    </div>
                </form>

            </div>
            <!-- 初始页面 -->
            <div class="regis" :class="{ 'animation-out': start_animition == true }" ref="Ref_regis">
                <div class="text">
                    <span class="slogan">Spend Smarter Save More</span>
                </div>
                <img src='@/assets/img/register/registerButton.png' alt="" @click="$router.push('/login')">
                <div class="tip">
                    <div>Have Not Account? <span @click="startRegister"> Sign up</span></div>
                </div>
            </div>
            <!-- 灯光效果 -->
            <div class="halo" v-if="showRegisterWindow == true">
                <img class="blur" src="@/assets/img/register/blur.svg" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@keyframes puff-out-center {

    0% {
        transform: scale(1);
        filter: blur(0);
        opacity: 1;
    }

    99% {
        transform: scale(2);
        filter: blur(4px);
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}

@keyframes scale-up-center {
    0% {
        transform: scale(.1);
    }

    100% {
        transform: scale(1);
    }
}

.animation-out {
    animation-name: puff-out-center;
    animation-duration: 0.5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
}

.register {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 9;
    background-color: rgba(0, 0, 0, .9);

    .inner {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;



        .halo {
            position: fixed;
            z-index: -1;
            bottom: 200px;
            right: 70px;

            .blur {
                transform: scale(1.8);
                opacity: 0.5;
                width: 100%;
            }
        }

        .regis {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;


            .text {
                display: flex;
                width: 301px;
                height: 76px;
                color: rgb(67, 136, 131);
                font-family: Inter;
                font-size: 36px;
                font-weight: 700;
                line-height: 38px;
                text-align: center;
            }

            img {
                /* Group 27 */
                width: 100%;

            }

            .tip {
                position: absolute;
                bottom: 0;

                div {
                    /* Already have account? Log In */
                    width: 209px;
                    height: 17px;
                    // color: rgb(68, 68, 68);
                    color: #c1bebe;
                    font-family: Inter;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 17px;
                    text-align: center;

                    span {
                        font-weight: 600;
                    }
                }
            }
        }

        .pic {
            img {
                width: 100%;
                margin-bottom: 10px;
            }

            .title {
                display: flex;
                justify-content: center;
                align-items: center;
                color: #c1bebe;
            }

            position: absolute;
            left: 0;
            right: 0;
            top: 6.53%;
            bottom: 59.74%;
            margin: auto;
            width: 286px;
            display: none;



            .form {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                input:blank {
                    color: red
                }

                .tip {
                    position: absolute;
                    bottom: -50px;

                    div {
                        /* Already have account? Log In */
                        width: 209px;
                        height: 17px;
                        // color: rgb(68, 68, 68);
                        color: #c1bebe;
                        font-family: Inter;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 17px;
                        text-align: center;

                        span {
                            font-weight: 600;
                        }
                    }
                }

                .glass {
                    width: 317.4px;
                    height: 53.68px;
                    background-color: rgba(255, 255, 255, 0.181);
                    backdrop-filter: blur(100px);
                    // filter: blur(16px);
                    margin-bottom: 20px;
                    border-radius: 25px;
                    padding: 5px 12px;
                    display: flex;
                    // justify-content: center;
                    align-items: center;

                    .icon {
                        border-radius: 22.5px;
                        width: 40px;
                        height: 40px;
                        background-color: #fff;
                    }

                    .text {
                        margin-left: 20px;
                        color: rgba(255, 255, 255, 0.181);
                        font-size: 14px;

                        input {
                            width: 100%;
                            height: 100%;
                            color: rgba(255, 255, 255, 0.181);
                            background-color: transparent;
                            border: 0;
                        }

                        input:focus {
                            outline: none;
                        }
                    }
                }

                .icon {

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .little {
                        position: relative;
                        top: 5px;
                        width: 18px;
                        height: 18px;
                    }
                }


                .username {
                    .icon {
                        background-color: #f7e3db;

                    }
                }

                .password {
                    .icon {
                        background-color: #ebecff;
                    }
                }

                .ledger {
                    .icon {
                        background-color: #def5e9;
                    }
                }

                .signUp {
                    width: 317.4px;
                    height: 53.68px;
                    background-color: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(100px);
                    // filter: blur(16px);
                    margin-bottom: 20px;
                    border-radius: 25px;
                    padding: 5px 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 5px;
                    box-shadow: 0px 20px 30px rgba(255, 255, 255, 0.15);

                    span {
                        color: black;
                        font-size: 18px;
                    }
                }

                .signUp:active {
                    background-color: rgba(255, 255, 255, 0.7);
                }

                .others {
                    width: 317.4px;
                    height: 53.68px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    img {
                        position: relative;
                        top: 5px;
                        width: 30px;
                        height: 30px;
                    }

                    .item {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .box {
                        margin-top: 25px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .qq {
                        width: 50px;
                        height: 50px;
                        background-color: #fff;
                        margin-right: 40px;
                        border-radius: 25px;


                    }

                    .wechat {
                        width: 50px;
                        height: 50px;
                        background-color: #fff;
                        border-radius: 25px;


                    }
                }
            }






        }
    }
}
</style>