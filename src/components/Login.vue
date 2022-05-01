<template>
  <div class="container">
    <alert 
      v-if="sharedState.is_new"
      v-bind:variant="alertVariant"
      v-bind:message="alertMessage">
    </alert>
    <h1>Sign In</h1>
    <div class="row">
      <div class="col-md-4">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" v-model="loginForm.username" class="form-control" :class="{'is-invalid': loginForm.usernameError}" id="username" placeholder="">
            <div v-show="loginForm.usernameError" class="invalid-feedback">{{ loginForm.usernameError }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="loginForm.password" class="form-control" :class="{'is-invalid': loginForm.passwordError}" id="password" placeholder="">
            <div v-show="loginForm.passwordError" class="invalid-feedback">{{ loginForm.passwordError }}</div>
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
      </div>
    </div>
    <br>
    <p>New User? <router-link to="/register">Click to Register!</router-link></p>
    <p>
        Forgot Your Password?
        <a href="#">Click to Reset It</a>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "./Alert.vue";
import store from "../store";
import {Account} from "@/api/account.js"
export default {
  name: "Login",
  components: {
    alert: Alert,
  },
  data() {
    return {
      sharedState: store.state,
      alertVariant: "info",
      alertMessage: "You are now registered.",
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
      payload.append('username',this.loginForm.username);
      payload.append('password',this.loginForm.password);
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
          if (error.response.status ==401) {
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
</style>