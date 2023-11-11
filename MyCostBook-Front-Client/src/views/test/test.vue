<script setup>
// Vue
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, onBeforeMount, onUpdated, toRaw, getCurrentInstance } from 'vue'
// Vant

// Utils
// 组件
// import observer from './cpns/observer.vue'
import infiniteScroll from './cpns/infiniteScroll.vue'
import ws from './cpns/websocket.vue'

// import IntersectionObserver from './cpns/IntersectionObserver.vue';
// Store

/**
* var
*/
const imgbase64 = ref()
let file_obj = {}
let precentage = ref(0)
//
// 生成文件切片
const SIZE = 10 * 1024 * 1024; // 切片大小
function createFileChunk(file, size = SIZE) {
    const fileChunkList = [];
    let cur = 0;
    while (cur < file.size) {
        // slice : Array、String、Blob、ArrayBuffer、TypedArray
        fileChunkList.push({ file: file.slice(cur, cur + size) });
        cur += size;
    }
    return fileChunkList;
}
function afterRead(file) {
    // 此时可以自行将文件上传至服务器
    const res = file.file
    console.log(res);
    // console.log(file.file.name, file.file.size);
    const blob = new Blob([file])
    console.log(blob);
    // const slice_file = createFileChunk(file, SIZE)
    // console.log(slice_file);
};

function fileChange(e) {
    file_obj = e.target.files[0]
    /** 预览*/
    const fr = new FileReader()
    fr.readAsDataURL(file_obj)
    fr.onload = function () {
        imgbase64.value = fr.result
    }
    /** 切片*/
    // 
    // function sliceRender(file) {
    //     const _file = file
    //     const count = 1
    //     let start = 0
    //     let size = 10 * 1024
    //     return function renderPicture() {
    //         const _slicBlob = new Blob([_file]).slice(start, size)
    //         const fr = new FileReader()
    //         fr.readAsDataURL(_slicBlob)
    //         fr.onload = function () {
    //             imgbase64.value = fr.result
    //         }
    //         start = start + size
    //         size += size
    //     }
    // }
    // const renderPicture = sliceRender(file)
    // renderPicture()
}
function submit() {
    let size = 2 * 1024 * 1024
    let Entirely_Size = file_obj.size
    let current_point = 0
    console.log('submit', Entirely_Size);
    while (current_point < Entirely_Size) {
        var formData = new FormData();
        formData.append("username", "Groucho");
        formData.append("accountnum", 123456);
        // formdata.append('Picturename', file_obj.slice(current_point, current_point + size))
        // // 网络请求
        current_point += size
        precentage.value = (current_point / Entirely_Size) * 100 >= 100 ? 100 : (current_point / Entirely_Size) * 100
        /** Vue更新状态是异步的 */
        console.log(formData);
    }
}
</script>

<template>
    <div class="tset">
        <!-- websocket -->
        <ws />
        <!-- 文件上传 -->
        <!-- <div class="loadup">
                <h1>Uploader</h1>
                <div class="load">
                    <van-uploader :after-read="afterRead" />
                </div>
                <div class="loading">
                    <input @change="fileChange" type="file" name="file" id="file" />
                    <img style="position: relative;left: 30px; width: 200px;" :src="imgbase64" alt="">
                    <button @click="submit">提交</button>
                    <h4>{{ precentage }}%</h4>
                </div>
                </div> -->
        <br><br><br><br>
        <!-- <hr> -->
        <!-- 观察者 -->
        <!-- <IntersectionObserver /> -->
        <!-- 无限滚动 -->
        <br><br><br><br>
        <!-- <hr> -->
        <!-- <infiniteScroll /> -->
    </div>
</template>

<style lang="less" scoped>
.tset {
    .loadup {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .load {
            width: 300px;
            height: 200px;
            background-color: antiquewhite;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .loading {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>