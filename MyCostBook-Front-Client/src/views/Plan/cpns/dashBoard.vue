<script setup>
// Vue
import { ref, computed, onMounted, } from 'vue'
// Utils
import { createURLObj } from '@/utils/URLSearchParams';
// 组件
import myDialog from '@/components/dialog.vue'
// 最主要是这里模块的引入 很坑 
// import Highcharts from 'highcharts/highstock';
import Highcahrts from 'highcharts'
// 这个一定要引入 不然报错
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js'
/**
 * Store
 */
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main';
const { user } = storeToRefs(useMainStore())

// 
HighchartsMore(Highcahrts)
SolidGauge(Highcahrts);
/**
* var
*/
const Ref_highCharts = ref()
// console.log(user.value.userInfo.budget, user.value.userInfo.budget);
// console.log(user.value.userInfo.current_budget, user.value.userInfo.current_budget);

const max = computed({
    get() {
        return user.value.userInfo.budget
    },
    set(value) {
        user.value.userInfo.budget = value
    }
})


let chart = ref()
onMounted(() => {
    const chartOptions = {
        chart: {
            backgroundColor: '#bdd1cf',
            type: 'solidgauge',
            backgroundColor: 'rgba(255, 255, 255, 0)',
            plotBorderColor: null,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: null,
        pane: {
            center: ['50%', '70%'],
            size: '90%',
            startAngle: -90,        //起点
            endAngle: 90,           //终点
            background: {
                backgroundColor: (Highcahrts.theme && Highcahrts.theme.background2) || '#8f9f9daa',   //灰色进度条背景
                borderWidth: 0,     //没啥用
                innerRadius: '80%', //内圈半径
                outerRadius: '100%',//外圈半径
                shape: 'arc'        //拱形
            }
        },
        tooltip: {  // 点击后显示
            enabled: false
        },
        yAxis: {
            min: 0,
            // 👇
            max: max.value,
            // max: max.value,
            // title: { text: '预算', },
            stops: [
                [0.2, '#62e2bc'], // red
                [0.8, '#92c4c0'], // yellow
                [0.9, '#15888f'] // green
                // [0.9, '#55BF3B'] // green
            ],
            lineWidth: 0,
            // minorTickInterval: 'auto',
            tickPixelInterval: 100,
            tickWidth: 5,
            tickPosition: 'outside',
            labels: {
                y: 10,
                distance: -50,
                style: {
                    color: '#555d6c',
                    fontSize: '12px',
                }
            }
        },
        plotOptions: {
            solidgauge: {
                animation: {
                    duration: 500,
                },
                cursor: 'pointer',
                dataLabels: {
                    y: -35,
                    borderWidth: 5,
                    useHTML: true,
                },
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '本月支出',
            data: [user.value.userInfo.current_budget],
            innerRadius: 80,
            // dataLabels: {
            //     useHTML: true,
            //     format: '<div style="text-align:center;border:0;outline:none;"><span span style="font-size:25px;color:' +
            //         ('black') + '"><span style="font-size:12px;color:#777777"></span>{y:.1f}</span>' +
            //         '</div>',
            // },
            tooltip: {
                valueSuffix: '元'
            }
        }]
    }

    chart.value = Highcahrts.chart('container', chartOptions)
    // chart.value.redraw()
})
/**
* function
*/
// 点击按钮 set预算
const title = ref('Set Budget')
const amount = ref()

const show = ref(false);
const popup = () => {
    show.value = true
    if (user.value.userInfo.budget) {
        amount.value = user.value.userInfo.budget
    }
}
const Close = (action) => {
    if (action == 'cancel') {
        show.value = false
        return
    }
    if (action == 'confirm' && !amount.value) {
        title.value = '金额不可为空'
        setTimeout(() => {
            title.value = 'Set Budget'
        }, 1500)
    }
    else if (action == 'confirm') {
        const set_budget_info = createURLObj({ budget: amount.value })
        //
        planStore.Post_set_budget(set_budget_info)
            .then(res => {
                user.value.userInfo.budget = amount.value //修改用户预算
                if (amount == 0) { user.value.userInfo.current_budget = 0 }
                // 修改图表
                const two = Number(amount.value)   //需要用Number包装
                chart.value.yAxis[0].update({ max: two });
                chart.value.series[0].setData([user.value.userInfo.current_budget])
                // console.log(toRaw(chart.value.yAxis[0].max));
                // 关闭对话框
                show.value = false
            })
    }
}
const default_placeholder = computed(() => {
    return `￥${user.value.userInfo.budget} /月`
})

</script>
<template>
    <div class="dashBoard">
        <div class="box">
            <div class="chart" id="container" ref="Ref_highCharts"></div>
            <div class="text" @click="popup"><span>本月预算</span></div>
        </div>
        <myDialog @update:amount="newV => amount = newV" :title=title :show="show"
            :default_placeholder="default_placeholder" :Close="Close" />
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.dashBoard {
    .flex();
    flex-direction: column;
    margin-top: 10px;

    .box {
        .flex();
        position: relative;
        width: 90vw;
        height: 27vh;
        margin-top: 10px;
        border-radius: 24px;
        border: 1px solid #ffffffAA;
        box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.4);
        background-color: rgba(0, 0, 0, 0.05);

        .text {
            position: absolute;
            top: 5px;
            right: 12px;
            padding: 2px 6px;
            margin-top: 10px;
            font-size: 16px;
            font-weight: 700;
            color: #333;
            background-color: #ecdb72;
            border-radius: 12px;
        }
    }

    .chart {
        position: absolute;
        padding-top: 45px;
        border-radius: 24px;
    }
}
</style>