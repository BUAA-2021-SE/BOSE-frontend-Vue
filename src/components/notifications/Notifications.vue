<template>
  <div>
  <v-row>
  <v-col cols="12" md="1"></v-col>
    <v-col cols="12" md="3">
    <v-card>
    <v-img
        :aspect-ratio="16/16"
        :src="user._links.avatar"
        :max-height="360"
        :max-width="360"
      />
    <v-card-title>
      {{user.username||user.name}}
    </v-card-title>
    <v-card-text>{{user.about_me}}</v-card-text>
        <v-btn :to="{name: 'ReceivedComments'}" 
        block color="blue" outlined>
        <v-icon color="green">mdi-comment</v-icon>
        ReceivedComments
        <span class="red--text ms-4" v-if="unread.unread_comments!=0">new</span>
        </v-btn>
        <v-btn :to="{name: 'ReceivedMessages'}" 
        block color="blue" outlined>
        <v-icon color="green">mdi-email</v-icon>
        ReceivedMessages
        <span class="red--text ms-4" v-if="unread.unread_messages!=0">new</span>
        </v-btn>
        <v-btn :to="{name: 'Likes'}" 
        block color="blue" outlined>
        <v-icon color="green">mdi-heart</v-icon>
        Likes
        <span class="red--text ms-4" v-if="unread.unread_likes!=0">new</span>
        </v-btn>
        <v-btn :to="{name: 'FollowingPosts'}" 
        block color="blue" outlined>
        <v-icon color="green">mdi-access-point</v-icon>
        Followings
        <span class="red--text ms-4" v-if="unread.unread_followings!=0">new</span>
        </v-btn>
    </v-card>
    </v-col>
    <v-col cols="12" md="6">
    <router-view></router-view>
    </v-col>
    <v-col col="12" md="1"></v-col>
  </v-row>
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
import {Account} from "@/api/account.js";
import store from "@/store.js";
export default {
    name:'Notifications',
    data() {
      return{
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
        unread:{
          unread_comments:0,
          unread_followings:0,
          unread_likes:0,
          unread_messages:1
        }
      }
    },
    methods:{
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
          this.reload();
        })
        .catch((err) => {
          console.log((err, "getUserDetailError"));
        });
    },
    getUserNotifications(id){

    }
    },
    created() {
      this.getUserDetail(this.sharedState.user_id);
      this.getUserNotifications(this.sharedState.user_id);
    },
    beforeRouteUpdate (to, from, next) {
    next()
    this.getUserNotifications(this.sharedState.user_id);
  }
}
</script>

<style>

</style>