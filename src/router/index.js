import VueRouter from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import Inventar from '@/views/Inventar.vue'
import Settings from '@/views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },

  {
    path: '/inventar',
    name: 'Inventar',
    component: Inventar
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})
