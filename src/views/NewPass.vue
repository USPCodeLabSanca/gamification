<template>
  <q-page padding class="docs-input justify-center">
    <h2>Recuperação de senha</h2>
    <q-input v-model="data.password" type="password" float-label="Senha" ref="password"/>
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
let register_uri = 'http://localhost:3000';
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
      this.data.nusp = this.$route.query.nusp;
      this.data.token = this.$route.query.token;

      axios
      .post(register_uri + '/api/users/reset', {
        nusp: this.data.nusp,
        password: this.data.password,
        token: this.data.token
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
        icon: 'warning',
        timeout: 3000,
        position: 'top',
        closeBtn: 'X'
      });
      Router.push({name: 'Entrar'});
    }
   }
}
</script>