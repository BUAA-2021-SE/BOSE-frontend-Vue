<template>
  <!-- <v-app-bar app dense  elevate-on-scroll>
    <router-link to="/">
      <div id="main" :style="{ width: '250px', height: '40px' }"></div>
    </router-link>
<v-divider vertical inset></v-divider>
<v-toolbar-items>
 <v-btn
      text
      :to="{ name: 'Home' }"
      >Home
    </v-btn>


    <v-btn
      text
       :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }"
      >Explore
    </v-btn>
     </v-toolbar-items>
    <v-spacer></v-spacer>


    <v-toolbar-items>
    <el-input placeholder="Search" v-model="search"> </el-input>
    <el-button small>Search</el-button>
  </v-toolbar-items>
    <v-spacer></v-spacer>
  <v-toolbar-items  v-if="sharedState.is_authenticated">
    <v-btn text href="#"> Messages </v-btn>


    <v-btn
      text
      :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }"
      >Profile
    </v-btn>
    

    

    <v-btn text @click="handlerLogout" href="#"> Logout </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
        <v-btn
      text
      :to="{ name: 'Login'}"
      >Login
    </v-btn>
    </v-toolbar-items>
  </v-app-bar> -->

  <v-app-bar app elevate-on-scroll>
    <v-spacer :style="{width: '10vw'}"/>
    <router-link   to="/home">
      <div id="main" :style="{ width: '250px', height: '40px' }"></div>
    </router-link>
    <v-container class="mx-auto">
      <v-row align="center" class=" col-12">
       <v-col class="col-2">
        <v-btn
          text
          fab
          :style="{ borderRadius: '10px', marginTop: '-12px', width: '100px' }"
          :to="{ name: 'Home' }"
        >
          Home
        </v-btn>
</v-col>
 <v-col class="col-4">
        <v-text-field
          append-icon="mdi-magnify"
          @click:append="searchBlog"
          flat
          hide-details
          solo
          v-model="search"
          style="max-width: 300px"
          :style="{ marginTop: '-12px' }"
        />
       </v-col>
        <v-btn
          text
          fab
          :style="{ borderRadius: '10px', marginTop: '-12px', width: '100px' }"
          :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }"
          v-show="sharedState.is_authenticated"
        >
          Profile
        </v-btn>
        <v-btn text href="#" v-show="sharedState.is_authenticated" fab
          :style="{borderRadius:'10px',marginTop:'-12px',width:'100px'}">
          Messages
        </v-btn>

        <v-btn
          text
          @click="handlerLogout"
          fab
          :style="{ borderRadius: '10px', marginTop: '-12px', width: '100px' }"
          href="#"
          v-show="sharedState.is_authenticated"
        >
          Logout
        </v-btn>

        <v-btn
          text
          :to="{ name: 'Login' }"
          fab
          :style="{ borderRadius: '10px', marginTop: '-12px', width: '100px' }"
          v-show="!sharedState.is_authenticated"
          >Login
        </v-btn>
        
      </v-row>
    </v-container>
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
    handlerLogout() {
      store.logoutAction();
      this.$router.push("/login");
    },
    searchBlog(){
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
                text: "B   ",
                fontSize: 40,
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
                      fill: "rgba(0,100,50,0.75)",
                    },
                  },
                ],
              },
            },
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: " O  ",
                fontSize: 40,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "rgba(0,0,0,0.3)",
                lineWidth: 1,
              },
              keyframeAnimation: {
                duration: 4000,
                //loop: true,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: "transparent",
                      lineDashOffset: 200,
                      lineDash: [200, 0],
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
                      fill: "rgba(0,0,200,0.75)",
                    },
                  },
                ],
              },
            },
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: "  SE",
                fontSize: 40,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "rgba(0,0,0,0.5)",
                lineWidth: 1,
              },
              keyframeAnimation: {
                duration: 5000,
                //loop: true,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: "transparent",
                      lineDashOffset: 200,
                      lineDash: [200, 0],
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
                      fill: "rgba(0,100,50,0.75)",
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
  },
};
</script>