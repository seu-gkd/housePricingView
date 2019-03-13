import Vue from 'vue'
import Router from 'vue-router'


import heat from '@/components/buildingInfo/heat.vue'
import Login from '@/components/login&signin/Login.vue'
import SignIn from '@/components/login&signin/SignIn.vue'
import priceAnalysis from '@/components/priceAnalysis/priceAnalysis.vue'
import priceForecast from '@/components/priceForecast/priceForecast.vue'
import userManage from '@/components/userManage/userManage.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'heat',
    component: heat,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/signin',
        name: 'signin',
        component: SignIn
      },
      {
        path: '/priceAnalysis',
        name: 'priceAnalysis',
        component: priceAnalysis
      },
      {
        path: '/priceForecast',
        name: 'priceForecast',
        component: priceForecast
      },
      {
        path: '/userManage',
        name: 'userManage',
        compoment: userManage
      }
    ]
  },

  ],
  history: true
})
