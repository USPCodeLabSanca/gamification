<template>
  <q-page padding class="docs-input justify-center">
    <h2>Recuperação de senha</h2>
    <q-input v-model="data.password" type="password" float-label="Senha" ref="password" autofocus/>
    <q-input v-model="data.confirm" type="password" float-label="Confirmar senha" ref="confirm"/>
    <q-btn type="submit" color="primary" label="Salvar" @click="checkForm"/>
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

let register_uri = 'https://bixoquest.icmc.usp.br';
export default {
  data() {
   return {
    data: {
      nusp: '',
      password: '',
      confirm: '',
      token: '',
    }
   }
  },
  mounted() {
    this.nusp = this.$route.query.nusp;
    this.token = this.$route.query.token;
    axios
    .post(register_uri + '/api/users/resetoken', {
      nusp: this.nusp,
      token: this.token
    }).catch(error => {
      this.$q.notify({
        message: 'Link invalido ou expirado',
        icon: 'warning',
        timeout: 3000,
        position: 'top',
        closeBtn: 'X'
      });
      Router.push({name: 'Home'});
    });
  },
  methods: {
   checkForm() {
    
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
    submit() {
      let hash = hashjs.sha256().update(this.data.password).digest('hex');
      let vm = this;
      axios
      .post(register_uri + '/api/users/reset', {
        nusp: vm.nusp,
        password: hash,
        token: vm.token
      })
      .then(this.redirect)
      .catch(error => {
        if (error.response) {
          if(error.response.status === 400) {
            this.$q.notify({
              message: 'Erro ao atualizar a senha, por favor tente novamente',
              icon: 'warning',
              timeout: 3000,
              position: 'top',
              closeBtn: 'X'
            });
            Router.push({name: 'Forgot'})
          }
        }
      })
    
    },
    redirect() {
      this.$q.notify({
        message: 'Senha atualizada com sucesso!',
        type: 'positive',
        timeout: 3000,
        position: 'top',
        closeBtn: 'X'
      });
      Router.push({name: 'Entrar'});
    }
   }
}
</script>