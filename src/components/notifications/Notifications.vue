<template>
  <div class="container">
    <v-row >
      <v-col cols="12" md="3">
        <v-card>
          <v-img
              :aspect-ratio="16/16"
              :src="user._links.avatar"
              :max-height="360"
              :max-width="360"
          />
          <v-card-title>
            {{ user.name || user.username }}
          </v-card-title>
          <v-card-text>{{ user.about_me }}</v-card-text>
          <v-divider></v-divider>
          <v-btn :to="{name: 'ReceivedComments'}"
                 block color="blue" outlined>
            <v-icon color="green">mdi-comment</v-icon>
            收到评论
            <span class="red--text ms-4" v-if="unread.unread_comments!=0">{{ unread.unread_comments }}</span>
          </v-btn>
          <v-btn :to="{name: 'MessageList'}"
                 block color="blue" outlined>
            <v-icon color="green">mdi-email</v-icon>
            私信交流
            <span class="red--text ms-4" v-if="unread.unread_messages!=0">{{ unread.unread_messages }}</span>
          </v-btn>
          <v-btn :to="{name: 'Likes'}"
                 block color="blue" outlined>
            <v-icon color="green">mdi-heart</v-icon>
            喜欢
            <span class="red--text ms-4" v-if="unread.unread_likes!=0">{{ unread.unread_likes }}</span>
          </v-btn>
          <v-btn :to="{name: 'FollowingPosts'}"
                 block color="blue" outlined>
            <v-icon color="green">mdi-access-point</v-icon>
            新增粉丝
            <span class="red--text ms-4" v-if="unread.unread_followings!=0">{{ unread.unread_followings }}</span>
          </v-btn>
          <v-btn :to="{name: 'History'}"
                 block color="blue" outlined>
            <v-icon color="green">mdi-history</v-icon>
            历史记录
          </v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <router-view></router-view>
      </v-col>
      
    </v-row>
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

<style>

</style>