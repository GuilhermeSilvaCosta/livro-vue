<template>   
    <form class="col s12">
        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix">account_circle</i>                
                <input type="text" id="login" v-model="user.login">
                <label for="login">Login</label>
            </div>
            <div class="input-field col s12">
                <i class="material-icons prefix">vpn_key</i>               
                <input id="password" type="password" v-model="user.password">
                <label for="password">Password</label>
            </div>
            <div class="input-field col s12 m3">
                <input type="checkbox" id="createaccount" v-model="user.isNew" />
                <label for="createaccount">Create Account?</label>
            </div>
            <div class="input-field col s12 m9" v-show="user.isNew">
                <input id="name" type="text" v-model="user.name" >
                <label for="name">Your Name</label>
            </div>
        </div>
        <div class="input-field col s12">
            <button class="waves-effect waves-light btn right" @click="doLogin">Enviar</button>
        </div>
    </form>    
</template>
<script>
    import Materialize from 'materialize-css';
    import Auth from './auth.js'
    export default {
        data(){
            return {
                user: {
                    name: "",
                    password: "",
                    login: "",
                    isNew: false
                }
            }
        },
        methods:{
            doLogin: function() {
                this.showProgress=true;
                this.$http.post('/api/login', this.user).then(function(response){
                    this.showProgress=false;
                    Auth.setLogin(response.data);
                    this.$router.push('home');
                },function(error) {
                    this.showProgress=false;
                    console.log(error);
                    Materialize.toast({html: 'Error: ' + error.data});
                });
            },
            checkForm: function() {
                if (!this.login) {
                    return false;
                }
                console.log('ueh');
                return true;
            }
        }
    }
</script>
