<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Blog</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <router-link tag="li" to="/"><a>Home</a></router-link>
          <router-link tag="li" to="/login"><a>Login</a></router-link>
          <router-link tag="li" to="/addPost"><a>AddPost</a></router-link>
        </ul>
      </div>
    </nav>
    <br/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>

<style scoped>
  body {
    font-family: Helvetica, sans-serif;
  }
</style>
