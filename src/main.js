import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/components/index.js'

Vue.config.productionTip = false

function dateFormat(fmt, date) {
    let ret
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
    }
    // console.log(fmt)
    return fmt
}
Vue.filter('timeFordat', (value) => {
    const date = new Date(value)

    return dateFormat('YYYY-mm-dd HH:MM', date)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')