<template>
  <div>
  历史记录
  {{resdata}}
  </div>
</template>

<script>
import Notifications from '@/api/notifications';
export default {
  name:'History',
  data(){
    return{
      resdata:[]
    }
  },
  methods: {
    getHistoryList(){
      console.log('getHistoryList');
      Notifications.getHistoryList()
      .then((res)=>{
        console.log(res);
        this.resdata = res;
      })
      .catch((err) => {
        console.log(err.response.details);
      })
    }
  },
  created() {
    this.getHistoryList();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getHistoryList();
  }
}
</script>

<style>

</style>