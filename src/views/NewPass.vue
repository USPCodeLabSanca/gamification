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
                alert('Senha é obrigatória');
                this.$refs.password.focus();
                return;
            }
            
            if (this.data.confirm === '') {
                alert('Confirmação de senha é obrigatória');
                this.$refs.confirm.focus();
                return;
            }
            if (this.data.password === this.data.confirm) {
                this.submit();
            } else {
                alert('Senhas diferentes');
                this.data.password = '';
                this.data.confirm = '';
                this.$refs.password.focus();
            }
        },
        submit() {
            this.data.nusp = this.$route.query.nusp;
            this.data.token = this.$route.query.token;

            console.log('nusp: ' + this.data.nusp);
            axios
            .post(register_uri + '/api/users/reset', {
                nusp: this.data.nusp,
                password: this.data.password,
                token: this.data.token
            })
            .then(this.redirect)
            .catch(error => {
                console.log('erro' + error)
                if (error.response) {
                    if(error.response.status === 400) {
                        console.log(error.response.data.error)
                        alert('Erro ao atualizar a senha, por favor tente novamente');
                        Router.push({name: 'Forgot'})
                    }
                }
            })
        
        },
        redirect() {
            alert('Senha atualizada com sucesso!')
            Router.push({name: 'Entrar'});
        }
      }
}
</script>