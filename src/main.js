import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store'

// Vue Charts
import 'chart.js'
import 'hchs-vue-charts'

// Import Libs
import '../theme/index.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/fr'
import VueClipboard from 'vue-clipboard2'

// Config
Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueClipboard)
Vue.use(window.VueCharts)

// Export Event Bus
export const eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
