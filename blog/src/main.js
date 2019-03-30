import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'

import routes from './routes.js'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueValidator);

const router = new VueRouter({  
  linkExactActiveClass: 'active',
  routes
});



new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
