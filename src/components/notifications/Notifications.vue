<template>
  <div class="container">
    
    <div class="row">
      <v-col cols="12" md="3">
        <v-card outlined>
          <v-img
                  v-if="user._links.avatar"
                  class="img-fluid w-80"
                  :src="user._links.avatar"
                  alt="Image Description"
              />
          <v-card-title><h3>
            {{ user.name || user.username }}</h3>
          </v-card-title>
          <v-card-subtitle ><p>{{ user.about_me }}</p></v-card-subtitle>
          <v-divider  class="mx-4"></v-divider>
          <v-row class="justify-center">
          <v-btn :to="{name: 'ReceivedComments'}"
               text class="d-flex justify-start">
            <v-icon :style="{ color: '#00AEEC' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">comment</v-icon>
            收到评论
            <span class="red--text ms-4" v-if="unread.unread_comments!=0">{{ unread.unread_comments }}</span>
          </v-btn>
          <v-btn :to="{name: 'MessageList'}"
                 text class="d-flex justify-start">
            <v-icon :style="{ color: 'orange' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">email</v-icon>
            私信交流
            <span class="red--text ms-4" v-if="unread.unread_messages!=0">{{ unread.unread_messages }}</span>
          </v-btn>
          <v-btn :to="{name: 'Likes'}"
                 text class="d-flex justify-start">
            <v-icon :style="{ color: 'red' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">favorite</v-icon>
            喜欢
            <span class="red--text ms-4" v-if="unread.unread_likes!=0">{{ unread.unread_likes }}</span>
          </v-btn>
          <v-btn :to="{name: 'FollowingPosts'}"
                  text class="d-flex justify-start">
            <v-icon :style="{ color: 'green' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}" >face_retouching_natural</v-icon>
            新增粉丝
            <span class="red--text ms-4" v-if="unread.unread_followings!=0">{{ unread.unread_followings }}</span>
          </v-btn>
          <v-btn :to="{name: 'History'}"
                 text class="d-flex justify-start">
            <v-icon :style="{ color: 'pink' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">history</v-icon>
            历史记录
          </v-btn>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <router-view></router-view>
      </v-col>
      
    </div>
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
import {Account} from "@/api/account.js";
import store from "@/store.js";

export default {
  name: 'Notifications',
  data() {
    return {
      sharedState: store.state,
      user: {
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
      unread: {
        unread_comments: 0,
        unread_followings: 0,
        unread_likes: 0,
        unread_messages: 1
      }
    }
  },
  methods: {
    getUserDetail(id) {
      Account.getUser(id)
          .then((res) => {
            console.log(res.data);
            this.user.name = res.data.name;
            this.user.about_me = res.data.about_me;
            this.user._links.avatar = res.data.headshot;
            this.user.last_seen = res.data.last_seen;
            this.user.location = res.data.location;
            this.user.username = res.data.username;
            this.loadingProfile = false;
            this.unread.unread_comments = res.data.unread_comments;
            this.unread.unread_followings = res.data.unread_followings;
            this.unread.unread_likes = res.data.unread_likes;
            this.unread.unread_messages = res.data.unread_messages;
            this.reload();
          })
          .catch((err) => {
            console.log((err, "getUserDetailError"));
          });
    }
  },
  created() {
    this.getUserDetail(this.sharedState.user_id);
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserDetail(this.sharedState.user_id);
  }
}
</script>

<style scoped>
hr.mx-4.v-divider.theme--light{
  margin-top:-10px;
  
}
.v-btn {
  text-transform: none;
  font-size: 20;
  width: 80%;
  margin-top: -13px;
  margin-bottom: 18px;
}
</style>