<template>
  <v-app>
  <navbar/>
  <router-view/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  name:'App',
  components:{
    navbar:Navbar
  }
}
</script>

<style lang="less">
</style>
