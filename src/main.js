import Vue from 'vue'
import './cube-ui'
import './cube-ui'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  /* eslint-disable no-unused-vars */
  Button,
  Loading,
  Popup,
  Toast,
  Picker,
  Scroll,
  Slide,
  createAPI
} from 'cube-ui'
import SubscribeDialog from '@/components/subscribe-dialog/subscribe-dialog'
createAPI(Vue, SubscribeDialog, [], true)

Vue.use(Button)
Vue.use(Loading)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(Scroll)
Vue.use(Slide)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
