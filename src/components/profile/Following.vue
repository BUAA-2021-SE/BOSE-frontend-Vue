<template>
<section>
    <div class="container">
      <div class="text-center">
    <h3 v-show="this.loadingProfile"> 关注列表加载中<v-progress-circular
       class="center"
      indeterminate
      color="primary"
      :size="40"
      :width="3"
      v-show="this.loadingProfile"
    ></v-progress-circular></h3>
      </div>
    </div>
      <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40" v-show="!this.loadingProfile">
        
        <!-- <ul v-bind="this.followers">
        <li v-for="follower in this.followers">
          {{ follower.message }}
        </li>
        </ul> -->
              
              
              
              
              
              
              <h1>aaaa</h1>
          </div>
        
    
  </section>
</template>

<script>
import { Account } from "@/api/account.js";
import store from "@/store.js";
export default {
  name: 'Followers',
  components: {
      
  },
  data(){
      return {
            followers: [],
            loadingProfile: true,
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
      }
  },
  methods:{
     
  getUserFollowers() {
      Account.getUserFollowers(this.$route.params.id)
        .then((res) => {
          console.log(this.$route.params);
          console.log(res.data.length);
          this.followers = res.data;
          this.loadingProfile = false;
        })
        .catch((err) => {
          console.log((err, "getUserFollowersError"));
        });
    },
},
created() {
    this.getUserFollowers();
  },
}
</script>
