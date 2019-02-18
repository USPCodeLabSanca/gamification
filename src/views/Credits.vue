<template>
  <div class="credits">
    <p>O aplicativo BixoQuest foi desenvolvido por</p>
    <a href="https://www.facebook.com/uspcodelabsanca/">
      <img src="../assets/codelab.png" style="height: 10vh">
    </a>
    <p>A gamificação da semana de recepção foi desenvolvida por</p>
    <a href="https://www.fog.icmc.usp.br/"> 
      <img src="../assets/fog.jpg" style="height: 40vh">
    </a>
  </div>
</template>

<style scoped>
.credits {
  margin-top: 50px;
  padding-top: 5vh;
  padding-bottom: 5vh;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

p {
    text-align: center;
    font-family: 'Adventuring';
    font-size: 3vh;
    color: var(--q-color-dark);
    margin: 0;
}

</style>

<script>

import Router from '../router';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isLogged: false
    }
  },
  computed: mapGetters([
      'isUserLogged',
   ]),
  methods: {
    login() {
      Router.push({name: 'Entrar'});
    },
    register() {
      Router.push({name: 'Cadastrar'});
    },
  }
}
</script>