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
    <facebook-login class="button"
      appId="255459355343445"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
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
import facebookLogin from 'facebook-login-vuejs';

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
        },
        getUserData() {
          this.FB.api('/me', 'GET', { fields: 'id, name, email' },
            userInformation => {
              console.warn("data api", userInformation)
              this.personalID = userInformation.id;
              this.email = userInformation.email;
              this.name = userInformation.name;
            }
          )
        },
        sdkLoaded(payload) {
          this.isConnected = payload.isConnected
          this.FB = payload.FB
          if (this.isConnected) this.getUserData()
        },
        onLogin() {
          this.isConnected = true
          this.getUserData()
        },
        onLogout() {
          this.isConnected = false;
        }
      },
    components: {
      facebookLogin
    }
}

</script>