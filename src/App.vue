<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from 'components/navBar/NavBar'
  export default {
    name: "app",
    components: {
      NavBar
    },
    created() {
      this.$store.commit('getUser')
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
