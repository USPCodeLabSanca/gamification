import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import Page1 from '@/views/Page1'
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
          path: '/page-1',
          name: 'Page 1',
          component: Page1
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
