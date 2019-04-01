import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import login from './stores/login'
import user from './stores/user'
import product from './stores/product'
import supplier from './stores/supplier'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
    modules: {
        login,
        user,
        product,
        supplier
    }
})