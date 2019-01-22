<template>
  <div class="col-xs-4 col-md-4">
    <h2>Cadastro</h2>
    <form
    id="register-form"
    @submit="checkForm">

    <div class="form-group">
        <label for="name">Nome</label>
        <input
            type="text"
            class="form-control"
            v-model="data.name"
            :disabled='disableform'
        >
    </div>

    <div class="form-group">
        <label for="email">E-mail</label>
        <input
            type="email"
            class="form-control"
            v-model="data.email"
            :disabled='disableform'
        >
    </div>

    <div class="form-group">
        <label for="nusp">Número USP</label>
        <input
            type="number"
            class="form-control"
            v-model="data.nusp"
        >
    </div>

    <div class="form-group" v-if='!disableform'>
        <label for="pass">Senha</label>
        <input
            type="password"
            class="form-control"
            v-model="data.password"
        >
    </div>
    
    <div class="form-group" v-if='!disableform'>
        <label for="confirm-pass">Confirmar senha</label>
        <input
            type="password"
            class="form-control"
        >
    </div>

    <button type="submit" class="btn btn-primary">Cadastrar</button>

    </form>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-top: 50px;
}

button {
    float: right;
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