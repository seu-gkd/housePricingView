import Vue from 'vue'
import Router from 'vue-router'


import heat from '@/components/buildingInfo/heat.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'heat',
    component: heat,
    children: []
  },
    {
      path: '/userInfo',
      name: 'information',
      component: heat,
      children: []
    },
  ],


  history: true
})
