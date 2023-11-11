<script setup>
// vue
import { computed } from 'vue'
// 图表
import Highcahrts from 'highcharts'
// Store
import useChartStore from '@/stores/modules/chart';
import { storeToRefs } from 'pinia';
const chartStore = useChartStore()
const { current_menu, data, current_tab, current_dateIndex } = storeToRefs(chartStore)

const date_arr = computed(() => {
    return data.value[current_menu.value][current_tab.value].time  // 后端返回可选择的日期（用户有账单记录的）
})

const current_key = computed(() => {
    return date_arr.value[current_dateIndex.value]
})

const pie_obj = computed(() => {
    return data.value[current_menu.value][current_tab.value].pie_obj
})
const pie_array = computed(() => {
    return pie_obj.value[current_key.value]
})

//
const chartOption2 = computed(() => ({
    caption: {
        // text: '<b>The caption renders in the bottom, and is part of the exported chart.</b>'
    },
    accessibility: {
        enabled: false
    },
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 50,   //内旋角度
            beta: 0,     //外旋角度
            frame: {                // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
                // 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
                // side、bac属性一样，其中size为感官理解的厚度，color为面板颜色
                bottom: {
                    size: 1,
                    color: 'transparent'
                },
                side: {
                    size: 1,
                    color: 'transparent'
                },
                back: {
                    size: 1,
                    color: 'transparent'
                }
            }
        },
        backgroundColor: 'rgba(255, 255, 255, 0)',
        plotBorderColor: null,
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: null,
        plotShadow: false,
    },
    credits: {
        enabled: false,                    // 默认值，如果想去掉版权信息，设置为false即可
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            innerSize: 100,
            depth: 30, // 图表的全深比，即为3D图X，Y轴的平面点固定，以图的Z轴原点为起始点,
            borderColor: 'transparent',
            colors: ['#429690', '#19d9d8', '#45606b', '#39a3a5', '#2e7c7d', '#3fa9f5', '#47c4b3', '#ace1e1 '],
            dataLabels: {
                enabled: true,
                // 通过 format 或 formatter 来格式化数据标签显示
                // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                format: `<strong style="background-color:transparent;color:#333;font-size:16px">{point.name}</strong>`,
                // formatter: function () {
                //     //this 为当前的点（扇区）对象，可以通过  console.log(this) 来查看详细信息
                //     return this.name + '，占比' + this.percentage + '%</span>';
                // }
                style: { textOutline: 'none' }
            }
        },
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
        name: '货物金额',
        data: pie_array.value,
        hoverAnimation: true,
    }],
    events: {
        // load: function () {
        //     var each = HighCharts.each,
        //         points = this.series[0].points
        //     each(points, function (p) {
        //         p.graphic.attr({
        //             translateY: -p.shapeArgs.ran
        //         })
        //         p.graphic.side1.attr({
        //             translateY: -p.shapeArgs.ran
        //         })
        //         p.graphic.side2.attr({
        //             translateY: -p.shapeArgs.ran
        //         })
        //     })
        // }
    },
    options3d: {
        enabled: true,
        alpha: 65,
        beta: 0, //图表视图旋转角度
        viewDistance: 40 //定义图表的浏览长度
    },
    point: {                  // 每个扇区是数据点对象，所以事件应该写在 point 下面
        events: {
            // 鼠标滑过是，突出当前扇区
            mouseOver: function () {
                this.slice();
            },
            // 鼠标移出时，收回突出显示
            mouseOut: function () {
                this.slice();
            },
            // 默认是点击突出，这里屏蔽掉
            click: function () {
                return false;
            }
        }
    }
}))
Highcahrts.getOptions().colors.map(color => ({
    linearGradient: {
        cx: 0.5, cy: 0.3, r: 0.7
    },
    stops: [
        [0, color],
        [1, Highcahrts.Color(color).brighten(-0.3).get('rgb')] // darken
    ]
}))
</script>

<template>
    <div class="pie" v-if="pie_obj !== {}">
        <highcharts :options="chartOption2" style="width:380px;height:350px"></highcharts>
    </div>
</template>

<style lang="less" scoped>
.pie {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>