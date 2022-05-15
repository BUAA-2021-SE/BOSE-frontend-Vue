<template>
  <v-app>
    <navbar style="z-index:2000"></navbar>
    <!-- <profilecard style="z-index:2000" position="fixed"></profilecard> -->
    <br/>
    <br/>
    <br/>
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from './components/base/Navbar.vue'
import ProfileCard from './components/base/ProfileCard.vue'
export default {
  name: 'App',
  components: {
    navbar: Navbar,
    profilecard:ProfileCard
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style lang="less">
</style>
