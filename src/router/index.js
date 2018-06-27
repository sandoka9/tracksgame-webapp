import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Help from '@/components/Help'
import Clues from '@/components/Clues'
import Steps from '@/components/Steps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/AA',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/steps',
      name: 'Steps',
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



