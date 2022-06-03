<template>
  <div>
  <v-card>
  <v-card-title >{{user.name}}</v-card-title>
  <v-divider></v-divider>
  <v-container  :style="{'height':'500px','overflow':'scroll','overflow-x':'hidden','background-color':'#E8E8E8  '}">
    <div v-for="(item,index) in items" :key="index" :style="{}">
      <div v-if="item.sender.id==user.id" class="text-left d-flex  justify-start" :style="{'margin-right':'30%',}">
        <div class="justify-start ">
          <div>
          <v-avatar size="60" :style="{'margin-top':'5px'}"><v-img :src="item.sender.headshot"/></v-avatar>
        <v-card  :style="{'background-color':'#FFFFFF ','max-width':'400px','margin-left':'80px','margin-top':'-55px','margin-bottom':'10px',padding:'5px'}">
          <v-card-text :style="{color:'black'}">{{item.content}}</v-card-text>
          </v-card>
          </div>
        </div>
      </div>
     
      <div v-else class="text-right d-flex  justify-end" :style="{'margin-left':'30%',}">
        <div class="justify-end ">
          <div>
          <v-avatar size="60" :style="{'margin-top':'5px'}"><v-img :src="item.sender.headshot"/></v-avatar>
        <v-card  :style="{'background-color':'#6EA0D3 ','max-width':'400px','margin-right':'80px','margin-top':'-55px','margin-bottom':'10px'}">
          <v-card-text :style="{color:'white'}">{{item.content}}</v-card-text>
          </v-card>
          </div>
        </div>
      </div>
      
    </div>
  </v-container>
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
import {Account} from "@/api/account.js";
export default {
  name:'HistoryMessage',
  data(){
    return{
      sharedState: store.state,
      items:[],
      chatForm:'',
      user: {
        id:"",
        username: "",
        name: "",
        email: "",
        location: "",
        about_me: "",
        headshot: "",
        member_since: "",
        last_seen: "",
        _links: {
          avatar: "",
        },
      },
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
    },
    getUserDetail(id) {
      Account.getUser(id)
          .then((res) => {
            console.log(this.$route.params);
            console.log(res.data);
            this.user.id=res.data.id;
            this.user.name = res.data.name;
            this.user.about_me = res.data.about_me;
            this.user._links.avatar = res.data.headshot;
            this.user.last_seen = res.data.last_seen;
            this.user.location = res.data.location;
            this.user.username = res.data.username;
          })
          .catch((err) => {
            console.log((err, "getUserDetailError"));
          });
    },
    
  },
  created() {
    this.getChatList();
    this.getUserDetail(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next){
    next();
    this.getChatList();
  }
}
</script>

<style>

</style>