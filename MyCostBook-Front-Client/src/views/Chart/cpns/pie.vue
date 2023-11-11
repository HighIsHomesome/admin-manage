<template>
    <div class="container" id="container">
        <div :id="id" :option="option" class="echart-container" style="width:350px;height:400px"></div>
    </div>
</template>

<script setup>
import Highcharts from 'highcharts'
import Highcharts3d from 'highcharts/highcharts-3d'
import { onMounted } from 'vue';
Highcharts3d(Highcharts)

const props = defineProps({
    id: {
        type: String
    },
    //option 是图表的配置数据
    option: {
        type: Object
    }
})
let charts = null

onMounted(() => {
    // 页面加载完成之后再渲染图表
    setOption()
})


const setOption = () => {
    if (charts) {
        charts.destroy()
    }
    charts = Highcharts.chart(props.id, props.option)
    charts.reflow()
}

</script>
   
<style lang="less" scoped>
/* 容器 */
::v-deep.container {
    width: 100%;
    height: 100%;
    background: #043b8c;
    display: flex;
    justify-content: center;
    align-items: center;

    .echart-container {

        width: 100%;
        height: 100%;
    }

    // 去除水印
    .highcharts-credits {
        display: none;
    }
}
</style>