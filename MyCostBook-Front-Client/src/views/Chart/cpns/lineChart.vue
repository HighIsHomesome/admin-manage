<script setup>
// Vue
import { computed } from 'vue'
// 组件
import empty from '@/components/empty.vue';
// Store
import useChartStore from '@/stores/modules/chart';
import { storeToRefs } from 'pinia';
const chartStore = useChartStore()
const { data, current_tab, current_menu } = storeToRefs(chartStore)
//
const line_array = computed(() => {
    return data.value[current_menu.value][current_tab.value].line_array
})
const categories = computed(() => {
    return data.value[current_menu.value][current_tab.value].time
})
const isEmpty = computed(() => {
    if (line_array.value.length == 0 && Object.prototype.toString.call(line_array.value) == '[object Array]') return true
})


const chartOptions = computed(() => ({
    accessibility: {
        enabled: false
    },
    credits: {
        enabled: false,                    // 默认值，如果想去掉版权信息，设置为false即可
    },
    chart: {
        type: 'areaspline',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        plotBorderColor: null,
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: null,
        plotShadow: false,
    },
    title: {
        text: ''
    },
    legend: {
        show: false,
    },
    Axis: {
        toValue: true,
    },
    xAxis: {
        title: null,
        labels: {
            // enabled: false

        },
        tickLength: 0,
        tickWidth: 0,
        lineWidth: 0,
        tickColor: '#ffffff',
        gridLineWidth: 0,
        // visible: false,
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] //
        // categories: ["2022-12", "2023-01", "This Month"]
        categories: categories.value,
    },
    yAxis: {
        title: null,
        labels: {
            enabled: false
        },
    },
    point: {
        visible: false,
        areaspline: {
            marker: {
                enabled: false,
                radius: 4,
                lineColor: '#d0e1e0',
            },
        }

    },
    tooltip: {
        backgroundColor: '#F3F3F3',
        borderColor: '#89b4b1',
        borderWidth: '1px',
        borderRadius: 15,
        shadow: false,
        hideDelay: 50,
        style: {
            color: '#438883',
            'font-weight': 700,
            'text-align': 'center',
        },
        formatter() {
            console.log(this);
            return '$' + String(this.y).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        data: line_array.value,
        showInLegend: false // 设置为 false 即为不显示在图例中
    }],
    colors: ['#438883', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
        '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
}))

</script>

<template>
    <div class="chart">
        <highcharts id="linechart" v-if="!isEmpty" :options="chartOptions" style="width:380px;height:200px">
        </highcharts>
        <div v-else-if="isEmpty" class="lineChart-empty">
            <empty>
                <template #icon>
                    <div class="iconfont icon-queshengye_zanwudongtai"></div>
                </template>
            </empty>
        </div>
    </div>
</template>

<style lang="less" scoped>
.chart {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 400px;
    height: 200px;

    .lineChart-empty {
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>