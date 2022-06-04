<template>
  <div>
  <v-btn text :to="{name:'AdminBlogs'}">博文打回</v-btn>
  <v-btn text :to="{name:'ExaminingBlogs'}">博文审核</v-btn>
  <v-btn text :to="{name:'AdminResources'}">资源打回</v-btn>
  <v-btn text :to="{name:'ExaminingResources'}">资源审核</v-btn>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:"Admin"
}
</script>

<style>

</style>