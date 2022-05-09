<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="this.loadingProfile">
          个人信息加载中<v-progress-circular
            class="center"
            indeterminate
            color="primary"
            :size="40"
            :width="3"
          ></v-progress-circular>
        </h3>
      </div>
      <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40"  v-show="!this.loadingProfile">
        <!-- v-divider vertical useless -->
        <div class="col-sm-9" >
          <!-- Username -->
          <div
            class="d-flex align-items-center justify-content-sm-between g-mb-5"
          >
            <h2 v-if="user.name" class="g-font-weight-300 g-mr-10">
              {{ user.name }}
            </h2>
            <h2 v-else class="g-font-weight-300 g-mr-10">
              {{ user.username }}
            </h2>
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
          </div>
        </div>
        <div
          class="d-flex align-items-center justify-content-sm-between g-mb-5"
        >
          <h4
            class="h6 g-font-weight-300 g-mb-10"
            v-show="!this.loadingProfile"
          >
            <i
              class="icon-check g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5"
              v-show="!this.loadingProfile"
            ></i>
            Verified User
          </h4>
         
        </div>
        <!-- End Username -->

        <!-- Member since -->
        <h4 v-if="user.member_since" class="h6 g-font-weight-300 g-mb-10">
          <i
            class="icon-badge g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5"
          ></i>
          Member since : {{ $moment(user.member_since).format("LLL") }}
        </h4>
        <!-- End Member since -->

        <!-- Last seen -->
        <h4 v-if="user.last_seen" class="h6 g-font-weight-300 g-mb-10">
          <i class="icon-eye g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5"></i>
          Last seen : {{ $moment(user.last_seen).fromNow() }}
        </h4>
        <!-- End Last seen -->

        <!-- User Info -->
        <h4
          v-if="user.email"
          class="h6 g-font-weight-300 g-mb-10"
          v-show="!this.loadingProfile"
        >
          <i
            class="icon-link g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5"
          ></i>
          <a
            class="g-color-main g-color-primary--hover"
            :href="'mailto:' + user.email"
            >{{ user.email }}</a
          >
        </h4>
        <!-- End User Info -->

        <!-- Location -->
        <h4 v-if="user.location" class="h6 g-font-weight-300 g-mb-10">
          <i
            class="
              icon-location-pin
              g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5
            "
          ></i>
          {{ user.location }}
        </h4>
        <!-- End Location -->

        <div v-if="user.about_me">
          <div
            class="
              u-divider u-divider-db-dashed u-divider-center
              g-brd-gray-light-v2 g-mt-50 g-mb-20
            "
          >
            <i
              class="
                u-divider__icon u-divider__icon--indented
                g-bg-gray-light-v4 g-color-gray-light-v1
                rounded-circle
              "
              >Me</i
            >
          </div>
          <p class="lead g-line-height-1_8">{{ user.about_me }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Account } from "@/api/account.js";
import store from "@/store.js";
export default {
  name: "ShowProfile",
  data() {
    return {
      sharedState: store.state,
      loadingProfile: true,
      select_file_data: "",
      target_url: 'http://43.138.58.36:8000/user/post_picture/'+ this.$route.params.id,
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
    };
  },
  methods: {
     addFile(){
                this.$refs.upload_input.click () 
            },
      select_file(file) {
            this.select_file_data = file.target.files
            console.log(this.select_file_data)
            let uploads = new FormData ()
            if (this.select_file_data != "") {
              this.loadingProfile = true;
              Account.getUser(this.$route.params.id)
                uploads.append ("picture",this.select_file_data[0])
                Account.postPicture(this.$route.params.id,uploads)
                .then((res)=> {
                    console.log(res.data)
                    this.loadingProfile = false;
                    // this.$router.push({name: 'Profile', params: {id: this.$route.params.id}})
                })
                .catch((err)=> {
                    console.log(err)
                })
            }
            
    },
    getUserDetail() {
      Account.getUser(this.$route.params.id)
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
  },
  created() {
    this.getUserDetail();
  },
};
</script>

<style>
</style>