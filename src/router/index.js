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
  },
  {
    path: '/medaxil',
    name: 'Medaxil',
  },
  {
    path: '/mexaric',
    name: 'Mexaric',
  }
  , {
    path: '/nezaret',
    name: 'Nezaret'
  },
  {
    path: '/cedveller',
    name: 'Cedveller'
  },
  {
    path: '/barcode',
    name: 'Barcode'
  },
  {
    path: '/qrcode',
    name: 'Qrcode'
  },
  {
    path: '/exportexcel',
    name: 'Exportexcel'
  }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})
