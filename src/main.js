import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores/store'

// Import i18n
import i18n from './plugins/i18n'

// Import Vue Charts
import 'chart.js'
import 'hchs-vue-charts'

// Import Libs
import '../theme/index.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'
import PortalVue from 'portal-vue'
import VueClipboard from 'vue-clipboard2'
import FlagIcon from 'vue-flag-icon'

// Config
Vue.config.productionTip = false
Vue.use(window.VueCharts)
Vue.use(PortalVue)
Vue.use(VueClipboard)
Vue.use(FlagIcon)
locale.use(en)
Vue.use(ElementUI)

// Export Event Bus
export const eventBus = new Vue()

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// Global Base components registration
const requireComponent = require.context(
  './components/base',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
