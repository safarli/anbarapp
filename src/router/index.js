import axios from 'axios'
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
import Hesabatlar from '@/views/Hesabatlar'
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
        name: 'Nezaret',
      },
      {
        path: 'hesabatlar',
        name: 'Hesabatlar',
        component: Hesabatlar
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
});

router.beforeEach(async (to, from, next) => {
  // const token = localStorage.getItem('mytoken');
  const token = ""
  let isAuthenticated = true;
  try {
    const { data } = await axios.post('https://anbar.wavevo.com/userauth/verify', {}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    if (data.msg) {
      isAuthenticated = data.msg;
    }
  }
  catch (e) {
    console.log(e);
  }

  console.log(isAuthenticated)

  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  }
  else {
    next()
  }
});
