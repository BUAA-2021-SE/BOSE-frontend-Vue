<template>
  <div class="container my-auto" height="50vh">
    <div class="my-auto" width="80vw" height="50vh">
      <div>
        <div class="cardTitle"><h1 class="midText">重置密码</h1></div>

        <div>
          <div class="row col-md-12 m-auto">
            <div class="col-md-5">
              <v-form>
                <v-text-field
                    v-model="resetForm.email"
                    label="邮箱"
                    required
                    clearable
                    filled
                    :disabled="showIDCode"
                    :class="{'is-invalid': resetForm.emailError}" placeholder="邮箱"
                ></v-text-field>


                <v-text-field
                    v-model="resetForm.password"
                    label="密码(8-16位)"
                    counter="16"
                    filled
                    clearable
                    required
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    autocomplete="new-password"
                    :class="{'is-invalid': resetForm.passwordError}" placeholder="密码"
                ></v-text-field>

                <v-text-field
                    v-model="resetForm.password2"
                    label="再次输入密码"
                    filled
                    counter="16"
                    required
                    clearable
                    :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword2 ? 'text' : 'password'"
                    @click:append="showPassword2 = !showPassword2"
                    autocomplete="new-password"

                    :class="{'is-invalid': resetForm.password2Error}" placeholder="再次输入密码"
                ></v-text-field>

                <v-text-field
                    v-model="resetForm.idcode"
                    label="验证码"
                    counter="8"
                    required
                    clearable
                    filled

                    :class="{'is-invalid': resetForm.idcodeError}" placeholder="验证码"
                ></v-text-field>
                <v-alert dense outlined type="error" v-show="resetForm.errors">{{
                    resetForm.emailError || resetForm.passwordError || resetForm.password2Error || resetForm.idcodeError
                  }}
                </v-alert>
              </v-form>
              <v-btn class="info" @click="getIDCode">获取验证码</v-btn>
              <v-btn class="info" v-show="this.showIDCode" @click="reset">重置密码</v-btn>

            </div>
            <div class="col-md-2">
              <div class="midLine"></div>
            </div>
            <div class="col-md-5" :style="{ padding:0}">
              <logo></logo>
            </div>
          </div>
        </div>
        <div class="cardTitle"></div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../store'
import {Account} from '@/api/account.js'
import Logo from "../base/Logo";

export default {
  name: 'Reset',
  components: {
    logo: Logo
  },
  data() {
    return {
      showIDCode: false,
      showPassword: false,
      showPassword2: false,
      resetForm: {
        email: '',
        password: '',
        password2: '',
        idcode: '',
        errors: 0,
        emailError: null,
        passwordError: null,
        password2Error: null,
        idcodeError: null
      },

    }
  },
  methods: {
    reset() {
      this.resetForm.errors = 0
      if (!this.resetForm.email) {
        this.resetForm.errors++
        this.resetForm.emailError = '未填写邮箱'
      } else if (!this.validEmail(this.resetForm.email)) {
        this.resetForm.errors++
        this.resetForm.emailError = '邮箱格式错误'
      } else {
        this.resetForm.emailError = null
      }
      if (!this.resetForm.password) {
        this.resetForm.errors++
        this.resetForm.passwordError = '未填写密码'
      } else {
        this.resetForm.passwordError = null
      }

      if (!this.resetForm.password2) {
        this.resetForm.errors++
        this.resetForm.password2Error = '请再次填写密码'
      } else {
        this.resetForm.password2Error = null
      }
      if (this.resetForm.password != this.resetForm.password2) {
        this.resetForm.errors++
        this.resetForm.password2Error = '两次密码不一致'
      }
      if (!this.resetForm.idcode) {
        this.resetForm.errors++
        this.resetForm.password2Error = '未填写验证码'
      } else {
        this.resetForm.password2Error = null
      }
      if (this.resetForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false
      }
      const payload = new FormData();
      payload.append('email', this.resetForm.email);
      payload.append('password', this.resetForm.password);
      payload.append('password2', this.resetForm.password2);
      payload.append('idcode', this.resetForm.idcode);
      Account.ResetCheck(payload)
          .then((res) => {
            console.log(res);
            this.$toasted.success("密码成功重置" ,{icon: "check",})
            this.$router.push('/login');
            store.setResetAction();
          })
          .catch((error) => {
            this.resetForm.errors++;
            console.log(error.data);
            for (let field in error.response.data.detail) {
              if (field == 'password') {
                this.resetForm.passwordError = error.response.data.detail.password
              } else if (field == 'password2') {
                this.resetForm.password2Error = error.response.data.detail.password2
              } else if (field == 'idcode') {
                this.resetForm.idcodeError = error.response.data.detail.idcode
              }
            }
            console.log(error);
          })
    },

    getIDCode() {
      this.resetForm.errors = 0

      if (!this.resetForm.email) {
        this.resetForm.errors++
        this.resetForm.emailError = '未填写邮箱'
      } else if (!this.validEmail(this.resetForm.email)) {
        this.resetForm.errors++
        this.resetForm.emailError = '邮箱格式错误'
      } else {
        this.resetForm.emailError = null
      }
      if (!this.resetForm.password) {
        this.resetForm.errors++
        this.resetForm.passwordError = '未填写密码'
      }else if(this.resetForm.password.length>16||this.resetForm.password.length<8){
        this.resetForm.errors++;
        this.resetForm.passwordError = "密码长度不能超过16个字符且不能小于8个字符";
      } else {
        this.resetForm.passwordError = null
      }

      if (!this.resetForm.password2) {
        this.resetForm.errors++
        this.resetForm.password2Error = '请再次填写密码'
      } else {
        this.resetForm.password2Error = null
      }
      if (this.resetForm.password != this.resetForm.password2) {
        this.resetForm.errors++
        this.resetForm.password2Error = '两次密码不一致'
      }
      if (this.resetForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false
      }


      const payload = new FormData();
      payload.append('email', this.resetForm.email);

      Account.Reset(payload)
          .then((res) => {
            this.showIDCode = true;
          })
          .catch((error) => {
            this.resetForm.errors++;
            for (let field in error.response.data.detail) {
              if (field == 'email') {
                this.resetForm.emailError = error.response.data.detail.email
              }
              console.log(error);
              console.log(error.response.data, "123");
            }
          })

    },
    validEmail: function (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>

<style scoped>

</style>