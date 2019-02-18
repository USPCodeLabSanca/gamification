<template>
  <q-page padding class="docs-input justify-center">
    <img src="../assets/logo2.png" class="responsive" style="margin-top: 20%">
    <img src="../assets/porco.png" class="responsive">
    <br/>
    <q-btn color="primary" label="Login" @click="login()" v-if="!isUserLogged"/>
    <q-btn style="float: left" color="white" text-color="black" label="Cadastre-se" @click="register()" v-if="!isUserLogged"/>
  </q-page>
</template>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}

button {
  float: right;
  margin-top: 5%; 
  font-family: 'Adventuring';
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
    getImg() {
      return require("../assets/porco.png");
    }
  }
}
</script>