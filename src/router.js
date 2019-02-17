import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from '@/layouts/Default.vue';
import Home from '@/views/Home.vue';
import Quests from '@/views/Quests.vue';
import Stickers from '@/views/Stickers';
import Packs from '@/views/Packs';
import Trade from '@/views/Trade';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Help from '@/views/Help';
import Forgot from '@/views/Forgot'
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
          path: '/packs',
          name: 'Pacotes',
          component: Packs
        },
        {
          path: '/trade',
          name: 'Trocas',
          component: Trade
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
          path: '/login/forgot',
          name: 'Forgot',
          component: Forgot
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
