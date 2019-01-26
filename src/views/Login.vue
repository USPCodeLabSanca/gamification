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
    <button class="btn btn-primary" @click="submit()">Entrar</button>
    <facebook-login class="button"
      appId="255459355343445"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded"
      style='align: center; margin-top: 15px'>
    </facebook-login>
    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" style='align: center; margin-top: 15px'> </div>
    <router-link :to=register>Cadastre-se</router-link>
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
import facebookLogin from 'facebook-login-vuejs';

export default {
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  },
    data() {
        return {
            credentials: {
                username: '',
                password: ''
            },
            register: '/register',
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
        onLogin() { //sempre executa mesmo antes de clicar e entra na conta que ja fez login antes ???
          this.isConnected = true
          this.getUserData()
        },
        onLogout() {
          this.isConnected = false;
        },
        onSignIn(googleUser) { //nao ta executando
          // Useful data for your client-side scripts:
          var profile = googleUser.getBasicProfile();
          console.log("ID: " + profile.getId()); // Don't send this directly to your server!
          console.log('Full Name: ' + profile.getName());
          console.log('Given Name: ' + profile.getGivenName());
          console.log('Family Name: ' + profile.getFamilyName());
          console.log("Image URL: " + profile.getImageUrl());
          console.log("Email: " + profile.getEmail());

          // The ID token you need to pass to your backend:
          var id_token = googleUser.getAuthResponse().id_token;
          console.log("ID Token: " + id_token);
        }
      },
    components: {
      facebookLogin
    }
}

</script>