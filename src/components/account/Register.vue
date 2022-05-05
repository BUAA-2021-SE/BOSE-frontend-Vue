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
  <h1>注册</h1>

        <v-form >
      <v-text-field
        v-model="registerForm.username"
        label="Username"
        type="user"
        required
        clearable
        filled
        :disabled="showIDCode"
       :class="{'is-invalid': registerForm.usernameError}"  placeholder="Username"
      ></v-text-field>
      <v-alert dense type="error" v-show="registerForm.usernameError" >{{ registerForm.usernameError }}</v-alert>

      <v-text-field
        v-model="registerForm.email"
        label="Email address"
        required
        clearable
        filled
        :disabled="showIDCode"
       :class="{'is-invalid': registerForm.emailError}"  placeholder="Email address"
      ></v-text-field>
 <v-alert dense type="error" v-show="registerForm.emailError" >{{ registerForm.emailError }}</v-alert>
      <v-text-field
        v-model="registerForm.password"
        label="Password"
        filled
        clearable
        required
        type="password"
        autocomplete="new-password"
        :disabled="showIDCode"
       :class="{'is-invalid': registerForm.passwordError}"  placeholder="Password"
      ></v-text-field>
 <v-alert dense type="error" v-show="registerForm.passwordError" >{{ registerForm.passwordError }}</v-alert>
 <v-text-field
        v-model="registerForm.password2"
        label="Password Again"
        filled
        required
        clearable
        type="password"
        :disabled="showIDCode"
       :class="{'is-invalid': registerForm.password2Error}"  placeholder="Password Again"
      ></v-text-field>
 <v-alert dense type="error" v-show="registerForm.password2Error" >{{ registerForm.password2Error }}</v-alert>
         <button class="btn btn-primary" @click="getIDCode">Get IDCode</button>

       <v-text-field v-show="this.showIDCode"
        v-model="registerForm.idcode"
        label="IDCode"
        required
        clearable
        filled
       :class="{'is-invalid': registerForm.idcodeError}"  placeholder="IDCode"
      ></v-text-field>
       <v-alert dense type="error" v-show="registerForm.idcodeError" >{{ registerForm.idcodeError }}</v-alert>
    <button class="btn btn-primary" v-show="this.showIDCode" @click="register">Register</button>


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
  name: 'Register', //this is the name of the component
  data () {
    
    return {
      showIDCode:false,
      registerForm: {
        username: '',
        email: '',
        password: '',
        password2: '',
        idcode:'',
        submitted: false,  // 是否点击了 submit 按钮
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        usernameError: null,
        emailError: null,
        passwordError: null,
        password2Error: null,
        idcodeError: null
      },
     
    }
  },
  methods: {
    register(){
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

      if (!this.registerForm.password2) {
        this.registerForm.errors++
        this.registerForm.password2Error = 'Password again.'
      } else {
        this.registerForm.password2Error = null
      }

      if (!this.registerForm.idcode) {
        this.registerForm.errors++
        this.registerForm.password2Error = 'IDCode required.'
      } else {
        this.registerForm.password2Error = null
      }

      if (this.registerForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false
      }
      

      const payload = new FormData();
      payload.append('username',this.registerForm.username);
      payload.append('password',this.registerForm.password);
      payload.append('password2',this.registerForm.password2);
      payload.append('email',this.registerForm.email);

        payload.append('idcode',this.registerForm.idcode);
        Account.RegisterCheck(payload)
        .then((res) => {
          console.log(res);
          this.$router.push('/login');
          store.setNewAction();
        })
        .catch((error) => {
          console.log(error.data);
          for (let field in error.response.data.detail) {
            if (field == 'username') {
              this.registerForm.usernameError = error.response.data.detail.username
            } else if (field == 'email') {
              this.registerForm.emailError = error.response.data.detail.email
            } else if (field == 'password') {
              this.registerForm.passwordError = error.response.data.detail.password
            }else if (field == 'password2') {
              this.registerForm.password2Error = error.response.data.detail.password2
            }
            else if (field == 'identifying_code') {
              this.registerForm.idcodeError = error.response.data.detail.identifying_code
            }
          }
          console.log(error);
        })
    },
    getIDCode () {
      console.log("aaa");
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
      if (!this.registerForm.password2) {
        this.registerForm.errors++
        this.registerForm.password2Error = 'Password again.'
      } else {
        this.registerForm.password2Error = null
      }

      if (this.registerForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        return false
      }
      

      const payload = new FormData();
      payload.append('username',this.registerForm.username);
      payload.append('password',this.registerForm.password);
      payload.append('password2',this.registerForm.password2);
      payload.append('email',this.registerForm.email);
      
      Account.Register(payload)
        .then((res) => {
          console.log(res.detail,"111");
          // this.$router.push('/login');
          this.showIDCode= true;
        })
        .catch((error) => {
          for (let field in error.response.data.detail) {
            if (field == 'username') {
              this.registerForm.usernameError = error.response.data.detail.username
            } else if (field == 'email') {
              this.registerForm.emailError = error.response.data.detail.email
            } else if (field == 'password') {
              this.registerForm.passwordError = error.response.data.detail.password
            }
            else if (field == 'password2') {
              this.registerForm.password2Error = error.response.data.detail.password2
            }
          }
          console.log(error);
          console.log(error.response.data,"123");
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
input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {  
    /* -webkit-text-fill-color: #ededed !important;   */
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;  
    background-color:transparent;  
    background-image: none;  
    transition: background-color 50000s ease-in-out 0s;  
}  
input {  
    background-color:transparent;  
} 

</style>