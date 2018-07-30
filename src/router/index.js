/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Help from '@/components/Help'
import Clues from '@/components/Clues'
import Steps from '@/components/Steps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/steps/:gameId',
      name: 'Steps',
      props: true,
      component: Steps
    },
    {
      path: '/clues',
      name: 'Clues',
      component: Clues
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    }
  ]
})
