<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <button v-show="!isLogged" @click="doLogin()">Login</button>
    <div v-show="isLogged">
      <button @click="doLogout()">Logout</button>
      <button>Users</button>
      <button @click="loadProducts()">Products</button>
      <button @click="loadSuppliers()">Suppliers</button>
      <br>
      <div v-show="hasProducts">
        <h4>Products</h4>
        <table border="1">
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
              <td>quantity</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in getProducts" :key="p.id">
              <td>{{p.id}}</td>
              <td>{{p.name}}</td>
              <td>{{p.quantity}}</td>
            </tr>
          </tbody>
        </table>
        <button @click="clearProducts()">Limpar Produtos</button>
      </div>
      <div v-show="hasSuppliers">
        <h4>Suppliers</h4>
        <table border="1">
          <thead>
            <tr>
              <td>id</td>
              <td>name</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in getSuppliers" :key="s.id">
              <td>{{s.id}}</td>
              <td>{{s.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: mapGetters(['isLogged', 'hasProducts', 'getProducts', 'hasSuppliers', 'getSuppliers']),
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: mapActions(['doLogin', 'doLogout', 'loadProducts', 'clearProducts', 'loadSuppliers'])
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  width: 200px;
  height: 200px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
