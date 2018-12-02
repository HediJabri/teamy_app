import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store'

// Import Vue Charts
import 'chart.js'
import 'hchs-vue-charts'

// Import Libs
import '../theme/index.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/fr'
import VueClipboard from 'vue-clipboard2'
import FlagIcon from 'vue-flag-icon'

// Import i18n
import i18n from './plugins/i18n'

// Config
Vue.config.productionTip = false
Vue.use(window.VueCharts)
Vue.use(ElementUI, { locale })
Vue.use(VueClipboard)
Vue.use(FlagIcon)

// Export Event Bus
export const eventBus = new Vue()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
