  <template>
    <div class="col-xs-4 col-md-4">
      <h2>Login</h2>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="usuario"
          v-model="credentials.username"
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="senha"
          v-model="credentials.password"
        >
      </div>
      <button class="btn btn-primary login" @click="submit()">Entrar</button>
    </div>
  </template>

<style scoped>
h2 {
  text-align: center;  
}

button {
    float: right;
}

</style>

<script>

export default {
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        submit() {
            console.log('user: ' + this.credentials.username + ' - pass: ' + this.credentials.password);
        }
    }
}

</script>