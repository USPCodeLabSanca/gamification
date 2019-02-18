<template>
  <q-page padding class="docs-input justify-center">
    <p>A gamificação da semana de recepção foi desenvolvida por</p>
    <a href="https://www.fog.icmc.usp.br/"> 
    <img src="../assets/fog.jpg" class="responsive" height="60%" width="60%">
    </a>
    <p>O aplicativo BixoQuest foi desenvolvido por</p>
    <a href="https://www.facebook.com/uspcodelabsanca/">
    <img src="../assets/codelab.png" class="responsive">
    </a>
  </q-page>
</template>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

p {
    margin-top: 15%;
    text-align: center;
    font-family: 'Adventuring';
    font-size: 4vh;
    color: var(--q-color-dark);
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