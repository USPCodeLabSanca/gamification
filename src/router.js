import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import Stickers from '@/views/Stickers'
import Login from '@/views/Login'
import Register from '@/views/Register'
import PageNotFound from '@/views/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: '/stickers',
          name: 'Stickers',
          component: Stickers
        },
        {
          path: '/login',
          name: 'Login Page',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
        {
          path: '**',
          name: 'PageNotFound',
          component: PageNotFound
        }
      ]
    }
  ]
})
