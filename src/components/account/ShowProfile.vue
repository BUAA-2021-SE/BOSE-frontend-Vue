<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingProfile">
          个人信息加载中
          <v-progress-circular
            class="center"
            indeterminate
            color="primary"
            :size="40"
            :width="3"
          ></v-progress-circular>
        </h3>
      </div>
      <v-card shaped elevation='12'>
        <div
        
          v-show="!loadingProfile"
        >
          <!-- v-divider vertical useless -->
          <div class="col-sm-9">
            <!-- Username -->
            <v-card-title>
              <h2 v-if="user.name">
                {{ user.name }}
              </h2>
              <h2 v-else>
                {{ user.username }}
              </h2>
            </v-card-title>
          </div>
        <v-card-subtitle>
          <div
           
          >
            <h6
              v-show="!this.loadingProfile"
            >
              <v-icon>verified
              </v-icon>
              认证用户
            </h6>
          </div>
          <!-- End Username -->

         

          <!-- Last seen -->
          <h6 v-if="user.last_seen" >
            <v-icon>visibility</v-icon>
            上次查看 : {{ $moment(user.last_seen).fromNow() }}
          </h6>
          <!-- End Last seen -->

          <!-- User Info -->
          <a
            
              :href="'mailto:' + user.email"
              >
          <h6
            v-if="user.email"
           
            v-show="!this.loadingProfile"
          >
           
           <v-icon>attach_email</v-icon>
            {{ user.email }}
          </h6>
          </a
            >
          <!-- End User Info -->

          <!-- Location -->
          <h6 v-if="user.location" >
            <v-icon>place</v-icon>
            {{ user.location }}
          </h6>
          <!-- End Location -->
        </v-card-subtitle>
          <v-card-text v-if="user.about_me">
            <div
            
            >
             
            </div>
            <p >{{ user.about_me }}</p>
          </v-card-text>
        </div>
      </v-card>
    </div>
  </section>
</template>

<script>
import { Account } from "@/api/account.js";
import store from "@/store.js";

export default {
  name: "ShowProfile",
  inject: ["reload"],
  data() {
    return {
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
    };
  },
  methods: {
    getUserDetail(id) {
      Account.getUser(id)
        .then((res) => {
          console.log(res.data);
          this.user.name = res.data.name;
          this.user.email = res.data.email;
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
  },
  created() {
    this.getUserDetail(this.$route.params.id);
    console.log("created");
  },
  beforeRouteUpdate(to, from, next) {
    console.log("routerUpdate");
    next();
    this.getUserDetail(to.params.id);
  },
};
</script>

<style scoped>
</style>
