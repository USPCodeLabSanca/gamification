<template>
   <q-layout>
    <div>
      <q-layout-header>
        <div class="app-toolbar">
          <ul>
            <li>
              <q-btn
                flat round dense
                @click="showLeft = !showLeft"
                icon="menu"
                color="white"
              />
            </li>
            <li v-if="isUserLogged">
              <router-link to=/stickers>
                <i class="material-icons navbar">import_contacts</i>
                {{cards.user}}/{{cards.total}} {{windowWidth > 535 ? 'Figurinhas' : ''}}
              </router-link>
            </li>
            <li v-if="isUserLogged">
              <i class="material-icons navbar">monetization_on</i>
              {{points}} {{windowWidth > 360 ? 'Pontos' : ''}}
              <q-progress :percentage="points" color="dark"/>
            </li>
            <li v-if="isUserLogged">
              <router-link to=/packs>
                <i class="material-icons invertStyle navbar">style</i>
                {{packs}} {{windowWidth > 440 ? 'Pacote'+ (packs != 1 ? 's' : '') : ''}}
              </router-link>
            </li>
            <li v-if="!isUserLogged">
              <img src="@/assets/logo.png" class="logo" />
            </li>
          </ul>
        </div>
      </q-layout-header>
      <q-layout-drawer side="left" v-model="showLeft" :content-style="{'background-color': '#e69350'}">
        <q-list no-border highlight link>
          <q-item v-if="!isUserLogged" to="/" exact>
            <q-item-side icon="home" />
            <q-item-main label="Home" />
          </q-item>
          <q-item v-if="!isUserLogged" to="/login">
            <q-item-side icon="person" />
            <q-item-main label="Entrar" />
          </q-item>
          <q-item v-if="!isUserLogged" to="/register">
            <q-item-side icon="person_add" />
            <q-item-main label="Cadastrar" />
          </q-item>
          <q-item v-if="isUserLogged" to="/quests">
            <q-item-side icon="explore" />
            <q-item-main label="Missões" />
          </q-item>
          <q-item v-if="isUserLogged" to="/stickers">
            <q-item-side icon="import_contacts" />
            <q-item-main label="Figurinhas" />
          </q-item>
          <q-item v-if="isUserLogged" to="/packs">
            <q-item-side icon="style" class="invertStyle" />
            <q-item-main label="Pacotes" />
          </q-item>
          <q-item v-if="isUserLogged" to="/trade">
            <q-item-side icon="swap_horizontal_circle" />
            <q-item-main label="Trocas" />
          </q-item>
          <q-item to="/help">
            <q-item-side icon="help" />
            <q-item-main label="Ajuda" />
          </q-item>
          <q-item v-if="isUserLogged" @click.native="logout()">
            <q-item-side icon="exit_to_app" />
            <q-item-main label="Sair" />
          </q-item>
        </q-list>
      </q-layout-drawer>
      <q-page-container>
        <router-view/>
      </q-page-container>
    </div>
  </q-layout>
</template>

<style>
  body {
    height: 100vh;
  }
  .q-layout {
    overflow: hidden;
  }
  .q-layout-drawer {
    position: fixed !important;
    top: 50px !important;
  }
  .q-list {
    padding: 0 0 !important;
  }
  .app-toolbar {
    position: fixed;
    z-index: 9001;
    top: 0;
    background-color: var(--q-color-primary);
    height: 50px;
    padding-left: 15px;
    width: 100vw;
  }
  ul {
    list-style: none;
    display: flex;
    margin: 0 0;
    padding: 0 0;
    height: 100%;
    align-items: center;
  }
  li {
    padding: 0 15px 0 0;
  }
  .q-layout-drawer .q-item-label, li {
    font-family: 'Adventuring';
  }
  li, a {
    text-decoration: none;
    color: white;
  }
  li i {
    color: var(--q-color-dark);
  }
  li a:hover {
    color: var(--q-color-dark);
  }
  .q-item i {
    color: var(--q-color-dark);
  }
  .q-layout-drawer .q-item-label {
    color: white;
  }
  li .material-icons.navbar {
    margin: 0 2px 3px 0;
    font-size: 22px;
  }
  .invertStyle {
    transform: rotate(180deg) scaleX(-1);
  }
  .logo {
    height: 50px;
    position: fixed;
    top: 0;
    left: calc(50% - 34px)
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  import store from '../store';
  export default {
    data: () => ({
      showLeft: false,
      windowWidth: 0
    }),
    computed: mapGetters([
      'isUserLogged',
      'cards',
      'points',
      'packs'
    ]),
    created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
      logout() {
        store.commit('logout');
      }
    }
  };
</script>