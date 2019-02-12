import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from '@/layouts/Default.vue';
import Home from '@/views/Home.vue';
import Quests from '@/views/Quests.vue';
import Stickers from '@/views/Stickers';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Help from '@/views/Help';
import PageNotFound from '@/views/PageNotFound';

Vue.use(Router);

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
          path: '/quests',
          name: 'Missões',
          component: Quests
        },
        {
          path: '/stickers',
          name: 'Figurinhas',
          component: Stickers
        },
        {
          path: '/login',
          name: 'Entrar',
          component: Login
        },
        {
          path: '/register',
          name: 'Cadastrar',
          component: Register
        },
        {
          path: '/help',
          name: 'Ajuda',
          component: Help
        },
        {
          path: '**',
          name: 'PageNotFound',
          component: PageNotFound
        }
      ]
    }
  ]
});
