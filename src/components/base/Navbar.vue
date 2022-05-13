<template>
 
   <v-app-bar
    app
    color="primary"
    elevate-on-scroll
  >

  

    <router-link   to="/">
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
        <v-divider vertical  class="md-4"/>
      <router-link :to="{ name: 'Home', }">
          <v-btn
          text
          class="white--text"
          @click="router.push({name})"
        
        >
          Home
        </v-btn>
      </router-link>
      <v-spacer/>
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
        
        
        <router-link  :to="{ name: 'ShowProfile', params: { id: sharedState.user_id } }">
       <v-btn 
          text
          class="white--text"
         
          v-show="sharedState.is_authenticated"
        >
          Profile
          
        </v-btn>
         </router-link>
      <v-divider vertical v-show="sharedState.is_authenticated" class="md-4"/>
         <router-link :to="{ name: 'Home', }">
        <v-btn text href="#" v-show="sharedState.is_authenticated" class="white--text"
         >
          Messages
        </v-btn>
 </router-link>
<v-divider vertical  v-show="sharedState.is_authenticated" class="md-4"/>
        <v-btn
          text
          @click="handlerLogout"
          class="white--text"
          v-show="sharedState.is_authenticated"
        >
          Logout
        </v-btn>

 <router-link :to="{ name: 'Login', }">
        <v-btn
          text
          class="white--text"
         
          v-show="!sharedState.is_authenticated"
          >Login
        </v-btn>
         </router-link>
        

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
                      fill: "rgba(255,255,255,0.75)",
                    },
                  },
                ],
              },
            },
            // {
            //   type: "text",
            //   left: "center",
            //   top: "center",
            //   style: {
            //     text: " O  ",
            //     fontSize: 40,
            //     fontWeight: "bold",
            //     lineDash: [0, 200],
            //     lineDashOffset: 0,
            //     fill: "transparent",
            //     stroke: "rgba(0,0,0,0.3)",
            //     lineWidth: 1,
            //   },
            //   keyframeAnimation: {
            //     duration: 4000,
            //     //loop: true,
            //     keyframes: [
            //       {
            //         percent: 0.7,
            //         style: {
            //           fill: "transparent",
            //           lineDashOffset: 200,
            //           lineDash: [200, 0],
            //         },
            //       },
            //       {
            //         // Stop for a while.
            //         percent: 0.8,
            //         style: {
            //           fill: "transparent",
            //         },
            //       },
            //       {
            //         percent: 1,
            //         style: {
            //           fill: "rgba(0,0,200,0.75)",
            //         },
            //       },
            //     ],
            //   },
            // },
            // {
            //   type: "text",
            //   left: "center",
            //   top: "center",
            //   style: {
            //     text: "  SE",
            //     fontSize: 40,
            //     fontWeight: "bold",
            //     lineDash: [0, 200],
            //     lineDashOffset: 0,
            //     fill: "transparent",
            //     stroke: "rgba(0,0,0,0.5)",
            //     lineWidth: 1,
            //   },
            //   keyframeAnimation: {
            //     duration: 5000,
            //     //loop: true,
            //     keyframes: [
            //       {
            //         percent: 0.7,
            //         style: {
            //           fill: "transparent",
            //           lineDashOffset: 200,
            //           lineDash: [200, 0],
            //         },
            //       },
            //       {
            //         // Stop for a while.
            //         percent: 0.8,
            //         style: {
            //           fill: "transparent",
            //         },
            //       },
            //       {
            //         percent: 1,
            //         style: {
            //           fill: "rgba(0,100,50,0.75)",
            //         },
            //       },
            //     ],
            //   },
            // },
          ],
        },
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    this.drawLogo();
    console.log(this.path)
  },
};
</script>
<style scoped>
.router-link-active {
  text-decoration: none;
  color: yellow;
}
a{
  text-decoration: none;
  color: rgb(255, 255, 255)
}
.v-btn {
    text-transform: none;
    font-weight:bold;
    font-size: 20;
}
</style>
