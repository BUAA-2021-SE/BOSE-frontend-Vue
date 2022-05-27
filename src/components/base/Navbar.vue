<template>
  <v-app-bar app color="#4cabeb" elevate-on-scroll>
    <router-link :to="{ name: 'Home' }">
      <div id="main" :style="{ width: '150px', height: '40px' }"></div>
    </router-link>

    <v-img
        :src="require('@/assets/logo.png')"
        class="mr-5"
        contain
        height="48"
        width="48"
        max-width="48"
        @click="$vuetify.goTo(0)"
    />

    <router-link :to="{ name: 'Home' }">
      <v-btn text class="white--text"> 主页</v-btn>
    </router-link>
    <v-spacer/>
    <v-text-field
        append-icon="mdi-magnify"
        @click:append="searchBlog"
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
        <v-btn text class="white--text" v-show="!sharedState.is_authenticated"
        >Login
        </v-btn>
      </router-link>


      <v-btn
          text
          @click="handlerLogout"
          class="white--text"
          v-show="sharedState.is_authenticated"
      >
        登出
      </v-btn>

      <v-btn v-if="sharedState.is_authenticated" text class="white--text" @click="getNewBlog"> 投稿</v-btn>
      <router-link v-else :to="{ name: 'Login' }">
        <v-btn text class="white--text"> 投稿</v-btn>
      </router-link>

      <router-link v-if="sharedState.is_authenticated" :to="{ name: 'ReceivedComments' }">
        <v-btn text class="white--text"> 消息
        <span v-if="newMessage!=0" class="red--text ms-1">{{newMessage}}</span>
        </v-btn>
      </router-link>
      <router-link v-else :to="{ name: 'Login' }">
        <v-btn text class="white--text"> 消息 </v-btn>
      </router-link>

      <router-link v-if="!sharedState.is_authenticated" :to="{ name: 'Login' }">
        <v-btn text class="white--text"> 空间</v-btn>
      </router-link>


      <router-link
          v-if="sharedState.is_authenticated"

          :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }"
      >
        <v-btn text class="white--text " @click="sharedState.is_hover=false" @mouseenter="enter" @mouseleave="leave">
          空间
        </v-btn
        >
      </router-link>
  <!--  -->
      <v-expand-transition>
        <v-card
            max-width="350"
          v-show="sharedState.is_hover && sharedState.is_authenticated"
            @mouseenter="enter"
            @mouseleave="leave"
        >
          <v-card-title>
            <img
                :src="user._links.avatar"
                class="mx-auto"
                contain
                height="60"
                width="60"
                max-width="60"
                @click="$vuetify.goTo(0)"
            />
          </v-card-title>
          <v-card-title>
            <h2 class="mx-auto">
              {{user.name}}
            </h2>
          </v-card-title>

          <v-card-text>
            <v-row
                align="center"
                class="mx-auto col-md-12"
            >
              <v-col class="col-md-6">
                <h4 class="mx-auto">
                  关注:{{user.followed_num}}
                </h4>
              </v-col>
              <v-col class="col-md-6">
                <h4 class="mx-auto">
                  粉丝:{{user.followes_num}}
                </h4>
              </v-col>
            </v-row>

            <router-link :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }">
              <v-btn text :style="{width:'100%',}" class="mx-auto d-flex justify-start" @click="sharedState.is_hover=false" >
                <v-icon class="material-icons">perm_identity</v-icon>
              个人空间
             
              </v-btn>
            </router-link>
            <router-link :to="{ name: 'Drafts', params: { id: sharedState.user_id } }">
              <v-btn text :style="{width:'100%' ,}" class="mx-auto d-flex justify-start" @click="sharedState.is_hover=false">
                <!-- Contribution -->
                <v-icon class="material-icons">drafts</v-icon>
              我的发布
      
              </v-btn>
            </router-link>

          <router-link :to="{ name: 'Home', }">
              <v-btn text :style="{width:'100%'}" class="mx-auto d-flex justify-start" @click="sharedState.is_hover=false">
              <v-icon class="material-icons">textsms</v-icon>
              我的消息
              <div class="ml-auto" id="newInfo">1</div>
              </v-btn>
            </router-link>
<!-- 
            <router-link :to="{ name: 'Home', }">
              <v-btn text :style="{width:'100%'}" class="mx-auto d-flex justify-start" @click="sharedState.is_hover=false">
                Home
              </v-btn>
            </router-link> -->

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

export default {

  name: "Navbar",
  data() {
    return {
      search: "",
      timer: 0,
      sharedState: store.state,
      newMessage:0,
       user: {
        username: "",
        name: "",
        email: "",
        followed_num:0,
        followes_num:0,
        have_new_mail:false,
        unread_comments:0,
        unread_followings:0,
        unread_likes:0,
        unread_messages:0,
        location: "",
        about_me: "",
        headshot: "",
        member_since: "",
        last_seen: "",
        _links: {
          avatar: "",
        },
      },
    };
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

    handlerLogout() {
      store.logoutAction();
      this.$router.push("/login");
    },
    searchBlog() {
      console.log("searchBlog");
      store.keyword = this.search;
      this.$router.push({
        path: `/search/${this.search}`
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
            this.$router.push({name: 'PostAdd', params: {id: curId}});
          })
          .catch((err) => {
            console.log(err);
          })
    },
  },
  mounted() {
    this.drawLogo();
    setInterval(()=>{
      Account.getUser(this.sharedState.user_id)
      .then((res) => {
        console.log(res.data)
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
            
        this.newMessage = this.user.unread_comments + this.user.unread_followings + this.user.unread_likes + this.user.unread_messages;
      })
      console.log("interval",this.newMessage);
    },10000);
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
  font-weight: bold;
  font-size: 20;
  width: 100px;
  margin-top: 5px;
  margin-bottom:2px;
}

.pcard {
  position: relative;
  width: 750px;

}

.pcard .v-card {
  position: absolute;
  margin-right: 220px;
  margin-top: 35px;
}
div#newInfo{
    background-color: #fe2d46;
    width: 20px;
    height: 20px;
    bottom:0px;
    border-radius: 10px;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: rgb(255, 255, 255); 
}
hr.mx-4.v-divider.theme--light{
  margin-top:-10px;
  margin-bottom: -10px;
}
</style>

