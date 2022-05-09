<template>
  <v-app-bar app dense>
    <router-link to="/">
      <div id="main" :style="{ width: '250px', height: '40px' }"></div>
    </router-link>

 <v-btn
      text
      :to="{ name: 'Home' }"
      >Home
    </v-btn>
    <v-divider vertical></v-divider>

    <v-btn
      text
       :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }"
      >Explore
    </v-btn>
   
    <v-spacer></v-spacer>
    <v-toolbar-items>
    <el-input placeholder="Search" v-model="search"> </el-input>
    <el-button small>Search</el-button>
  </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-btn text href="#"> Messages </v-btn>

    <v-divider vertical></v-divider>
    <v-btn
      text
      :to="{ path: `/user/${sharedState.user_id}` }"
      >Profile
    </v-btn>
    

    <v-divider vertical></v-divider>

    <v-btn text @click="handlerLogout" href="#"> Logout </v-btn>
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