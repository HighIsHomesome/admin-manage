<!-- <script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// Hooks
import useSocket from '@/hooks/useSocket'

const socket = useSocket(handlerConnect, handlerRes)
const router = useRouter()

const res = ref('等待接受消息')
const value = ref()
const message = ref([])

/**
* function
*/
function handlerConnect() {
    const id = socket.id;

    console.log('#connect,', id, socket);

    socket.emit('chat', 'hello socket')

    socket.on(id, (msg) => {
        console.warn('#watch_Id,', msg);
    });

}

function handlerRes(data) {

    console.log('#res,', data)
    if (data.bookList) {
        console.group('Mysql')
        console.log('🔥');
        console.log(data.bookList);
        console.log('🔥');
        console.groupEnd('Mysql')
    }
    setTimeout(() => {
        res.value = data.room
        message.value.push({
            user: data.user,
            message: data.message
        })
    }, 1000);

}

function change() {
    console.log(value.value);
    socket.emit('chat', value.value)
    value.value = undefined
}

const x = ref(0)

function onMousemove(e) {
    x.value = e.clientX
}
</script>

<template>
    <div class="webSocket">
        <button @click="socket.connect();">重新连接</button>
        <div class="res">
            <h1>{{ res }}</h1>
        </div>
        <div class="list">
            <template v-for="(item, index) in message">
                <div class="flex">
                    <h3 class="user">{{ item.user }}</h3>
                    <div class="message">{{ item.message }}</div>
                </div>
            </template>
        </div>
        <input @mousemove="onMousemove" :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }" class="movearea" v-model="value"
            @change="change" type="text">
        <button @click="socket.disconnect();">断开连接</button>
        <button @click="router.back();">返回</button>
    </div>
</template>

<style lang="less" scoped>
.movearea {
    transition: 0.3s background-color ease;
}

.webSocket {
    display: grid;
    width: 100%;
    height: 300px;

    input {
        place-self: center;
        margin-top: 50px;
        width: 80%;
        height: 40px;
        border: 0;
        border-radius: 12px;
        background-color: #bfbfbfAA;
    }
}

button {
    margin-top: 15px;
}

.webSocket * {
    place-self: center;
    display: grid;

    .list {
        align-self: self-start;
        overflow-y: auto;
    }
}
</style> -->