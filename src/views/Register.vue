<template>
  <q-page padding class="docs-input justify-center">
    <h2>Cadastro</h2>
    <form
    id="register-form"
    @submit="checkForm">

    <q-input v-model="data.name" float-label="Nome" :disable="disableform"/>
    <q-input v-model="data.email" type="email" float-label="E-mail" :disable="disableform" ref="email"/>
    <q-input v-model="data.nusp" type="number" float-label="Número USP"/>
    <q-input v-model="data.password" type="password" float-label="Senha" v-if="!disableform"/>
    <q-input type="password" float-label="Confirmar senha" v-if="!disableform"/>
    <q-btn type="submit" color="primary" label="Cadastrar"/>

    </form>
  </q-page>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-top: 50px;
}

button {
    float: right;
    margin-top: 5%; 
}
</style>

<script>
import Router from '../router';

export default {
    data() {
        return {
            data: {
                name: '',
                email: '',
                nusp: '',
                password: '',
                token: '',
            },
            disableform: false //deixar true se tiver logado por fb ou google
        }
    },
    methods: {
        checkForm() {
            //console.log('name: ' + this.data.name + ' email: ' + this.data.email + ' nusp: ' + this.data.nusp + ' password: ' + this.data.password);
            this.submit()
        },
        submit() {
            axios
            .post('http://localhost:3000/api/users/register', {
                name: this.data.name,
                email: this.data.email,
                password: this.data.password
            })
            .then(response => this.login(response))
            .catch(error => {
                console.log('erro' + error)
                if (error.response) {
                    console.log(error.response.status === 409)
                    alert('E-mail já utilizado');
                    this.data.email = '';
                    this.$refs.email.focus();
                }
            })
        
        },
        login(response) {
            this.data.token = response.data.token;
            console.log('token: ' + this.data.token);
            Router.push({name: 'Home'});
        }
    }
}

</script>