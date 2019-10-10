<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    padding-top: 40px;
  }

  .logo {
    width: 100px;
    display: block;
    margin:  0 auto;
  }
</style>
