<template>
  <div class="container">
    <v-tabs>
      <v-tab :to="{name:'Search'}">综合</v-tab>
      <v-tab :to="{name:'SearchBlog'}">博文</v-tab>
      <v-tab :to="{name:'SearchResource'}">资源</v-tab>
      <v-tab :to="{name:'SearchTag'}">标签</v-tab>
      <v-tab :to="{name:'SearchUser'}">用户</v-tab>
    </v-tabs>
    <router-view/>
  </div>
</template>

<script>
export default {}
</script>

<style>

</style>