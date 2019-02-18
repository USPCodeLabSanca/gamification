<template>
  <div class="home">
    <img src="../assets/logo2.png" style="height: 10vh; max-width: 90vw;" >
    <img src="../assets/porco.png"  style="height: 50vh; max-width: 90vw;">
    <br/>
    <div class="home-horizontal" v-if="!isUserLogged" >
      <q-btn color="primary" label="Login" @click="login()" />
      <q-btn style="float: left" color="white" text-color="black" label="Cadastre-se" @click="register()"/>
    </div>
  </div>
</template>

<style scoped>
.home {
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
button {
  float: right;
  margin-top: 5%; 
  font-family: 'Adventuring';
}
.home-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

</style>

<script>

import Router from '../router';
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters([
      'isUserLogged',
   ]),
  methods: {
    login() {
      Router.push({name: 'Entrar'});
    },
    register() {
      Router.push({name: 'Cadastrar'});
    }
  }
}
</script>