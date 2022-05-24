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
      <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40" v-show="!this.loadingProfile">
        <div class="row" >
          <div class="col-sm-3 g-mb-40 g-mb-0--lg">
            
            <v-card>
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
            <v-row class="justify-center">
            <v-btn  v-if="$route.params.id == sharedState.user_id" text @click="toEditProfile" class="d-flex justify-space-between">
               <v-icon>edit</v-icon>
                Edit Profile
           
            </v-btn>
            <v-btn
                v-if="$route.params.id == sharedState.user_id" class="d-flex justify-space-between"
                text @click="addFile">
               <v-icon>image</v-icon>
              Change Avatar
            </v-btn>
            <input type="file" ref="upload_input" style="display: none;" @change="select_file" accept=".png,.jpg,.jpeg">
            <v-btn v-if="!ifFollow && $route.params.id != sharedState.user_id" @click="onFollowUser()" text class="d-flex justify-space-between">
              <v-icon class="material-icons">
            person_add_alt_1
            </v-icon>
              Follow
            </v-btn>
            <v-btn v-if="ifFollow && $route.params.id != sharedState.user_id" @click="onUnFollowUser()" text class="d-flex justify-space-between">
           <v-icon class="material-icons">
            person_remove_alt_1
            </v-icon>
              Unfollow
            </v-btn>
            </v-row>
            </v-card>
          </div>
          <!-- v-divider vertical useless -->
          <div class="col-sm-9">
            <!-- Username -->
            <v-tabs fixed-tabs>
              <v-tab :to="{name: 'ShowProfile', params: {id: this.$route.params.id}}">Profile</v-tab>
              <v-tab :to="{name: 'Followers', params: {id: this.$route.params.id}}">Followers</v-tab>
              <v-tab :to="{name: 'Following', params: {id: this.$route.params.id}}">Following</v-tab>
              <v-tab v-if="sharedState.user_id!=curId" :to="{name: 'ProfilePosts', params: {id: this.$route.params.id}}">Posts</v-tab>
            </v-tabs>
            <router-view/>
            
          </div>
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
    onFollowUser() {
      Followers.follow(this.$route.params.id)
          .then((res) => {
            console.log(res, "followUser");
            this.ifFollow = true
            this.$router.push({name: 'ShowProfile', params: {id: this.$route.params.id}})
          })
          .catch((err) => {
            console.error(err);
          })
    },
    onUnFollowUser() {
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
  created() {
    this.curId = this.$route.params.id;
    this.getUserDetail(this.curId);
    this.getIfFollow(this.curId)
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserDetail(to.params.id)
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
  font-weight: bold;
  font-size: 20;
  width: 80%;
}
span.v-btn__content{
  justify-content: space-between;
}
</style>