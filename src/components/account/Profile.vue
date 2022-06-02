<template>
  <section>
    <div class="container">
      <div class="text-center">

        <h1 v-show="this.loadingProfile"> 努力加载······
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="70"
              :width="7"
              v-show="this.loadingProfile"
          ></v-progress-circular>
        </h1>
      </div>
      <div v-show="!this.loadingProfile">
        <div class="row" >
          <v-col cols="12" md="3">
            
            <v-card outlined>
            <!-- User Image -->
      
              <v-img
                  v-if="user._links.avatar"
                  class="img-fluid w-80"
                  :src="user._links.avatar"
                  alt="Image Description"
              />
             <v-spacer></v-spacer>
            <!--Change User Image-->
            <!-- User Image -->
            <!-- Actions -->
            <!-- End Actions -->
            <v-card-title><h3>{{user.name}}</h3></v-card-title>
            <v-card-subtitle><p>{{user.about_me}}</p></v-card-subtitle>
             <v-divider class="mx-4" v-if="$route.params.id == sharedState.user_id"></v-divider>
            <v-row class="justify-center">
            <v-btn  v-if="$route.params.id == sharedState.user_id" text @click="toEditProfile" class="d-flex justify-start">
               <v-icon :style="{ color: 'brown' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">edit</v-icon>
                修改信息
            </v-btn>
            <v-btn
                v-if="$route.params.id == sharedState.user_id" class="d-flex justify-start"
                text @click="addFile">
               <v-icon :style="{ color: 'CornflowerBlue' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">image</v-icon>
              更换头像
            </v-btn>
            <input type="file" ref="upload_input" style="display: none;" @change="select_file" accept=".png,.jpg,.jpeg">

              <v-btn
                 class="d-flex justify-start"
                :to="{name: 'ShowProfile', params: {id: this.$route.params.id}}"
                text >
               <v-icon :style="{ color: 'grey' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">notes</v-icon>
              个人信息
            </v-btn>
            <v-btn
                 class="d-flex justify-start"
                :to="{name: 'Followers', params: {id: this.$route.params.id}}"
                text >
               <v-icon class="material-icons" :style="{ color: 'LightPink' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">groups</v-icon>
              粉丝
            </v-btn>

            <v-btn
                 class="d-flex justify-start"
                :to="{name: 'Following', params: {id: this.$route.params.id}}"
                text >
               <v-icon class="material-icons"  :style="{ color: 'Gold' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">tips_and_updates</v-icon>
              关注
            </v-btn>

            <v-btn
                v-if="sharedState.user_id!=$route.params.id" :to="{name: 'ProfilePosts', params: {id: this.$route.params.id}}"
                text
                class="d-flex justify-start" >
               <v-icon class="material-icons"  :style="{ color: 'DarkMagenta' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">bookmarks</v-icon>
              博文
            </v-btn>
            <v-btn v-if="ifFollow && $route.params.id != sharedState.user_id" @click="onUnFollowUser()" text class="d-flex justify-start">
           <v-icon class="material-icons"  :style="{ color: 'DarkSeaGreen' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">
            person_remove_alt_1
            </v-icon>
              取消关注
            </v-btn>
            <v-btn v-if="!ifFollow && $route.params.id != sharedState.user_id" @click="onFollowUser()" text class="d-flex justify-start">
              <v-icon class="material-icons"  :style="{ color: 'DarkTurquoise' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">
            person_add_alt_1
            </v-icon>
              立刻关注
            </v-btn>
            <v-btn v-if="$route.params.id != sharedState.user_id" text class="d-flex justify-start"
            :to="{name: 'HistoryMessage',params: {id: this.$route.params.id}}"
            >
            <v-icon class="material-icons"  :style="{ color: 'DarkTurquoise' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">
            message
            </v-icon>
              私信交流
            </v-btn>

           <v-btn v-if="ifBlock && $route.params.id != sharedState.user_id" @click="onUnblockUser()" text class="d-flex justify-start">
           <v-icon class="material-icons"  :style="{ color: 'DarkSeaGreen' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">
            supervised_user_circle
            </v-icon>
              取消拉黑
            </v-btn>
            <v-btn v-if="!ifBlock && $route.params.id != sharedState.user_id" @click="onBlockUser()" text class="d-flex justify-start">
              <v-icon class="material-icons"  :style="{ color: 'red' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">
            block
            </v-icon>
              果断拉黑
            </v-btn>

              <v-btn v-if="$route.params.id == sharedState.user_id"  :to="{name: 'BlackList', params: {id: this.$route.params.id}}" text class="d-flex justify-start">
              <v-icon class="material-icons"  :style="{ color: 'red' ,'font-size': '20px','margin-top':'2px','margin-right':'3px'}">
            block
            </v-icon>
              黑名单
            </v-btn>

            </v-row>
            </v-card>
          </v-col>
          <!-- v-divider vertical useless -->
          <v-col cols="12" md="9">
            <!-- Username -->
            <router-view/>
            </v-col>
          </div>
          
        </div>
      
      </div>
    
  </section>
</template>

<script>
import {Account} from "@/api/account.js";
import Followers from "@/api/follower.js";
import store from "@/store.js";
export default {
  name: "Profile",
  inject: ['reload'],
  data() {
    return {
      pictureURL: '',
      imageUrl: '',
      sharedState: store.state,
      loadingProfile: true,
      select_file_data: "",
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
      ifFollow: true,
      ifBlock:false,
      curId:0
    };
  },
  methods: {
    toEditProfile(){
        this.$router.push({name: 'EditProfile'})
    },
    addFile() {
      this.$refs.upload_input.click() // 通过 ref 模拟点击
    },
    select_file(file) {
      this.select_file_data = file.target.files
      console.log(this.select_file_data)
      let uploads = new FormData()
      if (this.select_file_data != "") {
        this.loadingProfile = true;
        uploads.append("picture", this.select_file_data[0])
        Account.postPicture(this.$route.params.id, uploads)
            .then((res) => {
              console.log(res.data)
              this.loadingProfile = true;
              this.getUserDetail(this.sharedState.user_id).then(() => {
                this.reload();
              })
            })
            .catch((err) => {
              console.log(err)
            })
      }
    },
    getUserDetail(id) {
      Account.getUser(id)
          .then((res) => {
            console.log(this.$route.params);
            console.log(res.data);
            this.user.name = res.data.name;
            this.user.about_me = res.data.about_me;
            this.user._links.avatar = res.data.headshot;
            this.user.last_seen = res.data.last_seen;
            this.user.location = res.data.location;
            this.user.username = res.data.username;
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log((err, "getUserDetailError"));
          });
    },
    getIfFollow(id) {
      console.log("Get if-follow")
      Followers.isFollow(id)
          .then((res) => {
            console.log(res.data);
            this.ifFollow = res.data;
            console.log(res, "getIfFollow");
          })
          .catch((err) => {
            console.error(err);
          })
    },
    getIfBlock(id) {
      console.log("Get if-follow")
      Followers.isBlock(id)
          .then((res) => {
            console.log(res.data);
            this.ifBlock = res.data;
            console.log(res, "getIfBlock");
          })
          .catch((err) => {
            console.error(err);
          })
    },
    onFollowUser() {
      if(this.ifBlock){
        this.$toasted.error('人家在你小黑屋里面捏~', {icon: 'error_outline'});
      }
      else{
      Followers.follow(this.$route.params.id)
          .then((res) => {
            console.log(res, "followUser");
            this.ifFollow = true
            this.$router.push({name: 'ShowProfile', params: {id: this.$route.params.id}})
          })
          .catch((err) => {
            console.error(err);
          })
      }
    },
    onUnFollowUser() {
      if(this.ifBlock){
        this.$toasted.error('人家在你小黑屋里面捏~', {icon: 'error_outline'});
      }
      else{
      Followers.unFollow(this.$route.params.id)
          .then((res) => {
            console.log(res, "unfollowUser");
            this.ifFollow = false;
            this.$router.push({name: 'ShowProfile', params: {id: this.$route.params.id}})
          })
          .catch((err) => {
            console.error(err);
          })
      }
    },
    onBlockUser() {
      Followers.block(this.$route.params.id)
          .then((res) => {
            console.log(res, "blockUser");
            this.ifBlock = true;
            this.ifFollow = false;
            this.$router.push({name: 'ShowProfile', params: {id: this.$route.params.id}})
          })
          .catch((err) => {
            console.error(err);
          })
    },
    onUnblockUser() {
      Followers.unBlock(this.$route.params.id)
          .then((res) => {
            console.log(res, "unblockUser");
            this.ifBlock = false;
            this.$router.push({name: 'ShowProfile', params: {id: this.$route.params.id}})
          })
          .catch((err) => {
            console.error(err);
          })
    },
  },
  created() {
    this.getUserDetail(this.$route.params.id);
    this.getIfFollow(this.$route.params.id);
    this.getIfBlock(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserDetail(to.params.id)
    this.getIfFollow(this.$route.params.id);
    this.getIfBlock(this.$route.params.id);
    this.reload();
  },
};
</script>

<style scoped>
.v-tab {
  text-transform: none;
}
</style>
<style scoped>
.router-link-active {
  text-decoration: none;
  color: rgb(0, 0, 0);
  color: #000000;
}
.v-application a {
  text-decoration: none;
  color: rgb(0, 0, 0)!important;
}
.v-btn {
  text-transform: none;
  font-size: 20;
  width: 80%;
  margin-top: -13px;
  margin-bottom: 18px;
}
span.v-btn__content{
  justify-content: space-between;
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
  
}
</style>
