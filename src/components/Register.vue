<template>
  <div class="container">
    <h1>Register</h1>
    <div class="row">
    <!-- 每行最多12列，栅格等级为中 -->
      <div class="col-md-4">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
          <!-- 指定所属表单 -->
            <label for="username">Username</label>
            <input type="text" v-model="registerForm.username" class="form-control" :class="{'is-invalid': registerForm.usernameError}" id="username" placeholder="Username">
            <div v-show="registerForm.usernameError" class="invalid-feedback">{{ registerForm.usernameError }}</div>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" v-model="registerForm.email" class="form-control" :class="{'is-invalid': registerForm.emailError}" id="email" aria-describedby="emailHelp" placeholder="Email address">
            <small v-if="!registerForm.emailError" id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <div v-show="registerForm.emailError" class="invalid-feedback">{{ registerForm.emailError }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="registerForm.password" class="form-control" :class="{'is-invalid': registerForm.passwordError}" id="password" placeholder="Password">
            <div v-show="registerForm.passwordError" class="invalid-feedback">{{ registerForm.passwordError }}</div>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register', //this is the name of the component
  data () {
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        submitted: false,  // 是否点击了 submit 按钮
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        usernameError: null,
        emailError: null,
        passwordError: null
      }
    }
  },
  methods: {
    onSubmit (e) {
      this.registerForm.submitted = true  // 先更新状态
      this.registerForm.errors = 0

      if (!this.registerForm.username) {
        this.registerForm.errors++
        this.registerForm.usernameError = 'Username required.'
      } else {
        this.registerForm.usernameError = null
      }

      if (!this.registerForm.email) {
        this.registerForm.errors++
        this.registerForm.emailError = 'Email required.'
      } else if (!this.validEmail(this.registerForm.email)) {
        this.registerForm.errors++
        this.registerForm.emailError = 'Valid email required.'
      } else {
        this.registerForm.emailError = null
      }

      if (!this.registerForm.password) {
        this.registerForm.errors++
        this.registerForm.passwordError = 'Password required.'
      } else {
        this.registerForm.passwordError = null
      }

      if (this.registerForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false
      }

      const path = 'http://localhost:8000/users/regester'
      const payload = {
        user_name: this.registerForm.username,
        email: this.registerForm.email,
        password: this.registerForm.password
      }
      let formdata = new FormData();
      formdata.append('user_name', this.registerForm.username);
      formdata.append('email', this.registerForm.email);
      formdata.append('password', this.registerForm.password);
      axios.post(path, formdata)
        .then((res) => {
          console.log(res)
          // handle success
          this.$router.push('/login')
        })
        .catch((error) => {
          // handle error
          console.log("123")
          console.log(error.detail)
          // for (let field in error.response.data.message) {
          //   if (field == 'username') {
          //     this.registerForm.usernameError = error.response.data.message.username
          //   } else if (field == 'email') {
          //     this.registerForm.emailError = error.response.data.message.email
          //   } else if (field == 'password') {
          //     this.registerForm.passwordError = error.response.data.message.password
          //   }
          // }
        })
    },
    validEmail: function (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>