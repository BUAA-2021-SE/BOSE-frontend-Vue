

<template>
<div class=" m-auto" >
    <v-row class="col-12">
        <div class="col-3 my-auto">
    <v-img
      :src="require('@/assets/logo.png')"
      class="m-auto"
      contain
      height="10vh"
      width="8vw"
      max-width="8vw"
      @click="$vuetify.goTo(0)"
    />
    </div>
     <div id="logo" class="col-9 mx-auto" :style="{width: '18vw', height:'40vh'}"></div>
     </v-row>
</div>
</template>
<script>
export default{
 name:"Boselogo",
 data(){
     return{

     }
 },
 methods:{
     drawLogo() {
      let myChart = this.$echarts.init(document.getElementById("logo"));
      let option = {
        graphic: {
          elements: [
            {
              type: "text",
              left: "left",
              top: "center",
              style: {
                text: "B   ",
                fontSize: 90,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "#4cabeb",
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
                      color: "#4cabeb",
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
                      fill: "#4cabeb",
                    },
                  },
                ],
              },
            },
            {
              type: "text",
              left: "left",
              top: "center",
              style: {
                text: " O  ",
                fontSize: 90,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "rgba(200,0,0,1)",
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
                      color: "rgba(200,0,0,1)",
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
                      fill: "rgba(200,0,0,1)",
                    },
                  },
                ],
              },
            },
            {
              type: "text",
              left: "left",
              top: "center",
              style: {
                text: "  SE",
                fontSize: 90,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "#4cabeb",
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
                      color: "#4cabeb",
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
                      fill: "#4cabeb",
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
}
</script>
<style scoped>
div#logo {
    pointer-events: none;
    cursor: default;
    margin:0px;
}

</style>