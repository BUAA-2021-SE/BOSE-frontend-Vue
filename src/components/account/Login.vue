<template>
  <div class="container my-auto" height="80vh">
    <alert 
      v-if="sharedState.is_new"
      :variant="alertVariant"
      :message="alertMessage">
    </alert>
    <alert 
      v-if="sharedState.is_reset"
      :variant="alertVariant"
      :message="alertMessageReset">
    </alert>
     <div
    class="my-auto"
    width="80vw"
    height="50vh"
    
  >
  
  <div class="cardTitle"><h1 class="midText">登录</h1></div>
 
  <div>
    

    <div class="row col-md-12 m-auto">
      <div class="col-md-5 ">
        <v-form >
      <v-text-field
        v-model="loginForm.username"
        label="Username"
        required
        clearable
        filled
       :class="{'is-invalid': loginForm.usernameError}"  placeholder="Username"
      ></v-text-field>
      <v-text-field
        v-model="loginForm.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
         required
        label="Password"
        filled
       :class="{'is-invalid': loginForm.passwordError}"  placeholder="Password"
      ></v-text-field>
      <v-alert dense type="error" v-show="loginForm.passwordError" >{{ loginForm.passwordError }}</v-alert>
        </v-form>
        <button @click="onSubmit" class="btn btn-primary">Sign In</button>
      
    <br/>
    <br/>

    <p>New User? <router-link to="/register">Click to Register!</router-link></p>
    <p>
        Forgot Your Password?
         <router-link to="/reset">Click to Reset It</router-link>
    </p>
    </div>
     <div class="col-md-2">
     <div class="midLine"></div>
     </div>
    <div class="col-md-5 ">
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          
          @click="$vuetify.goTo(0)"
        /> 
      </div>
    </div>
    </div>
    <div class="cardTitle"></div>
         </div>
  </div>
</template>

<script>
import store from "../../store";
import { Account } from "@/api/account.js";
import Alert from "../base/Alert";
export default {
  name: "Login",
  components: {
    alert: Alert,
  },
  data() {
    return {
      showPassword: false,
      sharedState: store.state,
      alertVariant: "info",
      alertMessage: "You are now registered.",
      alertMessageReset: "Password reset successfully.",
      loginForm: {
        username: "",
        password: "",
        submitted: false,
        errors: 0,
        usernameError: null,
        passwordError: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.loginForm.submitted = true;
      if (!this.loginForm.username) {
        this.loginForm.errors++;
        this.loginForm.usernameError = "Username required.";
      } else {
        this.loginForm.usernameError = null;
      }
      if (!this.loginForm.password) {
        this.loginForm.errors++;
        this.loginForm.passwordError = "Password required.";
      } else {
        this.loginForm.passwordError = null;
      }
      if (this.loginForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false;
      }
      // axios 实现Basic Auth需要在config中设置 auth 这个属性即可
      const payload = new FormData();
      payload.append("username", this.loginForm.username);
      payload.append("password", this.loginForm.password);
      Account.Login(payload)
        .then((response) => {
          // handle success
          window.localStorage.setItem("token", response.data.token);
          store.resetNotNewAction();
          store.loginAction();
          if (typeof this.$route.query.redirect == "undefined") {
            this.$router.push("/");
          } else {
            this.$router.push(this.$route.query.redirect);
          }
        })
        .catch((error) => {
          // handle error
          if (error.response.status == 401) {
            console.log("test");
            this.loginForm.usernameError = "Invalid username or password.";
            this.loginForm.passwordError = "Invalid username or password.";
          } else {
            console.log(error.response);
          }
        });
    },
  },
};
</script>

<style>
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  /* -webkit-text-fill-color: #ededed !important;   */
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}
input {
  background-color: transparent;
}
.cardTitle {
  position: relative;
  margin: 0 auto;
  max-width: 80vw;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgb(101, 173, 240);
}
.midText {
  position: absolute;
  left: 50%;
  background-color: #ffffff;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-50%);
}
.midLine {
  position: relative;
  margin: 0 auto;
  width: 1px;
  height: 100%;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgb(101, 173, 240);
}
</style>