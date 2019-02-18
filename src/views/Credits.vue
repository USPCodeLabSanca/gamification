<template>
  <q-page padding class="docs-input justify-center">
    <p>Esse aplicativo foi desenvolvido pelos grupos</p>
    <img src="../assets/fog.jpg" class="responsive" height="70%" width="70%">
    <img src="../assets/codelab.png" class="responsive">
  </q-page>
</template>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

p {
    margin-top: 20%;
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