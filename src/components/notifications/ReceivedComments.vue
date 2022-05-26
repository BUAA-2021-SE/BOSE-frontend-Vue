<template>
  <div>
  ReceivedComments
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
export default {
  name:'ReceivedComments',
  data(){
    return{

    }
  },
  methods: {
    getCommentList(){
      let commentId = 0;
      console.log("getCommentList");
      Notifications.getMailList(commentId)
      .then((res)=>{
        console.log(res);
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