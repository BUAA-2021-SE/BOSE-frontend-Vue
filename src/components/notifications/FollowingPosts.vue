<template>
  <div>
  FollowingPosts
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
export default {
  name:'FollowingPosts',
  data:{

  },
  methods:{
    getFollowList(){
      let followId = 1;
      console.log("getFollowList");
      Notifications.getMailList(followId)
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.error(err);
      })
    }
  },
  created(){
    this.getFollowList();
  },
  beforeRouteUpdate(to, from, next) {
    this.getFollowList();
  }
}
</script>

<style>

</style>