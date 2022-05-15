<template>
  <v-app-bar app color="#4cabeb" elevate-on-scroll>
    <router-link :to="{ name: 'Home' }">
      <div id="main" :style="{ width: '150px', height: '40px' }"></div>
    </router-link>

    <v-img
      :src="require('@/assets/logo.png')"
      class="mr-5"
      contain
      height="48"
      width="48"
      max-width="48"
      @click="$vuetify.goTo(0)"
    />

    <router-link :to="{ name: 'Home' }">
      <v-btn text class="white--text"> Home </v-btn>
    </router-link>
    <v-spacer />
    <v-text-field
      append-icon="mdi-magnify"
      @click:append="searchBlog"
      flat
      hide-details
      solo
      v-model="search"
      style="max-width: 300px"
      :style="{ borderRadius: '300px' }"
    />

    <v-spacer />
    <div class="pcard d-flex flex-row-reverse">
      

 <router-link :to="{ name: 'Login' }">
      <v-btn text class="white--text" v-show="!sharedState.is_authenticated"
        >Login
      </v-btn>
    </router-link>


 <v-btn
      text
      @click="handlerLogout"
      class="white--text"
      v-show="sharedState.is_authenticated"
    >
      Logout
    </v-btn>


 <router-link
      v-if="sharedState.is_authenticated"
      :to="{ name: 'PostAdd', params: { id: sharedState.user_id } }"
    >
      <v-btn text class="white--text"> New Blog</v-btn>
    </router-link>
    <router-link v-else :to="{ name: 'Login' }">
      <v-btn text class="white--text"> New Blog</v-btn>
    </router-link>

<router-link v-if="sharedState.is_authenticated" :to="{ name: 'Home' }">
      <v-btn text class="white--text"> Messages</v-btn>
    </router-link>
    <router-link v-else :to="{ name: 'Login' }">
      <v-btn text class="white--text"> Messages</v-btn>
    </router-link>

    <router-link v-if="!sharedState.is_authenticated" :to="{ name: 'Login' }">
      <v-btn text class="white--text"> Profile</v-btn>
    </router-link>

    
<router-link
        v-if="sharedState.is_authenticated"
        :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }"
      >
        <v-btn text class="white--text " @mouseenter="enter" @mouseleave="leave">
          Profile</v-btn
        >
      </router-link>
     
 <!-- v-show="sharedState.is_hover && sharedState.is_authenticated" -->

 <v-card
    max-width="350"
    v-show="sharedState.is_hover && sharedState.is_authenticated"
        @mouseenter="enter"
        @mouseleave="leave"
  ><v-card-title>
   <img
      :src="require('@/assets/logo.png')"
      class="mx-auto"
      contain
      height="60"
      width="60"
      max-width="60"
      @click="$vuetify.goTo(0)"
    />
    </v-card-title>
    <v-card-title>
      <h2 class="mx-auto">
      Username
      </h2>
      </v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-auto col-md-12"
      >
        <v-col class="col-md-6">
          <h3 class="mx-auto">
            关注：100
            </h3>
        </v-col>
        <v-col class="col-md-6">
       <h3 class="mx-auto">
            粉丝：300
            </h3>
        </v-col>   
      </v-row>
     
     <router-link :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }">
      <v-btn text  :style="{width:'100%','text-align': 'left'}" class="mx-auto" @click="sharedState.is_hover=false">
       ShowProfile
      </v-btn>
     </router-link>
       <router-link :to="{ name: 'Followers', params: { id: sharedState.user_id } }">
      <v-btn text  :style="{width:'100%' ,'text-align': 'left'}" class="mx-auto" @click="sharedState.is_hover=false">
       Followers
      </v-btn>
     </router-link>
    <router-link :to="{ name: 'Home', }">
      <v-btn text  :style="{width:'100%','text-align':'left'}" class="mx-auto" @click="sharedState.is_hover=false">
       Home
      </v-btn>
     </router-link>
      
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    

    <v-card-text>
     
      <v-btn text  :style="{width:'100%','text-align': 'left'}" class="mx-auto " @click=" handlerLogout" 
      v-show="sharedState.is_authenticated">
       Logout
      </v-btn>
 
    </v-card-text>

    
  </v-card>


  
    
    </div>
  </v-app-bar>
</template>
<script>
import store from "../../store.js";
export default {
  
  name: "Navbar",
  data() {
    return {
      search: "",
      sharedState: store.state,
    };
  },
  methods: {
    enter() {
      store.state.is_hover = true;
    },
    leave() {
      store.state.is_hover = false;
    },

    handlerLogout() {
      store.logoutAction();
      this.$router.push({ name: 'Home' });
    },
    searchBlog() {
      console.log(this.search);
    },
    drawLogo() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: "BOSE",
                fontSize: 35,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "rgba(0,0,0,0.5)",
                lineWidth: 1,
              },
              keyframeAnimation: {
                duration: 3000,
                //loop: true,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: "transparent",
                      lineDashOffset: 200,
                      lineDash: [200, 0],
                      color: "#000",
                    },
                  },
                  {
                    // Stop for a while.
                    percent: 0.8,
                    style: {
                      fill: "transparent",
                    },
                  },
                  {
                    percent: 1,
                    style: {
                      fill: "rgba(255,255,255,1)",
                    },
                  },
                ],
              },
            },
          ],
        },
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.drawLogo();
    console.log(this.path);
  },
};
</script>
<style scoped>
.router-link-active {
  text-decoration: none;
  color: yellow;
  color: #4cabeb;
}

a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.v-btn {
  text-transform: none;
  font-weight: bold;
  font-size: 20;
  width:100px
}
.pcard {
  position: relative;
  width: 40vw;
  
}
.pcard .v-card {
  position: absolute;
  margin-right: 175px;
  margin-top:35px;
}

</style>
