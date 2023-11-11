<script setup>
// Vue
const emit = defineEmits(['ShowPopUp:date'])
const props = defineProps({
    select_date: {
        type: String,
        default: ''
    },
})

function click() {
    emit('ShowPopUp:date')
}

</script>

<template>
    <div class="box date">
        <div class="leftBox dateLeft" @click="click">
            <div class="icon"><img src="@/assets/img/cost/date.svg" alt=""></div>
            <span v-html="select_date"></span>
        </div>
    </div>
</template>

<style lang="less" scoped>
.box {
    position: absolute;
    width: 318px;
    height: 50px;
    box-sizing: border-box;
    border: 1px solid #5e10bf;
    box-shadow: 1px 1px 8px #5e10bf;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;

    .leftBox {
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}

img {
    display: block;
    width: 32px;
    height: 32px;
    position: relative;
    top: -2px;
    left: 0px;
    box-shadow: 0px 4px 4px #666;
    border-radius: 16px;

}


.date {
    // padding: 0 15px;
    position: absolute;
    left: 48px;
    top: 300px;
    width: 315px;
    height: 50px;

    .dateLeft {
        span {
            display: block;
            width: 100px;
            height: 17px;
            color: #666666;
            font-size: 14px;
            line-height: 20px;
            margin-left: 15px;
        }

        span::after {
            content: '';
            position: relative;
            left: 8px;
            display: inline-block;
            box-sizing: border-box;
            // background-color: #000;
            width: 10px;
            height: 10px;
            border: 5px transparent solid;
            border-top-color: #888;
            // 
            // transform: rotate();
        }
    }


}
</style>