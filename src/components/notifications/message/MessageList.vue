<template>
  <div>
  <div v-for="(message,index) in messages" :key="index">
    <chat :chat="message"></chat>
  </div>
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
import ChatItem from '@/components/base/ChatItem.vue'
export default {
    name:'MessageList',
    components: {
        chat:ChatItem
    },
    data(){
        return{
            messages:[]
        }
    },
    methods:{
        getRoomList(){
            Notifications.getRoomList()
            .then((res)=>{
                console.log(res.data);
                this.messages = res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
        this.getRoomList();
    },
    beforeRouteUpdate(to, from, next){
        next();
        this.getRoomList();
    }
}
</script>

<style>

</style>