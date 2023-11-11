import { computed } from 'vue'

import { defineStore } from "pinia";

import { exp_Exp_Inc_Trf } from "@/service/models/chart";

const store = {
    state() {
        return {
            menu: ['Exp', 'Inc', 'Trf'],  // Exp、Inc、Trf
            current_menu: 'Exp',
            tab: ['Day', 'Week', 'Month', 'Year'],    // Year Month Week Day
            current_tab: 'Month',
            current_dateIndex: 0,
            /**
             * 渲染data[menu.value]
             *     data[menu.value].tab.value
             *     data[menu.value].tab.value.time
             */
            data: {
                Exp: {
                    nowTime: { Year: '2023', Month: 'February', Week: 'Fifth Week', Day: 'Monday' },  //由后端取每个时间最后一个元素的值生成
                    Year: {},
                    Month: {},
                    Week: {},
                    Day: {},
                },
                Inc: {
                    nowTime: { Year: '2023', Month: 'February', Week: 'Fifth Week', Day: 'Monday' },  //由后端取每个时间最后一个元素的值生成
                    Year: { time: ['2022', '2023', '2024'], },
                    Month: {
                        time: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    },
                    Week: { time: ['First Week', 'Second Week', 'Third Week', 'Four Week', 'Fifth Week'] },
                    Day: { time: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
                },
                Trf: {
                    nowTime: { Year: '2023', Month: 'February', Week: 'Fifth Week', Day: 'Monday' },  //由后端取每个时间最后一个元素的值生成
                    Year: { time: ['2022', '2023', '2024'], },
                    Month: {
                        time: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    },
                    Week: { time: ['First Week', 'Second Week', 'Third Week', 'Four Week', 'Fifth Week'] },
                    Day: { time: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
                },
            }
        }
    },
    getters: {},
    actions: {
        async get_Exp_Data() {
            const res = await exp_Exp_Inc_Trf()
            if (res && res.code == 200) {
                // console.log(year.data, month.data, week.data, day.data);
                this.data = res.data
                return true
            }
            else if (res.code == 500) { }
            else { }
        }
    },

}
const useChartStore = defineStore('Chart', store)

export default useChartStore