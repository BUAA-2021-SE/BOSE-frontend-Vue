<template>
  <div>
  <v-card>
  <v-card-title class="d-flex justify-center">与{{user.name}}的聊天</v-card-title>
  <div class="container" ref="chatting" :style="{'height':'500px','overflow':'scroll','overflow-x':'hidden','background-color':'#F4F4F4 ','border-color':'#000000','border-width':'2px'}">
    <div v-for="(item,index) in items" :key="index" >
      <div v-if="item.sender.id==user.id" class="text-left d-flex  justify-start" :style="{'margin-right':'30%',}">
        <div class="justify-start ">
          <div>
            <router-link :to="{ name: 'ShowProfile',params: { id:item.sender.id} }">
          <v-avatar size="60" :style="{'margin-top':'5px'}"><v-img :src="item.sender.headshot"/></v-avatar></router-link>
        <v-card  :style="{'background-color':'#FFFFFF ','max-width':'400px','margin-left':'80px','margin-top':'-35px','margin-bottom':'10px','border-radius':'0px 10px 10px 10px'}">
          <v-card-text :style="{color:'black','padding':'5px 15px 5px 15px'}">{{item.content}}</v-card-text>
          </v-card>
          </div>
        </div>
      </div>
     
      <div v-else class="text-right d-flex  justify-end" :style="{'margin-left':'30%',}">
        <div class="justify-end ">
          <div>
            <router-link :to="{ name: 'ShowProfile',params: { id:item.sender.id} }">
          <v-avatar size="60" :style="{'margin-top':'5px'}"><v-img :src="item.sender.headshot"/></v-avatar></router-link>
        <v-card  :style="{'background-color':'#6EA0D3 ','max-width':'400px','margin-right':'80px','margin-top':'-35px','margin-bottom':'10px','border-radius':'10px 0px 10px 10px'}">
          <v-card-text :style="{color:'white','padding':'5px 15px 5px 15px','text-align':'start!important'}">{{item.content}}</v-card-text>
          </v-card>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <v-divider :style="{'margin-top':'0px','margin-bottom':'0px'}"></v-divider>
  <div :style="{'height':'116px'}">
  <textarea
      v-model="chatForm"
      outlined
      rows="4"
      placeholder="友善是交流的前提"
    :style="{'background-color':'#F4F4F4 ','width':'100%','outline':'none','margin-top':'0px',padding:'10px','border-top-color':'#000000','border':'none','resize':'none','position':'relative'}"
  ></textarea>
  </div >
  <v-card-actions :style="{'background-color':'#F4F4F4'}" class="d-flex justify-end">
  <v-btn text @click="postChat" :style="{'background-color':'#FFFFFF','border-width':'2px','border-color':'black','margin-right':'3px','margin-bottom':'3px'}"> 发送消息 </v-btn>
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
      item:{},
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
           let div = this.$refs.chatting
           div.scrollTop = 20000;
           console.log(div.scrollTop)
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
        this.getChatList();
           let div = this.$refs.chatting
           div.scrollTop = 20000;
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
  mounted(){
    this.getChatList();
  },
  created() {
    
    this.getUserDetail(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next){
    next();
    this.getChatList();
  }
}
</script>

<style scoped>

</style>