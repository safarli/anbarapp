import VueRouter from 'vue-router'

import AppMain from '@/views/AppMain'
import Dashboard from '@/views/Dashboard'
import Inventar from '@/views/Inventar'
import Settings from '@/views/Settings'
import Medaxil from '@/views/Medaxil'
import Mexaric from '@/views/Mexaric'
import EditMehsulTipleri from '@/views/EditMehsulTipleri'
import EditSaticilar from '@/views/EditSaticilar'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'


// 1st checks root paths children routes if not find goes to check other routes

const routes = [
  {
    path: '/',
    name: 'AppMain',
    component: AppMain,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'inventar',
        name: 'Inventar',
        component: Inventar
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: 'medaxil',
        name: 'Medaxil',
        component: Medaxil
      },
      {
        path: 'mexaric',
        name: 'Mexaric',
        component: Mexaric
      },
      {
        path: 'editmehsultipleri',
        name: 'EditMehsulTipleri',
        component: EditMehsulTipleri
      },
      {
        path: 'editsaticilar',
        name: 'EditSaticilar',
        component: EditSaticilar
      }
      , {
        path: 'nezaret',
        name: 'Nezaret'
      },
      {
        path: 'cedveller',
        name: 'Cedveller'
      },
      {
        path: 'barcode',
        name: 'Barcode'
      },
      {
        path: 'qrcode',
        name: 'Qrcode'
      },
      {
        path: 'exportexcel',
        name: 'Exportexcel'
      },
      {
        path: '',
        redirect: 'dashboard'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  next();
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   if (!auth.loggedIn()) {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     })
  //   } else {
  //     next()
  //   }
  // } else {
  //   next() // make sure to always call next()!
  // }
})
