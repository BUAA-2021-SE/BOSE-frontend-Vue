<template>
  <div class="container">
    
    <div class="row">
      <div class="col-md-2"/>
      
      <div class="col-md-8">
        <h1>Edit Your Profile</h1>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="name">Real Name</label>
            <input type="text" v-model="profileForm.name" class="form-control" id="name" placeholder="">
          </div>
          <div class="form-group">
            <label for="location">Location</label>
            <input type="text" v-model="profileForm.location" class="form-control" id="location" placeholder="">
          </div>
          <div class="form-group">
            <label for="about_me">About Me</label>
            <mavon-editor v-model="profileForm.about_me"/>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store.js'
import { Account } from "@/api/account.js";
export default {
    name:'EditProfile',
    data(){
        return{
            sharedState: store.state,
            profileForm: {
                name: '',
                location: '',
                about_me: '',
                submitted: false  // 是否点击了 submit 按钮
            }
        }
    },
    methods:{
        getUserDetail(){
            Account.getUser()
            .then((res)=>{
              console.log(res,"getUserDetail");
                this.profileForm.name = res.data.name;
                this.profileForm.location = res.data.location;
                this.profileForm.about_me = res.data.about_me;
            })
            .catch((err)=>{
                console.error(err);
            })
        },
        onSubmit(){
            const formData = new FormData();
            formData.append('name',this.profileForm.name);
            formData.append('location',this.profileForm.location);
            formData.append('about_me',this.profileForm.about_me);
            Account.editUser(formData)
            .then((res)=>{
                console.log(res);
                this.$toasted.success('Successfully modify your profile.', { icon: 'check' });
                this.$router.push({
                name: 'Profile',
                params: { id: this.sharedState.user_id }                
                });
            })
            .catch((err)=>{
                console.error(err);
            })
        },
    },
    created(){
      console.log(this.sharedState.user_id,"123")
      this.getUserDetail();
    }
}
</script>

<style>

</style>