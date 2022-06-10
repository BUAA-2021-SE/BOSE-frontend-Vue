<template>
  <div class="container my-auto" >
    <div class="my-auto" width="80vw">
      <div>
        <div class="cardTitle"><span class="midText">注册</span></div>

        <div>
          <div class="row col-md-12 m-auto">
            <div class="col-md-5">
              <v-form>
                <v-text-field
                  v-model="registerForm.username"
                  label="用户名"
                  type="user"
                  required
                  clearable
                  counter="20"
                  dense
                  filled
                  :disabled="showIDCode"
                  :class="{ 'is-invalid': registerForm.usernameError }"
                  placeholder="用户名"
                ></v-text-field>

                <v-text-field
                  v-model="registerForm.email"
                  label="邮箱"
                  required
                  clearable
                  dense
                  filled
                  :disabled="showIDCode"
                  :class="{ 'is-invalid': registerForm.emailError }"
                  placeholder="邮箱"
                ></v-text-field>

                <v-text-field
                  v-model="registerForm.password"
                  label="密码(8-16位)"
                  filled
                  counter="16"
                  dense
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  required
                  autocomplete="new-password"
                  :disabled="showIDCode"
                  :class="{ 'is-invalid': registerForm.passwordError }"
                  placeholder="密码"
                ></v-text-field>

                <v-text-field
                  v-model="registerForm.password2"
                  label="重复密码"
                  filled
                  dense
                  counter="16"
                  required
                  autocomplete="new-password"
                  :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
                  :type="showPassword2 ? 'text' : 'password'"
                  @click:append="showPassword2 = !showPassword2"
                  :disabled="showIDCode"
                  :class="{ 'is-invalid': registerForm.password2Error }"
                  placeholder="重复密码"
                ></v-text-field>
               
                <v-text-field
                  
                  v-model="registerForm.idcode"
                  label="验证码"
                  required
                  dense
                  counter="8"
                  clearable
                  filled
                  :class="{ 'is-invalid': registerForm.idcodeError }"
                  placeholder="验证码"
                ></v-text-field>
                <v-alert dense outlined type="error" v-show="registerForm.errors"
                  >{{ registerForm.usernameError|| registerForm.emailError||registerForm.passwordError|| registerForm.password2Error|| registerForm.idcodeError}}</v-alert>
                <v-card-actions>
                   <v-card-actions>
                  <v-btn class="info" @click="getIDCode">获取验证码</v-btn>
                </v-card-actions>
                  <v-btn class="info" v-show="this.showIDCode" @click="register"
                    >注册</v-btn
                  >
                </v-card-actions>
              </v-form>
            </div>
            <div class="col-md-2">
              <div class="midLine"></div>
            </div>
            <div class="col-md-5" :style="{ padding:0}">
              <logo></logo>
            </div>
     
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
import Logo from "../base/Logo";
export default {
  name: "Register",
   components: {
    logo: Logo
  },
  data() {
    return {
      showPassword: false,
      showPassword2: false,
      showIDCode: false,
      registerForm: {
        username: "",
        email: "",
        password: "",
        password2: "",
        idcode: "",
        submitted: false, // 是否点击了 submit 按钮
        errors: 0, // 表单是否在前端验证通过，0 表示没有错误，验证通过
        usernameError: null,
        emailError: null,
        passwordError: null,
        password2Error: null,
        idcodeError: null,
      },
    };
  },
  methods: {
    register() {
      this.registerForm.submitted = true; // 先更新状态
      this.registerForm.errors = 0;
      this.registerForm.username=this.registerForm.username.trim();
      if (!this.registerForm.username) {
        this.registerForm.errors++;
        this.registerForm.usernameError = "用户名未填写";
      }
      else {
        this.registerForm.usernameError = null;
      }

      if (!this.registerForm.email) {
        this.registerForm.errors++;
        this.registerForm.emailError = "邮箱未填写";
      } else if (!this.validEmail(this.registerForm.email)) {
        this.registerForm.errors++;
        this.registerForm.emailError = "邮箱格式错误";
      } else {
        this.registerForm.emailError = null;
      }

      if (!this.registerForm.password) {
        this.registerForm.errors++;
        this.registerForm.passwordError = "密码未填写";
      }
      else {
        this.registerForm.passwordError = null;
      }

      if (!this.registerForm.password2) {
        this.registerForm.errors++;
        this.registerForm.password2Error = "需要再次填写密码";
      }
      else {
        this.registerForm.password2Error = null;
      }

      if (!this.registerForm.idcode) {
        this.registerForm.errors++;
        this.registerForm.password2Error = "验证码未填写";
      } else {
        this.registerForm.password2Error = null;
      }

      if (this.registerForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false;
      }

      const payload = new FormData();
      payload.append("username", this.registerForm.username);
      payload.append("password", this.registerForm.password);
      payload.append("password2", this.registerForm.password2);
      payload.append("email", this.registerForm.email);

      payload.append("idcode", this.registerForm.idcode);
      Account.RegisterCheck(payload)
        .then((res) => {
          console.log(res);
          this.$toasted.success("您已成功注册" ,{icon: "check",})
          this.$router.push({ name: "Login" });
          store.setNewAction();
        })
        .catch((error) => {
          this.registerForm.errors++;
          console.log(error.data);
          for (let field in error.response.data.detail) {
            if (field == "username") {
              this.registerForm.usernameError =
                error.response.data.detail.username;
            } else if (field == "email") {
              this.registerForm.emailError = error.response.data.detail.email;
            } else if (field == "password") {
              this.registerForm.passwordError =
                error.response.data.detail.password;
            } else if (field == "password2") {
              this.registerForm.password2Error =
                error.response.data.detail.password2;
            } else if (field == "identifying_code") {
              this.registerForm.idcodeError =
                error.response.data.detail.identifying_code;
            }
          }
          console.log(error);
        });
    },
    getIDCode() {
      console.log("aaa");
      this.registerForm.submitted = true; // 先更新状态
      this.registerForm.errors = 0;

      if (!this.registerForm.username) {
        this.registerForm.errors++;
        this.registerForm.usernameError = "用户名未填写";
      }else if(this.registerForm.username.length>20){
        this.registerForm.errors++;
        this.registerForm.usernameError = "用户名长度不能超过20个字符";
      } 
      else {
        this.registerForm.usernameError = null;
      }

      if (!this.registerForm.email) {
        this.registerForm.errors++;
        this.registerForm.emailError = "邮箱未填写";
      } else if (!this.validEmail(this.registerForm.email)) {
        this.registerForm.errors++;
        this.registerForm.emailError = "邮箱格式错误";
      } else {
        this.registerForm.emailError = null;
      }

      if (!this.registerForm.password) {
        this.registerForm.errors++;
        this.registerForm.passwordError = "密码未填写";
      }else if(this.registerForm.password.length>16||this.registerForm.password.length<8){
        this.registerForm.errors++;
        this.registerForm.passwordError = "密码长度不能超过16个字符且不能小于8个字符";
      } else {
        this.registerForm.passwordError = null;
      }
      if (!this.registerForm.password2) {
        this.registerForm.errors++;
        this.registerForm.password2Error = "需要再次填写密码";
      } else {
        this.registerForm.password2Error = null;
      }

      if (this.registerForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false;
      }

      const payload = new FormData();
      payload.append("username", this.registerForm.username);
      payload.append("password", this.registerForm.password);
      payload.append("password2", this.registerForm.password2);
      payload.append("email", this.registerForm.email);

      Account.Register(payload)
        .then((res) => {
          console.log(res, "111");
          this.showIDCode = true;
        })
        .catch((error) => {
          this.registerForm.errors++;
          for (let field in error.response.data.detail) {
            if (field == "username") {
              this.registerForm.usernameError =
                error.response.data.detail.username;
            } else if (field == "email") {
              this.registerForm.emailError = error.response.data.detail.email;
            } else if (field == "password") {
              this.registerForm.passwordError =
                error.response.data.detail.password;
            } else if (field == "password2") {
              this.registerForm.password2Error =
                error.response.data.detail.password2;
            }
          }
          console.log(error);
          console.log(error.response.data, "123");
        });
    },

    validEmail: function (email) {
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>

<style scoped>
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
</style>
<style scoped>

</style>