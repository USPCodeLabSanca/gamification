<template>
</template>

<style scoped>
</style>

<script>
import Router from '../router';
import store from '../store';
let register_uri = 'https://bixoquest.icmc.usp.br';
export default {
    data() {
        return {
            data: {
                nusp: '',
                token: '',
            }
        }
    },
    mounted() {
        this.data.nusp = this.$route.query.nusp;
        this.data.token = this.$route.query.token;

        axios
        .post(register_uri + '/api/users/resetoken', {
            nusp: this.data.nusp,
            token: this.data.token
        })
        .then(this.redirect)
        .catch(error => {
            Router.push({name: 'Home'});
        })
    },
    methods: {
        redirect() {
            Router.push({name: 'NewPass', query: {nusp: this.data.nusp, token: this.data.token}});
        }    
        
    }
}
</script>