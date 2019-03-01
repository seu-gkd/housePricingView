import Vue from 'vue'
import Router from 'vue-router'


import heat from '@/components/buildingInfo/heat.vue'
import Login from '@/components/login&signin/Login.vue'
import SignIn from '@/components/login&signin/SignIn.vue'

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
      }
    ]
  },

  ],
  history: true
})
