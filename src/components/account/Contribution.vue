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
        <div class="row">
          <div class="col-sm-3 g-mb-40 g-mb-0--lg">
            <!-- User Image -->
            <div class="g-mb-20">
              <img
                  v-if="user._links.avatar"
                  class="img-fluid w-100"
                  :src="user._links.avatar"
                  alt="Image Description"
              >
              <button></button>
            </div>
            <!--Change User Image-->
            <!-- User Image -->
            <!-- Actions -->
            <!-- End Actions -->
            <v-btn text>
              <router-link
                  v-show="!this.loadingProfile"
                  v-if="$route.params.id == sharedState.user_id"
                  :to="{ name: 'EditProfile' }"
                  class="
                  btn btn-block
                  u-btn-outline-primary
                  g-rounded-50 g-py-12 g-mb-10
                "
              >
                <i class="icon-user-follow g-pos-rel g-top-1 g-mr-5"></i> Edit
                Profile
              </router-link>
            </v-btn>
            <v-btn
                v-if="$route.params.id == sharedState.user_id"
                text @click="addFile">
              <i class="icon-user-follow g-pos-rel g-top-1 g-mr-5"></i> Change
              Avatar
            </v-btn>
            <input type="file" ref="upload_input" style="display: none;" @change="select_file" accept=".png,.jpg,.jpeg">
            <v-btn v-if="!ifFollow && $route.params.id != sharedState.user_id" @click="onFollowUser()">
              <i class="icon-user-follow g-pos-rel g-top-1 g-mr-5"></i> Follow
            </v-btn>
            <v-btn v-if="ifFollow && $route.params.id != sharedState.user_id" @click="onUnFollowUser()">
              <i class="icon-user-unfollow g-pos-rel g-top-1 g-mr-5"></i> Unfollow
            </v-btn>
          </div>
          <!-- v-divider vertical useless -->
          <div class="col-sm-9">
            <!-- Username -->
            <v-tabs fixed-tabs>
              <v-tab :to="{name: 'Posts', params: {id: this.$route.params.id}}">Posts</v-tab>
              <v-tab :to="{name: 'Drafts', params: {id: this.$route.params.id}}"> Drafts</v-tab>
              <v-tab :to="{name: 'Resources', params: {id: this.$route.params.id}}"> Resources</v-tab>
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
  name: "Contribution",
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
      ifFollow: true
    };
  },
  methods: {
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
    this.getUserDetail(this.$route.params.id);
    this.getIfFollow(this.$route.params.id)
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