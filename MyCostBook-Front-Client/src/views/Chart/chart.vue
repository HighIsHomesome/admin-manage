<script setup>
// highcharts
import Highcahrts from 'highcharts'
import Highcharts3d from 'highcharts/highcharts-3d'
// import exportingInit from 'highcharts/modules/exporting'
import accessibility from 'highcharts/modules/accessibility'
// 组件
import chartbanner from './cpns/chartbanner.vue'
import tabs from './cpns/tabs.vue';
import date from './cpns/date.vue'
import menus from './cpns/menus.vue';
import lineChart from './cpns/lineChart.vue';
import pieChart from './cpns/pieChart.vue'
import top from './cpns/top.vue';
//
// exportingInit(Highcahrts)
Highcharts3d(Highcahrts)
Highcahrts.setOptions({
    accessibility: {
        enabled: false
    },
    chart: {
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)']
            ]
        },
        borderWidth: 0,
        // linear-gradient(180.00deg, rgba(67,136,131,0.3) -28%,rgba(67,136,131,0) 97%)  'rgba(255, 255, 25, 0.1)'
        // plotBackgroundColor: 'rgba(67,136,131,0.9)',
        plotBackgroundColor: '#ffffff',

        plotShadow: false,
        plotBorderWidth: 0
    }
});

</script>

<template>
    <div class="pageChart">
        <chartbanner />
        <tabs />
        <date />
        <lineChart />
        <menus />
        <pieChart />
        <top />
    </div>
</template>

<style lang="less" scoped>
.pageChart {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    background: linear-gradient(180.00deg, rgba(67, 136, 131, 0.3) -28%, rgba(67, 136, 131, 0) 97%);
    margin-bottom: 60px;
}
</style>