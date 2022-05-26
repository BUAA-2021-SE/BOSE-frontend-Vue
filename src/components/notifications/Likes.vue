<template>
  <div>
  Likes
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
export default {
  name:'Likes',
  data:{

  },
  methods:{
    getLikeList(){
      let likeId = 2;
      console.log("getLikeList");
      Notifications.getMailList(likeId)
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.error(err);
      })
    }
  },
  created(){
    this.getLikeList();
  },
  beforeRouteUpdate(to, from, next) {
    this.getLikeList();
  }
}
</script>

<style>

</style>