<template>
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
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return{
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style lang="less">
</style>
