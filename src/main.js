import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ---------非初始依赖-------------
// 1.bootsrap依赖导入
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// 2.全局表单认证插件，因为bootstrap没有默认表单认证功能
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//3. 引入axios请求
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1/"

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// 引入全局样式
import './assets/css/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
