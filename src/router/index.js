/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import DetailsGame from '@/components/DetailsGame'
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
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/detailsGame',
      name: 'DetailsGame',
      component: DetailsGame
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
