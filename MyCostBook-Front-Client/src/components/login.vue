<script setup>
// 响应式API
import { ref } from 'vue';
// 路由
import { useRouter } from 'vue-router'
// 组件
import loading from './loading.vue';
// Hook
import { createURLObj } from '@/utils/URLSearchParams';
// Vant
import { showFailToast } from 'vant';
import 'vant/es/toast/style'
// base64 
import { Base64 } from "js-base64";
import docCookies from '@/utils/docCookies'
// Store
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main';
const mainStore = useMainStore()
const { isShowPlaneLoading } = storeToRefs(mainStore)
// 路由
const router = useRouter()
// 账户密码
const username = ref()
const password = ref()
const remember = ref()
// Created
function created() {
    // 在页面加载时从cookie获取登录信息
    let _username = docCookies.getItem("userName")
    // 如果存在赋值给表单，并且将记住密码勾选
    if (!_username) return
    else {
        let _password = Base64.decode(docCookies.getItem("passWord"))
        username.value = _username
        password.value = _password
        remember.value = true
    }
}
created()
// 
const text = ref('登入')
const title = ref('登入')
/**
 * 网络请求
 */
const click = () => {
    // 数值写入
    if (!username.value || !password.value) {
        title.value = '用户名和密码不能为空！'
        setTimeout(() => {
            title.value = '登入'
        }, 1000)
        return
    }
    const submit_login = { username: username.value, password: password.value }
    if (remember.value) {
        // 如果选择记住密码
        // 加密
        const pw = Base64.encode(password.value)
        // cookie
        docCookies.setItem('userName', username.value, Infinity,)
        docCookies.setItem('passWord', pw, Infinity,)
    }
    else if (!remember.value) {
        docCookies.removeItem('userName')
        docCookies.removeItem('passWord')
    }
    // 发送请求
    mainStore.PostLogin(submit_login).then(res => {
        if (res.code == 200) {
            title.value = `Let's Go`
            console.log(res)
            setTimeout(() => {
                sessionStorage.setItem('token', res.obj.token)  // 关闭窗口就失效，刷新页面不会
                // 编程式导航
                router.push('/home')    //这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL。
                isShowPlaneLoading.value = false   // 跳转后把动画取消，防止用户重新登入时动画依然存在
            }, 1000)
        }
        else if (res.code == 500) {
            text.value = res.msg    // 显示失败的原因
            setTimeout(() => {
                text.value = '登入'
                title.value = '忘记密码?'
            }, 1500)
        }
    }).catch(() => {
        showFailToast({ message: '出错了', className: 'toast' })
        setTimeout(() => router.replace('/'), 1500)
    })
}
const showEyes = ref('password')
</script>

<template>
    <div class="login">
        <div class="pic" ref="Ref_pic">
            <img class="people" src="@/assets/img/login/loginperson.svg" alt="">
            <div class="title">
                <h1 v-html="title"></h1>
            </div>
            <form class="form">
                <div class="username glass">
                    <div class="icon"><img class="little" src="@/assets/img/register/user.svg" alt=""></div>
                    <div class="text"><input autocomplete="off" v-model="username" type="text" placeholder="用户名" name="name"
                            id="name" onfocus="if(this.value=='用户名'){this.value='';}" required autofocus>
                    </div>
                </div>
                <div class="password glass">
                    <div class="icon"><img class="little" src="@/assets/img/register/password.svg" alt=""></div>
                    <div class="text"><input autocomplete="off" v-model="password" :type="showEyes" placeholder="密码"
                            name="password" id="password" onfocus="if(this.value=='密码'){this.value='';}" required autofocus>
                    </div>
                    <div class="eyes" @click="showEyes == 'text' ? showEyes = 'password' : showEyes = 'text'">
                        <img v-if="showEyes == 'password'" src="@/assets/img/login/eyes.svg" alt="">
                        <img v-if="showEyes == 'text'" src="@/assets/img/login/closeEyes.svg" alt="">
                    </div>
                </div>
                <div class="remember">
                    <label>记住密码</label>
                    <input autocomplete="off" type="checkbox" v-model="remember">
                </div>
                <div class="signUp" @click="click">
                    <span v-if="isShowPlaneLoading == false" v-html="text"></span>
                    <div class="loading" v-if="isShowPlaneLoading == true">
                        <loading />
                    </div>
                </div>
                <div class="tip">
                    <div>Have Not Account? <span class="sign-up" @click="router.push('/')"> Sign up</span></div>
                </div>
                <!-- <div class="others">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <div class="box">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <img class="qq" src="@/assets/img/login/QQ.svg" alt="">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <img class="wechat" src="@/assets/img/login/wechat.svg" alt="">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div> -->


            </form>
        </div>
        <div class="halo">
            <img class="blur" src="@/assets/img/register/blur.svg" alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
.toast {
    z-index: 9999 !important;
}

.login {
    position: relative;
    z-index: 0;
    width: 100vw;
    height: 100vh;
    // background-color: #ffffffAA;
    // backdrop-filter: blur(16px);

    .halo {
        position: fixed;
        z-index: 0;
        bottom: -20px;
        right: 70px;

        .blur {
            transform: scale(2);
            // opacity: 0.9;
            width: 100%;
        }
    }

    .pic {

        position: relative;
        display: flex;
        z-index: 1;
        flex-direction: column;
        align-items: center;

        img.people {
            position: relative;
            width: 80%;
            margin-bottom: 20px;
            margin-top: 60px;
        }

        .title {
            display: flex;
            justify-content: center;
            align-items: center;
            // color: #c1bebe;
        }

        .form {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

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
                    display: flex;
                    justify-content: center;
                    align-items: centers;

                    input {
                        width: 100%;
                        height: 100%;
                        color: rgba(0, 0, 0, 0.5);
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
                    // position: relative;
                    // top: 5px;
                    width: 18px;
                    height: 18px;
                }
            }

            .username {
                margin-top: 20px
            }

            .password {
                position: relative;

                .eyes {
                    position: absolute;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    right: 20px;
                    width: 20px;
                    height: 20px;

                    img {
                        position: relative;
                        top: 2px;
                    }
                }

            }

            .remember {
                display: flex;
                align-items: center;
                color: rgba(0, 0, 0, 0.5);

                input {
                    margin-left: 4px;
                }

            }

            .signUp {
                position: relative;
                margin-top: 15px;
                width: 317.4px;
                height: 53.68px;
                background-color: black;
                border-radius: 48px;
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    color: #fff;
                    font-weight: 600;
                }

                .loading {
                    width: 100%;
                    position: relative;
                    left: 6px; // margin: auto;
                    // transform: translate(50%);
                }
            }

            .signUp:active {
                background-color: rgba(0, 0, 0, 0.9);
            }

            .tip {
                position: absolute;
                bottom: -40px;

                div {
                    /* Already have account? Log In */
                    width: 209px;
                    height: 17px;
                    // color: rgb(68, 68, 68);
                    color: #7c7c7c;
                    font-family: Inter;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 17px;
                    text-align: center;

                    .sign-up {
                        font-size: 18px;
                        font-weight: 600;
                        color: #333;
                    }
                }
            }

        }

        .others {
            width: 317.4px;
            height: 120px;
            // display: flex;
            // justify-content: center;
            // align-items: center;

            .box {
                margin-top: 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;

            }
        }
    }
}
</style>