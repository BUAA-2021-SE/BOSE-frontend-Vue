<template>
  <div>
  <v-btn text :to="{name:'AdminBlogs'}">博文打回</v-btn>
  <v-btn text :to="{name:'ExaminingBlogs'}">博文审核</v-btn>
  <v-btn text>资源打回</v-btn>
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