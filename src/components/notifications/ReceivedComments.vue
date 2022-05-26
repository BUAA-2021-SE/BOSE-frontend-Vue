<template>
  <div>
  ReceivedComments
  <br/>
  {{items}}
  <v-card v-for="(item,index) in items" :key="index">
  </v-card>
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
export default {
  name:'ReceivedComments',
  data(){
    return{
      items:[]
    }
  },
  methods: {
    getCommentList(){
      let commentId = 0;
      console.log("getCommentList");
      Notifications.getMailList(commentId)
      .then((res)=>{
        console.log(res);
        this.items = res.data.items;
      })
      .catch((err)=>{
        console.error(err);
      })
    }
  },
  created() {
    this.getCommentList();
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.getCommentList();
  }
}
</script>

<style>

</style>