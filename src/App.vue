<template>
  <div>
    <div class="app-toolbar">
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <router-link :to="link.to">{{ link.name }}</router-link>
        </li>
      </ul>
    </div>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style>
  .vsc-initialized {
    margin: 0 0;
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
      }
    ]
  })
}
</script>