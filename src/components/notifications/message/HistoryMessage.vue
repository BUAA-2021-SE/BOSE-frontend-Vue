<template>
  <div>
  <v-card>
  <v-card-title>123</v-card-title>
  <v-card-subtitle>456</v-card-subtitle>
  <v-divider></v-divider>
  {{items.length}}
  <v-divider></v-divider>
  <v-textarea
    hint="友善是交流的前提"
    v-model="chatForm"
    auto-grow
  ></v-textarea>
  <v-card-actions>
  <v-btn text @click="postChat"> 发送消息 </v-btn>
  </v-card-actions>
  </v-card>
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js';
import store from "@/store.js";
export default {
  name:'HistoryMessage',
  data(){
    return{
      sharedState: store.state,
      items:[],
      chatForm:''
    }
  },
  methods:{
    getChatList(){
      console.log("getMessageList");
      Notifications.getChatList(this.$route.params.id)
      .then((res)=>{
        console.log(res);
        this.items = res.data;
      })
      .catch((err)=>{
        console.error(err);
      })
    },
    postChat(){
      console.log("postChat");
      const formData = new FormData();
      formData.append('text',this.chatForm);
      Notifications.postChat(this.$route.params.id,formData)
      .then((res)=>{
        console.log(res);
        this.chatForm = '';
        // this.$toasted
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },
  created() {
    this.getChatList();
  },
  beforeRouteUpdate(to, from, next){
    next();
    this.getChatList();
  }
}
</script>

<style>

</style>