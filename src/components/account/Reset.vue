<template>
  <div class="container">
    <div class="row">
      <!-- 每行最多12列，栅格等级为中 -->
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <v-card
            class="m-auto"
            max-width="1400"
        >
          <v-card-text>
            <h1>重置密码</h1>
            <v-form>
              <v-text-field
                  v-model="resetForm.email"
                  label="Email address"
                  required
                  clearable
                  filled
                  :disabled="showIDCode"
                  :class="{'is-invalid': resetForm.emailError}" placeholder="Email address"
              ></v-text-field>
              <v-alert dense type="error" v-show="resetForm.emailError">{{ resetForm.emailError }}</v-alert>
              <button class="btn btn-primary" @click="getIDCode">Get IDCode</button>
              <v-text-field v-show="this.showIDCode"
                            v-model="resetForm.password"
                            label="Password"
                            filled
                            clearable
                            required
                            type="password"
                            autocomplete="new-password"
                            :class="{'is-invalid': resetForm.passwordError}" placeholder="Password"
              ></v-text-field>
              <v-alert dense type="error" v-show="resetForm.passwordError">{{ resetForm.passwordError }}</v-alert>
              <v-text-field v-show="this.showIDCode"
                            v-model="resetForm.password2"
                            label="Password Again"
                            filled
                            required
                            clearable
                            type="password"
                            autocomplete="new-password"
                            :class="{'is-invalid': resetForm.password2Error}" placeholder="Password Again"
              ></v-text-field>
              <v-alert dense type="error" v-show="resetForm.password2Error">{{ resetForm.password2Error }}</v-alert>
              <v-text-field v-show="this.showIDCode"
                            v-model="resetForm.idcode"
                            label="IDCode"
                            required
                            clearable
                            filled
                            :class="{'is-invalid': resetForm.idcodeError}" placeholder="IDCode"
              ></v-text-field>
              <v-alert dense type="error" v-show="resetForm.idcodeError">{{ resetForm.idcodeError }}</v-alert>
              <button class="btn btn-primary" v-show="this.showIDCode" @click="reset">Reset</button>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../store'
import {Account} from '@/api/account.js'

export default {
  name: 'Reset', //this is the name of the component
  data() {
    return {
      showIDCode: false,
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
      if (!this.resetForm.password) {
        this.resetForm.errors++
        this.resetForm.passwordError = 'Password required.'
      } else {
        this.resetForm.passwordError = null
      }

      if (!this.resetForm.password2) {
        this.resetForm.errors++
        this.resetForm.password2Error = 'Password again.'
      } else {
        this.resetForm.password2Error = null
      }
      if (!this.resetForm.idcode) {
        this.resetForm.errors++
        this.resetForm.password2Error = 'IDCode required.'
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
            this.$router.push('/login');
            store.setResetAction();
          })
          .catch((error) => {
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
        this.resetForm.emailError = 'Email required.'
      } else if (!this.validEmail(this.resetForm.email)) {
        this.resetForm.errors++
        this.resetForm.emailError = 'Valid email required.'
      } else {
        this.resetForm.emailError = null
      }
      if (this.resetForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false
      }


      const payload = new FormData();
      payload.append('email', this.resetForm.email);

      Account.Reset(payload)
          .then((res) => {
            console.log(res.detail, "111");
            this.showIDCode = true;
          })
          .catch((error) => {
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

<style>

</style>