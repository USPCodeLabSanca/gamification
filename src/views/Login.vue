<template>
  <q-page padding class="docs-input justify-center">
    <h2>Login</h2>
    <q-input v-model="credentials.email" type="email" float-label="email" ref="email"/>
    <q-input v-model="credentials.password" type="password" float-label="senha" ref="password"/>
    <q-btn color="primary" label="Entrar" @click="submit()"/>
    
    <q-btn style="float: left" color="white" text-color="black" label="Cadastre-se" @click="register()"/>
    <q-btn style="float: left" text-color="black" label="Esqueci minha senha" @click="forgot()"/>
    
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
import hashjs from 'hash.js';


let auth_uri = 'http://' + process.env.BACK_URI;

export default {
  data() {
    return {
        credentials: {
            email: '',
            password: '',
            token: '',
        }
    }
  },
  methods: {
    register() {
      Router.push({name: 'Cadastrar'});
    },
    login(response) {
      this.credentials.token = response.data.token;
      store.commit('login', response.data);
      Router.push({name: 'Home'});
    },
    async submit() {
      let hash = hashjs.sha256().update(this.credentials.password).digest('hex')
      console.log(hash)
      axios
      .post(auth_uri + '/api/users/auth', {
        email: this.credentials.email,
        password: hash
      })
      .then(response => (this.login(response)))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log('response: ' + error.response.data.error)
          if (error.response.data.error === "Email not found.") {
            alert('Email inválido');
            this.credentials.email = '';
            this.credentials.password = '';
            this.$refs.email.focus();
          } else if (error.response.data.error === "Invalid Password.") {
            alert('Senha incorreta');
            this.credentials.password = '';
            this.$refs.password.focus();
          }
        }
      })
    },
    forgot() {
      Router.push({name: 'Forgot'})
    }
  }
}

</script>