<script setup>
// Vue
import { computed } from 'vue'
// Vant

// Utils

// 组件
import Highcahrts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
HighchartsMore(Highcahrts)
HighchartsDrilldown(Highcahrts);
// Store

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

const typeChartOption = computed(() => ({
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
                format: `<strong style="background-color:transparent;color:#333;font-size:16px">{point.name}</strong>`,
                style: { color: '#333', 'text-decoration': 'none', textOutline: 'none' }
            }
        },
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
        name: 'type',
        // data: [{
        //     name: 'car',
        //     y: 2,
        //     drilldown: 'car',
        // }],
        // data: [['交通', 2],],
        data: props.obj.type_pieArr,
        hoverAnimation: true,
    }],
    drilldown: {
        series: props.obj.drilldown_pieArr
    },
    events: {
        load: function () {
            var each = HighCharts.each,
                points = this.series[0].points
            each(points, function (p) {
                p.graphic.attr({
                    translateY: -p.shapeArgs.ran
                })
                p.graphic.side1.attr({
                    translateY: -p.shapeArgs.ran
                })
                p.graphic.side2.attr({
                    translateY: -p.shapeArgs.ran
                })
            })
        }
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
const CategoryChartOption = computed(() => ({
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
            innerSize: 100,
            depth: 30, // 图表的全深比，即为3D图X，Y轴的平面点固定，以图的Z轴原点为起始点,
            borderColor: 'transparent',
            colors: ['#429690', '#19d9d8', '#45606b', '#39a3a5', '#2e7c7d', '#3fa9f5', '#47c4b3', '#ace1e1 '],
            dataLabels: {
                enabled: true,
                format: `<strong style="background-color:transparent;color:#333;font-size:16px">{point.name}</strong>`,
                style: { color: '#333', 'text-decoration': 'none', textOutline: 'none' }
            }
        },
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [{
        data: props.obj.category_pieArr,
        hoverAnimation: true,
    }],
    events: {
        load: function () {
            var each = HighCharts.each,
                points = this.series[0].points
            each(points, function (p) {
                p.graphic.attr({
                    translateY: -p.shapeArgs.ran
                })
                p.graphic.side1.attr({
                    translateY: -p.shapeArgs.ran
                })
                p.graphic.side2.attr({
                    translateY: -p.shapeArgs.ran
                })
            })
        }
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
const chartOption = computed(() => {
    if (props.TypeOrCategory == 'type_') {
        return typeChartOption.value
    }
    else if (props.TypeOrCategory == 'category_') {
        return CategoryChartOption.value
    }
})
// 
Highcahrts.getOptions().colors.map(color => ({
    linearGradient: {
        cx: 0.5, cy: 0.3, r: 0.7
    },
    stops: [
        [0, color],
        [1, Highcahrts.Color(color).brighten(-0.3).get('rgb')] // darken
    ]
}))
/**
* function
*/


</script>

<template>
    <div class="pie">
        <highcharts :options="chartOption" style="width:380px;height:350px"></highcharts>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pie {
    margin-top: 15%;
    .flex();
}
</style>