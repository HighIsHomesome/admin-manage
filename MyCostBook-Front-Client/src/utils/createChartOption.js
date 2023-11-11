import { computed } from 'vue'

const tansparent = {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    plotBorderColor: null,
    plotBackgroundColor: null,
    plotBackgroundImage: null,
    plotBorderWidth: null,
    plotShadow: false,
}

const BaseConfig = {
    caption: {
        // text: '<b>The caption renders in the bottom, and is part of the exported chart.</b>'
    },
    accessibility: {
        enabled: false
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
    },
    legend: {
        show: false,
    },
}

function createpieChartOption(seriesData,) {
    const chartOption = computed(() => ({
        /**
         * 配置项
         */
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
            ...tansparent,
        },
        series: [{
            name: '货物金额',
            data: seriesData,
            hoverAnimation: true,
        }],
        /**
         * 常数项
         */
        ...BaseConfig,
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
        options3d: {
            enabled: true,
            alpha: 65,
            beta: 0, //图表视图旋转角度
            viewDistance: 40 //定义图表的浏览长度
        },
    }))
    return { chartOption }
}
export function createLineChartOption() {
    const chartOption = computed((seriesData) => ({
        chart: {
            type: 'areaspline',
            ...tansparent,
        },
        Axis: {
            toValue: true,
        },
        xAxis: {
            title: null,
            labels: {
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
            data: seriesData,
            showInLegend: false // 设置为 false 即为不显示在图例中
        }],
        colors: ['#438883', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
            '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
    }))
    return { chartOption }
}

export default createpieChartOption