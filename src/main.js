import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
import { router } from './router'
import { ValidationProvider } from 'vee-validate'

import MyCard from '@/components/MyCard.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)

Vue.component('my-card', MyCard)
Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
