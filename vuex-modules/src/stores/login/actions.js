import Vue from 'vue'

export default {
    doLogin(context) {        
        Vue.http.get('/login.json').then(
            function(response){
                context.commit("SETLOGIN", response.data)
            },
            function(error){
                console.error(error.statusText)
            }
        )
    },
    doLogout(context) {        
        let login = {
            username: "",
            email: "",
            token: ""
        }
        context.commit("SETLOGIN", login)
    }    
}