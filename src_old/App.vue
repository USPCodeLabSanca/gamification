<template>
  <q-layout>
    <div>
      <div class="app-toolbar">
        <ul>
          <li>
            <q-btn
              flat round dense
              @click="showLeft = !showLeft"
              icon="menu"
            />
          </li>
          <li v-for="(link, index) in links" :key="index">
            <router-link :to="link.to">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
      <q-layout-drawer side="left" v-model="showLeft" :content-style="{'background-color': '#C0C0C0'}">
        <q-list no-border link inset-separator>
          <q-list-header>Essential Links</q-list-header>
          <q-item to="/docs">
            <q-item-side icon="school" />
            <q-item-main label="Docs" sublabel="quasar-framework.org" />
          </q-item>
          <q-item to="/forum">
            <q-item-side icon="record_voice_over" />
            <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
          </q-item>
          <q-item to="/chat">
            <q-item-side icon="chat" />
            <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
          </q-item>
          <q-item to="/twitter">
            <q-item-side icon="rss feed" />
            <q-item-main label="Twitter" sublabel="@quasarframework" />
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
  .vsc-initialized {
    margin: 0 0;
  }

  .q-layout-drawer {
    position: fixed;
    top: 50px;
  }

  .app-toolbar {
    position: fixed;
    z-index: 9001;
    top: 0;
    background-color: gray;
    height: 50px;
    padding-left: 15px;
    width: 100vw;
    backface-visibility: hidden;
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
</style>

<script>
export default {
  data: () => ({
    showLeft: false,
    links: [
      {
        name: 'Home',
        to: '/'
      },
      {
        name: 'Page 1',
        to: '/page-1'
      },
      {
        name: 'Bad Link',
        to: '/random-bad-url'
      },
      {
        name: 'Login Page',
        to: '/login'
      }
    ]
  })
}
</script>