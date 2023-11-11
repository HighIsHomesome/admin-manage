import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'

import { trriger } from './constant/directive'
import 'normalize.css'
import './assets/index.css'
import '@/assets/img/fonts/empty/iconfont.css'   //   class=" iconfont "
// 
import HighchartsVue from 'highcharts-vue'
// 
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(HighchartsVue)

app.directive('trriger', trriger)

app.mount('#app')

