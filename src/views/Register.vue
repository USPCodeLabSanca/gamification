<template>
  <q-page padding class="docs-input justify-center">
    <h2>Cadastro</h2>
    <form
    id="register-form"
    @submit="checkForm">

    <q-input v-model="data.name" float-label="Nome" :disable="disableform"/>
    <q-input v-model="data.email" type="email" float-label="E-mail" :disable="disableform"/>
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

export default {
    data() {
        return {
            data: {
                name: '',
                email: '',
                nusp: '',
                password: ''
            },
            disableform: false //deixar true se tiver logado por fb ou google
        }
    },
    methods: {
        checkForm() {
            console.log('name: ' + this.data.name + ' email: ' + this.data.email + ' nusp: ' + this.data.nusp + ' password: ' + this.data.password);
        },
    }
}

</script>