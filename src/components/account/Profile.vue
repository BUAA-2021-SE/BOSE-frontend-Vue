<template>
  <section>
    <div class="container">
      <div class="text-center">
      
    <h1 v-show="this.loadingProfile"> 努力加载······ <v-progress-circular
       class="center"
      indeterminate
      color="primary"
      :size="70"
      :width="7"
      v-show="this.loadingProfile"
    ></v-progress-circular></h1>
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
            </div>
            <!--Change User Image-->
            <!-- User Image -->
            <!-- Actions -->
            <!-- End Actions -->
          </div>
           <!-- v-divider vertical useless -->
          <div class="col-sm-9">
            <!-- Username -->
          <v-tabs  fixed-tabs>
          <v-tab :to="{name: 'ShowProfile', params: {id: this.$route.params.id}}" >Profile</v-tab>
          <v-tab :to="{name: 'Followers', params: {id: this.$route.params.id}}" > Followers</v-tab>
          <v-tab :to="{name: 'Following', params: {id: this.$route.params.id}}" > Following</v-tab>
          <v-tab :to="{name: 'Posts', params: {id: this.$route.params.id}}"> Posts</v-tab>
          </v-tabs>
          <router-view></router-view>
            
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Account } from "@/api/account.js";
import store from "@/store.js";
import axios from 'axios'
export default {
  name: "Profile",
  data() {
    
    return {
      pictureURL:'',
       imageUrl: '',
      sharedState: store.state,
      loadingProfile: true,
       
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
                this.$refs.upload_input.click () // 通过 ref 模拟点击
            },
      select_file(file) {
            this.select_file_data = file.target.files
            console.log(this.select_file_data)
            let uploads = new FormData () // 创建 FormData
            let config = { headers: { "Content-Type": "multipart/form-data" } }
            if (this.select_file_data != "") {
                uploads.append ("picture",this.select_file_data[0]) // 此处只展示上传单个文件
                axios.post(this.target_url, uploads, config)
                .then((res)=> {
                    console.log(res.data)
                })
                .catch((err)=> {
                    console.log(err)
                })
            }
            this.getUserDetail()
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
          let welcome = `Welcome back, ${this.user.name}`;
          if(this.sharedState.user_id!=this.$route.params.id) 
          welcome = `Welcome to ${this.user.name||this.username}'s profile.`;
          this.$toasted.success(`${welcome}`, {
            icon: "check",
            fullWidth: true,
            position: "bottom-center",
          });
          this.loadingProfile = false;
        })
        .catch((err) => {
          console.log((err, "getUserDetailError"));
        });
    },


    //  handleelchange(file) {
    //    Account.postPicture(this.$route.params.id,file)
    //    .then(res => { console.log(res) })
    // },


  },
  created() {
    // this.$router.push({name: 'ShowProfile', params: {id: this.$route.params.id}})
    this.getUserDetail();
    // this.pictureURL="http://43.138.58.36:8000/user/post_picture/"+this.$route.params.id;
  },
};
</script>

<style scoped>

</style>