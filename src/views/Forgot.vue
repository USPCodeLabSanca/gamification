<template>
  <q-page padding class="docs-input justify-center">
    <h2>Esqueci minha senha</h2>
    <q-input v-model="email" type="email" float-label="email" ref="email"/>
    
    <q-btn color="primary" text-color="black" label="Enviar" @click="send()"/>
    
  </q-page>
</template>

<style scoped>

h2 {
  margin-top: 20%;
  text-align: center;
  font-family: 'Adventuring';
  color: var(--q-color-dark);
}

button {
  float: right;
  margin-top: 5%;
  font-family: 'Adventuring';
}

.q-input {
  font-family: 'Adventuring';
}

</style>

<script>
import Router from '../router';
import store from '../store';

let forgot_uri = 'http://localhost:3000';

export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    send() {
      let vm = this;
      axios
      .post(forgot_uri + '/api/users/forgot', {
        email: this.email,
      })
      .then(this.redirect)
      .catch(error => {
        console.log('erro' + error)
        if (error.response) {
          if(error.response.status === 400 && error.response.data.error === 'Email not found.') {
            this.$q.notify({
              message: 'E-mail não encontrado',
              icon: 'warning',
              timeout: 3000,
              position: 'top',
              closeBtn: 'X'
            });
            this.email = '';
            this.$refs.email.focus();
          } else if(error.response.status === 400) {
            console.log('erro: ' + error.response.data.error)
            this.$q.notify({
              message: 'Houve um erro ao enviar o e-mail de recuperação de senha, por favor tente novamente',
              icon: 'warning',
              timeout: 3000,
              position: 'top',
              closeBtn: 'X'
            });
          }
        }
      })
        
    },
    redirect() {
      this.$q.notify({
        message: 'Um e-mail de recuperação de senha foi enviado para ' + this.email,
        icon: 'warning',
        timeout: 3000,
        position: 'top',
        closeBtn: 'X'
      });
      //Router.push({name: 'Reset'});
    }
  }
}

</script>