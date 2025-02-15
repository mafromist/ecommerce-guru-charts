import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Highcharts from 'highcharts';
import HighChartsVue from 'highcharts-vue'
import './index.css'

createApp(App)
.use(router)
.use(store)
.use(HighChartsVue)
.mount('#app')

