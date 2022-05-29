<template>
  <div>
    <v-card outlined class="mx-auto">
      <v-row>
          <v-col class="d-flex justify-center my-auto" cols="12" md="2" >
              <router-link :to="{ name: 'ShowProfile',params: { id:followers.id} }">
               <v-avatar
                      size="70px"
                  >
       <v-img
          :src="followers.headshot"
          class="my-auto"
          contain
          height="70"
          max-width="70"
          max-height="70"
         
         
        />
               </v-avatar>
               </router-link>
        </v-col>
        
        <v-col cols="12" md="6">
        
        <v-card-title>
             <router-link :to="{ name: 'ShowProfile',params: { id:followers.id} }">
          <h3>{{ followers.username }}</h3>
          </router-link>
        </v-card-title>
      
      <v-card-text>
      
        <div class="text--primary" v-if="followers.about_me.length<30">
          {{ followers.about_me }}
        </div>
        <div class="text--primary" v-else>
          {{ followers.about_me.substring(0, 27)+'...'}}
        </div>
      </v-card-text>
      </v-col>
    
        <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="2" class="my-auto">
            <v-btn depressed :style="{color: 'Gray',width:'100px'}" v-show="(followers.current_user_to_user&&followers.user_to_current_user)" @click="onUnFollowUser(followers.id)" >
                 <v-icon class="material-icons" >notes</v-icon>已互粉
            </v-btn>
             <v-btn outlined :style="{color: 'Gray',width:'100px'}" v-show="(!followers.current_user_to_user)" @click="onFollowUser(followers.id)">
                <v-icon class="material-icons" >check</v-icon>关注
            </v-btn>
             <v-btn depressed :style="{color: 'DimGray',width:'100px'}" v-show="(followers.current_user_to_user&&(!followers.user_to_current_user))" @click="onUnFollowUser(followers.id)">
                <v-icon class="material-icons" >notes</v-icon>已关注
            </v-btn>
          </v-col>
        </v-row>

    </v-card>
    <!-- <v-dialog
      style="z-index: 2000"
      v-model="showDelete"
      width="25vw"
      height="20vh"
    >
      <v-card
        :style="{ width: '25vw', height: '12vh' }"
        class="d-flex align-content-end flex-wrap"
      >
        <v-card-title class="mx-auto"> 确定删除？ </v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="showDelete = false"> 退出 </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="onDeletePost"> 确认 </v-btn>
        </v-card-actions>
       
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import store from "@/store.js";
import Followers from "@/api/follower.js";
export default {
  name: "FollowerItem",
  props: ["followers"],
  data() {
    return {
      sharedState: store.state,
    };
  },
  methods: {
      toProfile(id){
          this.$router.push({name: 'ShowProfile', params: {id: id}})
      },
      onFollowUser(id) {
          
      Followers.follow(id)
          .then((res) => {
            console.log(res, "followUser");
            
            this.followers.current_user_to_user=true;
          })
          .catch((err) => {
              if(err.response.status==460){
            this.$toasted.error("不能关注自己.", {
              icon: "priority_high",
            });
              }
            console.error(err);
          })
    },
    onUnFollowUser(id) {
      Followers.unFollow(id)
          .then((res) => {
            console.log(res, "unfollowUser");
            this.followers.current_user_to_user=false;
          })
          .catch((err) => {
            console.error(err);
          })
    }
  },
};
</script>
<style scoped>
.router-link-active {
  text-decoration: none;
}
h3{
  margin-top:0px!important;
  padding-top:0px!important;
}
a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.v-card__title {
  color: #3c80de;
}
.v-avatar{
     pointer-events:auto;
}

</style>
