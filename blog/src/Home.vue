<template>    
    <div>
        <div v-show="showProgress" class="progress">            
            <div class="indeterminate"></div>
        </div>
        <div>
            <div v-bind="posts" class="row" v-for="post in posts" :key="post._id">
                <div class="col s12">
                    <div class="card blue lighten-5">
                        <div class="card-content black-test">
                            <span class="card-title">{{post.title}}</span>
                            <p>{{post.text}}</p>
                        </div>
                        <div class="card-action">
                            <span><i class="material-icons">perm_identity</i>{{post.user.name}}</span>
                            <a href="#" @click="remove(post)" class="right blue-text" 
                            v-if="login.token!=null && login.id==post.user._id">Remove</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Materialize from 'materialize-css';
    import Auth from './auth.js'
    export default {
        date(){
            return {
                posts: null,
                showProgress: true,
                login: Auth.getLogin()
            }
        },
        created: function() {
            this.login = Auth.getLogin();
            this.showProgress=true;
            this.loadPosts();
        },
        methods: {
            remove: function(item) {

                //item.token = Auth.getLogin().token;
                console.log('item', item);
                this.$http.delete('/api/posts/'+item._id, { params: {token: Auth.getLogin().token} }).then(
                    function(response) {
                        this.loadPosts();
                    },
                    function(error) {
                        Materialize.toast({html: 'Error: ' + error.data.message});
                    }
                );
            },
            loadPosts: function() {
                this.$http.get('/api/posts').then(function(response){
                    this.showProgress = false;
                    this.posts = response.data;
                    this.$forceUpdate();
                },function(error){
                    this.showProgress=false;
                    Materialize.toast({html: 'Error: ' + error.statusText});                    
                    this.$forceUpdate();
                });
            }
        }
    }
</script>