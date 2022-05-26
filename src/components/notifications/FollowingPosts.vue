<template>
  <div>
  FollowingPosts
  <br/>
  {{items}}
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
export default {
  name:'FollowingPosts',
  data(){
    return{
      items:[]
    }
  },
  methods:{
    getFollowList(){
      let followId = 1;
      console.log("getFollowList");
      Notifications.getMailList(followId)
      .then((res)=>{
        console.log(res);
        this.items = res.data.items;
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