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
                alert('Nome é obrigatório');
                this.$refs.name.focus();
                return;
            }

            if (this.data.email === '') {
                alert('E-mail é obrigatório');
                this.$refs.email.focus();
                return;
            }
            
            if (this.data.nusp === '') {
                alert('Número USP é obrigatório');
                this.$refs.nusp.focus();
                return;
            }

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
            axios
            .post(register_uri + '/api/users/register', {
                name: this.data.name,
                email: this.data.email,
                nusp: this.data.nusp,
                password: this.data.password
            })
            .then(response => this.login(response))
            .catch(error => {
                console.log('erro' + error)
                if (error.response) {
                    if(error.response.status === 409 && error.response.data.error === 'User already exists (email taken)') {
                        alert('E-mail já utilizado');
                        this.data.email = '';
                        this.$refs.email.focus();
                    } else if(error.response.status === 409 && error.response.data.error === 'User already exists (nusp taken)') {
                        alert('Número USP já utilizado');
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