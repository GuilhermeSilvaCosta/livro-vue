import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import HelloWorldRouter from './components/HelloWorldRouter.vue'
import Card from './components/Card.vue'
import Buttons from './components/Buttons.vue'

Vue.use(VueResource);
Vue.use(VueRouter);
const router = new VueRouter({  
  linkExactActiveClass: 'active',
  routes: [
    {path: '/', component: HelloWorldRouter},
    {path: '/card', component: Card, meta: {requiresAuth: true}},
    {path: '/buttons', component: Buttons}
  ]
});

router.beforeEach((to, from, next) => {
  let authenticated = false;
  if (to.matched.some(record => record.meta.requiresAuth) && !authenticated) {    
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});