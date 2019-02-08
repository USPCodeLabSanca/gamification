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
              />
            </li>
            <li v-if="isUserLogged">
              <router-link to=/stickers>
                <i class="material-icons invertStyle navbar">style</i>
                {{cards.user}}/{{cards.total}} {{windowWidth > 350 ? 'Figurinhas' : ''}}
              </router-link>
            </li>
            <li v-if="isUserLogged">
              <router-link to=/points>
                <i class="material-icons navbar">stars</i>
                {{points}} Pontos
                <q-progress :percentage="points" />
              </router-link>
            </li>
            <li v-if="!isUserLogged">
              <img src="@/assets/logo.png" class="logo" />
            </li>
          </ul>
        </div>
      </q-layout-header>
      <q-layout-drawer side="left" v-model="showLeft" :content-style="{'background-color': '#C0C0C0'}">
        <q-list no-border link>
          <q-item to="/">
            <q-item-side icon="home" />
            <q-item-main label="Home" />
          </q-item>
          <q-item v-if="isUserLogged" to="/stickers">
            <q-item-side icon="style" class="invertStyle" />
            <q-item-main label="Figurinhas" />
          </q-item>
          <q-item v-if="isUserLogged" to="/points">
            <q-item-side icon="stars" />
            <q-item-main label="Pontos" />
          </q-item>
          <q-item v-if="!isUserLogged" to="/login">
            <q-item-side icon="person" />
            <q-item-main label="Login" />
          </q-item>
          <q-item to="**">
            <q-item-side icon="report_problem" />
            <q-item-main label="Page Not Found" />
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
  body, #q-app {
    height: 100vh;
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
    background-color: gray;
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
  li a {
    text-decoration: none;
    color: black;
  }
  li a:hover {
    color: #404040;
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
  export default {
    data: () => ({
      showLeft: false,
      windowWidth: 0
    }),
    computed: mapGetters([
      'isUserLogged',
      'cards',
      'points'
    ]),
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
      }
    }
  };
</script>