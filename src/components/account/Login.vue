<template>
  <div class="container my-auto" :style="{ padding: 0 }" height="50vh">
    <br />
    <br />
    <div class="my-auto" width="80vw" height="50vh">
      <div>
        <div class="cardTitle"><h1 class="midText">登录</h1></div>

        <div>
          <div class="row col-md-12 m-auto">
            <div class="col-md-5">
              <v-form>
                <v-text-field
                  v-model="loginForm.username"
                  label="用户名"
                  required
                  clearable
                  filled
                  :class="{ 'is-invalid': loginForm.usernameError }"
                  placeholder="用户名"
                ></v-text-field>
                <v-text-field
                  v-model="loginForm.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  required
                  label="密码"
                  filled
                  :class="{ 'is-invalid': loginForm.passwordError }"
                  placeholder="密码"
                ></v-text-field>
                <v-alert dense outlined type="error" v-show="loginForm.errors"
                  >{{ loginForm.usernameError || loginForm.passwordError }}
                </v-alert>
              </v-form>
              <v-btn @click="onSubmit" :style="{'background-color':'#00AEEC',color:'white'}">登录</v-btn>

              <br />
              <br />

              <p>
                还没账户？
                <router-link :to="{ name: 'Register' }"
                  >点我注册</router-link
                >
              </p>
              <p>
                忘记密码？
                <router-link :to="{ name: 'Reset' }"
                  >点我重置</router-link
                >
              </p>
            </div>
            <div class="col-md-2">
              <div class="midLine"></div>
            </div>
            <div class="col-md-5" :style="{ padding: 0 }">
              <logo></logo>
            </div>
          </div>
        </div>
        <div class="cardTitle"></div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import store from "../../store";
import { Account } from "@/api/account.js";
import Alert from "../base/Alert";
import Logo from "../base/Logo";
export default {
  name: "Login",
  components: {
    alert: Alert,
    logo: Logo,
  },
  data() {
    return {
      showPassword: false,
      sharedState: store.state,
      
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
      this.loginForm.errors = 0;
      this.loginForm.submitted = true;
      if (!this.loginForm.username) {
        this.loginForm.errors++;
        this.loginForm.usernameError = "用户名未填写";
      } else {
        this.loginForm.usernameError = null;
      }
      if (!this.loginForm.password) {
        this.loginForm.errors++;
        this.loginForm.passwordError = "密码未填写";
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
            this.$router.push({ name: "Home" });
          } else {
            this.$router.push(this.$route.query.redirect);
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status == 454) {
            this.loginForm.errors++;
            this.loginForm.usernameError ="用户名或密码错误";
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
.midText {
  margin-top: 0px !important;
  position: absolute;
  left: 50%;
  font-size: 40px;
  background-color: #ffffff;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-50%);
}

.midLine {
  position: relative;
  margin: 0 auto;
  width: 2px;
  height: 100%;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgb(101, 173, 240);
}

.cardTitle {
  position: relative;
  margin: 0 auto;
  max-width: 100vw;
  height: 2px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgb(101, 173, 240);
}
</style>
