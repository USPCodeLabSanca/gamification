<template>
  <q-page padding class="docs-input justify-center">
    <h2>Cadastro</h2>
    <q-input v-model="data.name" float-label="Nome" ref="name"/>
    <q-input v-model="data.email" type="email" float-label="E-mail" ref="email"/>
    <q-input v-model="data.nusp" type="number" float-label="Número USP" ref="nusp"/>
    <q-input v-model="data.password" type="password" float-label="Senha" ref="password"/>
    <q-input v-model="data.confirm" type="password" float-label="Confirmar senha" ref="confirm"/>
    <q-btn type="submit" color="primary" label="Cadastrar" @click="checkForm"/>

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

let register_uri = 'http://localhost:3000';
export default {
  data() {
    return {
      data: {
        name: '',
        email: '',
        nusp: '',
        password: '',
        confirm: '',
        token: '',
      }
    }
  },
  methods: {
    checkForm() {
      //console.log('name: ' + this.data.name + ' email: ' + this.data.email + ' nusp: ' + this.data.nusp + ' password: ' + this.data.password);
      if (this.data.name === '') {
        this.$q.notify({
          message: 'Nome é obrigatório',
          icon: 'warning',
          timeout: 3000,
          position: 'top',
          closeBtn: 'X'
        });
        this.$refs.name.focus();
        return;
      }
      if (this.data.email === '') {
        this.$q.notify({
          message: 'E-mail é obrigatório',
          icon: 'warning',
          timeout: 3000,
          position: 'top',
          closeBtn: 'X'
        });
        this.$refs.email.focus();
        return;
      }
      
      if (this.data.nusp === '') {
        this.$q.notify({
          message: 'Número USP é obrigatório',
          icon: 'warning',
          timeout: 3000,
          position: 'top',
          closeBtn: 'X'
        });
        this.$refs.nusp.focus();
        return;
      }
      if (this.data.password === '') {
        this.$q.notify({
          message: 'Senha é obrigatória',
          icon: 'warning',
          timeout: 3000,
          position: 'top',
          closeBtn: 'X'
        });
        this.$refs.password.focus();
        return;
      }
      
      if (this.data.confirm === '') {
        this.$q.notify({
          message: 'Confirmação de senha é obrigatória',
          icon: 'warning',
          timeout: 3000,
          position: 'top',
          closeBtn: 'X'
        });
        this.$refs.confirm.focus();
        return;
      }
      if (this.data.password === this.data.confirm) {
        this.submit();
      } else {
        this.$q.notify({
          message: 'Senhas diferentes',
          icon: 'warning',
          timeout: 3000,
          position: 'top',
          closeBtn: 'X'
        });
        this.data.password = '';
        this.data.confirm = '';
        this.$refs.password.focus();
      }
    },
    async submit() {
      let hash = hashjs.sha256().update(this.data.password).digest('hex')
      axios
      .post(register_uri + '/api/users/register', {
        name: this.data.name,
        email: this.data.email,
        nusp: this.data.nusp,
        password: hash
      })
      .then(response => this.login(response))
      .catch(error => {
        console.log('erro' + error)
        if (error.response) {
          if(error.response.status === 409 && error.response.data.error === 'User already exists (email taken)') {
            this.$q.notify({
              message: 'E-mail já utilizado',
              icon: 'warning',
              timeout: 3000,
              position: 'top',
              closeBtn: 'X'
            });
            this.data.email = '';
            this.$refs.email.focus();
          } else if(error.response.status === 409 && error.response.data.error === 'User already exists (nusp taken)') {
            this.$q.notify({
              message: 'Número USP já utilizado',
              icon: 'warning',
              timeout: 3000,
              position: 'top',
              closeBtn: 'X'
            });
            this.data.nusp = '';
            this.$refs.nusp.focus();
          }
        }
      })
    
    },
    login(response) {
      this.data.token = response.data.token;
      console.log('token: ' + this.data.token);
      store.commit('login', response.data);
      Router.push({name: 'Home'});
    }
  }
}
</script>