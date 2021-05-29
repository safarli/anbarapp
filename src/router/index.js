import VueRouter from 'vue-router'

import Dashboard from '@/views/Dashboard'
import Inventar from '@/views/Inventar'
import Settings from '@/views/Settings'
import Medaxil from '@/views/Medaxil'
import Login from '@/views/Login'

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
    component: Medaxil
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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})
