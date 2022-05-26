<template>
  <div>
  ReceivedMessages
  <br/>
  {{items}}
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
export default {
  name:'ReceivedMessages',
  data(){
    return{
      items:[]
    }
  },
  methods: {
    getMessageList(){
      let messageId = 3;
      console.log("getMessageList")
      Notifications.getMailList(messageId)
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
    this.getMessageList();
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.getMessageList();
  } 
}
</script>

<style>

</style>