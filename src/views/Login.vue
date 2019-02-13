<template>
  <q-page padding class="docs-input justify-center">
    <h2>Login</h2>
    <q-input v-model="credentials.username" float-label="email" ref="email"/>
    <q-input v-model="credentials.password" type="password" float-label="senha" ref="password"/>
    <q-btn color="primary" label="Entrar" @click="submit()"/>
    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" style='align: center; margin-top: 15px'> </div>
    <router-link :to=register>Cadastre-se</router-link>
  </q-page>
</template>

<style scoped>

h2 {
  margin-top: 20%;
}

button {
  float: right;
  margin-top: 5%;
}

</style>

<script>

export default {
  data() {
    return {
        credentials: {
            username: '',
            password: '',
            token: '',
        },
        register: '/register'
    }
  },
  methods: {
    login(response) {
      this.credentials.token = response.data.token;
      console.log('token: ' + this.credentials.token);
    },
    submit() {
      console.log('user: ' + this.credentials.username + ' - pass: ' + this.credentials.password);
      axios
      .post('https://localhost:3000/api/users/auth', {
        email: this.credentials.username,
        password: this.credentials.password
      })
      .then(response => (this.login(response)))
      .catch(error => {
        console.log('erro: ' + error)
        if (error.response && error.response.status === 400) {
          if (error === "Email not found") {
            alert('Email inválido');
            this.credentials.email = '';
            this.credentials.password = '';
            this.$refs.email.focus();
          } else if (error === "Invalid Password.") {
            alert('Senha incorreta');
            this.credentials.password = '';
            this.$refs.password.focus();
          }
          console.log(error.response)
        }
      })
    }
  }
}

</script>