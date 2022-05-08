<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2" />

      <div class="col-md-8">
        <h1><center>Edit Your Profile</center></h1>
        <form @submit.prevent="onSubmit">
          <!-- <div class="form-group">
            <label for="name">Real Name</label>
            <input type="text" v-model="profileForm.name" class="form-control" id="name" placeholder="">
          </div> -->
          <label for="name">Real Name</label>
          <v-text-field
            v-model="profileForm.name"
            outlined
            clearable
            dense
            placeholder=""
          ></v-text-field>

          <label for="location">Location</label>
          <!-- <input type="text" v-model="profileForm.location" class="form-control" id="location" placeholder=""> -->
          <v-text-field
            v-model="profileForm.location"
            outlined
            clearable
            dense
            placeholder=""
          ></v-text-field>

           
            <label for="about_me">About Me</label>
            <mavon-editor v-model="profileForm.about_me" />
          <br/>
          <v-row class="col-md-12">
            <v-col class="col-md-2 text-left">
          <button type="submit" class="btn btn-primary align-left">Submit</button>
            </v-col>
            <v-col class="col-md-8"/>
            <v-col class="col-md-2 text-right">
          <button @click="returnProfile" class="btn btn-primary text-right">Cancel</button>
       </v-col>
          </v-row>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store.js";
import { Account } from "@/api/account.js";
export default {
  name: "EditProfile",
  data() {
    return {
      sharedState: store.state,
      profileForm: {
        name: "",
        location: "",
        about_me: "",
        submitted: false, // 是否点击了 submit 按钮
      },
    };
  },
  methods: {
    getUserDetail() {
      console.log("getUserDetail", this.sharedState.user_id);
      Account.getUser(this.$route.params.id)
        .then((res) => {
          console.log(res, "getUserDetail");
          this.profileForm.name = res.data.name;
          this.profileForm.location = res.data.location;
          this.profileForm.about_me = res.data.about_me;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    returnProfile() {
     this.$router.push({
            name: "ShowProfile",
            params: { id: this.sharedState.user_id },
          });
        
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("name", this.profileForm.name);
      formData.append("location", this.profileForm.location);
      formData.append("about_me", this.profileForm.about_me);
      Account.editUser(formData)
        .then((res) => {
          console.log(res);
          this.$toasted.success("Successfully modify your profile.", {
            icon: "check",
          });
          this.$router.push({
            name: "ShowProfile",
            params: { id: this.sharedState.user_id },
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    console.log(this.sharedState.user_id, "123");
    this.getUserDetail();
  },
};
</script>

<style>
</style>