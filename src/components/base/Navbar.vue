<template>
  <v-app-bar app color="#00AEEC" elevate-on-scroll>
    <v-img
        :src="require('@/assets/logo.png')"
        class="mr-5"
        contain
        height="64"
        width="64"
        max-width="64"
        @click="$vuetify.goTo(0)"
    />
    <router-link :to="{ name: 'Home' }">
      <div id="main" :style="{ width: '150px', height: '40px' }"></div>
    </router-link>

    

    <router-link :to="{ name: 'Home' }">
      <v-btn text class="white--text" :style="{'font-weight': 'bold'}"> 主页</v-btn>
    </router-link>
    <v-spacer/>
    <v-text-field
        append-icon="search"
        @click:append="searchBlog"
        @keyup.enter="searchBlog"
        flat
        hide-details
        solo
        v-model="search"
        style="max-width: 300px"
        :style="{ borderRadius: '300px' }"
    />

    <v-spacer/>
    <div class="pcard d-flex flex-row-reverse">
      <router-link :to="{ name: 'Login' }">
        <v-btn text class="white--text" v-show="!sharedState.is_authenticated" :style="{'font-weight': 'bold'}"
        >登录
        </v-btn>
      </router-link>
      <v-btn
          text
          @click="handlerLogout"
          class="white--text"
          v-show="sharedState.is_authenticated"
          :style="{'font-weight': 'bold'}"
      >
        登出
      </v-btn>

      <v-btn v-if="sharedState.is_authenticated" text class="white--text" @click="getNewBlog"
             :style="{'font-weight': 'bold'}"
             @mouseenter="showEnter" @mouseleave="showLeave"> 投稿
      </v-btn>
      <router-link v-else :to="{ name: 'Login' }">
        <v-btn text class="white--text" :style="{'font-weight': 'bold'}"> 投稿</v-btn>
      </router-link>
      <v-expand-transition>
        <v-card
            mas-width="120px"
            width="120px"
            v-show="showAddPost&&sharedState.is_authenticated"
            @mouseenter="showEnter" @mouseleave="showLeave"
            class="uploadCard"
        >

          <v-card-actions>
            <v-row class="m-auto">
              <v-btn text @click="getNewBlog">上传博客</v-btn>
              <v-btn text @click="getNewResource">上传资源</v-btn>
            </v-row>
          </v-card-actions>

        </v-card>
      </v-expand-transition>
      <router-link v-if="sharedState.is_authenticated" :to="{ name: 'ReceivedComments' }">
        <v-btn text class="white--text" :style="{'font-weight': 'bold'}"> 消息
          <span v-if="newMessage!=0" id="newInfo" ><div :style="{'margin-top':'0px'}">{{ newMessage }}</div></span>
        </v-btn>
      </router-link>
      <router-link v-else :to="{ name: 'Login' }">
        <v-btn text class="white--text" :style="{'font-weight': 'bold'}"> 消息</v-btn>
      </router-link>

      <router-link v-if="!sharedState.is_authenticated" :to="{ name: 'Login' }">
        <v-btn text class="white--text" :style="{'font-weight': 'bold'}"> 空间</v-btn>
      </router-link>


      <router-link
          v-if="sharedState.is_authenticated"

          :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }"
      >
        <v-btn text class="white--text " :style="{'font-weight': 'bold'}" @click="sharedState.is_hover=false"
               @mouseenter="enter" @mouseleave="leave">
          空间
        </v-btn
        >
      </router-link>
      <!--  -->
      <v-expand-transition>
        <v-card
            max-width="250px"
            width="250px"
            class="myCard"
            v-show="sharedState.is_hover && sharedState.is_authenticated"
            @mouseenter="enter"
            @mouseleave="leave"
        >
          <v-card-title>
            <v-avatar size="80px" class="mx-auto">
              <img
                  :src="user._links.avatar"
                  class="mx-auto"
                  contain
                  height="80"
                  width="80"
                  max-width="80"
                  @click="$vuetify.goTo(0)"
              />
            </v-avatar>
          </v-card-title>
          <v-card-title>
            <h2 class="mx-auto">
              {{ user.name }}
            </h2>
          </v-card-title>

          <v-card-text>
            <v-row
                align="center"
                class="mx-auto col-md-12"
            >
              <v-col class="col-md-6 text-center">
                <h5 class="mx-auto">
                  关注
                </h5>
                <h5 class="mx-auto">{{ user.followed_num }}</h5>
              </v-col>
              <v-col class="col-md-6 text-center">
                <h5 class="mx-auto">
                  粉丝
                </h5>
                <h5>{{ user.followes_num }}
                </h5>
              </v-col>
            </v-row>

            <router-link :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }">
              <v-btn text :style="{width:'100%',}" class="mx-auto d-flex justify-start"
                     @click="sharedState.is_hover=false">
                <v-icon class="material-icons" :style="{ color: 'blue' ,'font-size': '20px','margin-top':'2px'}">
                  perm_identity
                </v-icon>
                个人空间

              </v-btn>
            </router-link>
            <router-link :to="{ name: 'DraftPosts', params: { id: sharedState.user_id } }">
              <v-btn text :style="{width:'100%' }" class="mx-auto d-flex justify-start"
                     @click="sharedState.is_hover=false">
                <!-- Contribution -->
                <v-icon class="material-icons" :style="{ color: '#FB8C00' ,'font-size': '20px','margin-top':'2px'}">
                  drafts
                </v-icon>
                我的发布

              </v-btn>
            </router-link>
            <v-btn v-if="sharedState.is_admin"
                   text :style="{width:'100%' }" class="mx-auto d-flex justify-start"
                   @click="sharedState.is_hover=false" :to="{ name: 'AdminBlogs'}">
              <!-- Contribution -->
              <v-icon class="material-icons" :style="{ color: '#FB8C00' ,'font-size': '20px','margin-top':'2px'}">
                check
              </v-icon>
              管理界面
            </v-btn>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-text>
            <v-btn text :style="{width:'100%',}" class="mx-auto d-flex justify-start" @click=" handlerLogout"
                   v-show="sharedState.is_authenticated">
              <v-icon class="material-icons">logout</v-icon>
              登出
            </v-btn>
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </div>
  </v-app-bar>
</template>
<script>
import {Account} from "@/api/account.js";
import store from "../../store.js";
import Post from "@/api/post.js";
import search from "@/components/search/Search";

export default {

  name: "Navbar",
  data() {
    return {
      search: "",
      timer: 0,
      sharedState: store.state,
      newMessage: 0,
      user: {
        username: "",
        name: "---",
        email: "",
        followed_num: '-',
        followes_num: '-',
        have_new_mail: false,
        unread_comments: 0,
        unread_followings: 0,
        unread_likes: 0,
        unread_messages: 0,
        location: "",
        about_me: "",
        headshot: "",
        member_since: "",
        last_seen: "",
        _links: {
          avatar: "---",
        },
      },
      defaultUser: {},
      showAddPost: false,
      showTimer: 0,
      timer: {}
    };
  },
  watch: {
    user: {
      handler() {
        clearInterval(this.timer);
        console.log("NEW");
        this.timer = setInterval(() => {
          if (this.sharedState.is_authenticated) {
            this.queryUser();
          }
        }, 3000);
      },
      immediate: true
    }
  },
  methods: {
    enter() {
      store.state.is_hover = true;
      console.log("true")
      clearTimeout(this.timer);
    },
    leave() {
      this.timer = setTimeout(() => {
        store.state.is_hover = false;
        console.log("false")
      }, 500);
    },
    showEnter() {
      this.showAddPost = true;
      clearTimeout(this.showTimer);
    },
    showLeave() {
      this.showTimer = setTimeout(() => {
        this.showAddPost = false;
      }, 500);
    },
    handlerLogout() {
      store.logoutAction();
      this.user = this.defaultUser;
      this.$router.push("/login");
    },
    searchBlog() {
      if(this.search=='') return false;
      console.log("searchBlog");
      this.$router.push({
        path: `/search/${this.search}/total`
      });
    },
    drawLogo() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: "BOSE",
                fontSize: 35,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "rgba(0,0,0,0.5)",
                lineWidth: 1,
              },
              keyframeAnimation: {
                duration: 3000,
                //loop: true,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: "transparent",
                      lineDashOffset: 200,
                      lineDash: [200, 0],
                      color: "#000",
                    },
                  },
                  {
                    // Stop for a while.
                    percent: 0.8,
                    style: {
                      fill: "transparent",
                    },
                  },
                  {
                    percent: 1,
                    style: {
                      fill: "rgba(255,255,255,1)",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      myChart.setOption(option);
    },
    getNewBlog() {
      Post.createBlog()
          .then((res) => {
            console.log(res);
            let curId = res.data.blog_id;
            this.$router.push({name: 'BlogAdd', params: {id: curId}});
          })
          .catch((err) => {
            console.log(err);
          })
    },
    getNewResource() {
      Post.createBlog()
          .then((res) => {
            console.log(res);
            let curId = res.data.blog_id;
            this.$router.push({name: 'ResourceAdd', params: {id: curId}});
          })
          .catch((err) => {
            console.log(err);
          })
    },
    queryUser() {
      Account.getUser(this.sharedState.user_id)
          .then((res) => {
            this.user.name = res.data.name;
            this.user.about_me = res.data.about_me;
            this.user._links.avatar = res.data.headshot;
            this.user.last_seen = res.data.last_seen;
            this.user.location = res.data.location;
            this.user.username = res.data.username;
            this.user.followed_num = res.data.followed_num;
            this.user.followes_num = res.data.followes_num;
            this.user.have_new_mail = res.data.have_new_mail;
            this.user.unread_comments = res.data.unread_comments;
            this.user.unread_followings = res.data.unread_followings;
            this.user.unread_likes = res.data.unread_likes;
            this.user.unread_messages = res.data.unread_messages;
            this.loadingProfile = false;
            this.sharedState.is_admin = res.data.if_controller;
            this.newMessage = this.user.unread_comments + this.user.unread_followings + this.user.unread_likes + this.user.unread_messages;
          })
          .catch((error) => {
            console.error(error)
          })
    }
  },
  created() {
    this.defaultUser = Object.assign({}, this.user);
  },
  mounted() {
    this.drawLogo();
    if (this.sharedState.is_authenticated) this.queryUser();
    this.timer = setInterval(() => {
      if (this.sharedState.is_authenticated) {
        this.queryUser();
      }
    }, 1000);
  },
};
</script>
<style scoped>
.router-link-active {
  text-decoration: none;
  color: yellow;
  color: #4cabeb;
}

a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.v-btn {
  text-transform: none;

  font-size: 20;
  width: 100px;
  margin-top: 5px;
  margin-bottom: 2px;
}

.pcard {
  position: relative;
  width: 750px;

}

.pcard .myCard {
  position: absolute;
  margin-right: 225px;
  margin-top: 35px;
}

.pcard .uploadCard {
  position: absolute;
  margin-right: 90px;
  margin-top: 35px;
}

span#newInfo {
  background-color: #fe2d46;
  width: 20px;
  height: 20px;
  bottom: 0px;
  position:absolute;
  border-radius: 10px;
  font-size: 13px;
  line-height: 20px;
  z-index:2001;
  left:60px;
  text-align: center;
  color: rgb(255, 255, 255);
}

hr.mx-4.v-divider.theme--light {
  margin-top: -10px;
  margin-bottom: -10px;
}
</style>

