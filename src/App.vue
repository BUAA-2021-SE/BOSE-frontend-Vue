<template>
  <!-- <v-app>
  <navbar></navbar>
  <router-view/>
  </v-app> -->
<v-app>
     <navbar style="z-index:2000"></navbar>
    
        <br/>
        <br/>
        
        <router-view/>
   
</v-app>
</template>

<script>
import Navbar from './components/base/Navbar.vue'
export default {
  name:'App',
  components:{
    navbar:Navbar
  }
}
</script>

<style lang="less">
</style>
