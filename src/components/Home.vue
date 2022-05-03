<template>
  <div class="container">
    <alert 
      v-for="(alert, index) in alertsFilter" :key="index"
      :variant="alert.alertVariant"
      :message="alert.alertMessage">
    </alert>
    <button type="button" class="btn btn-primary">HomePage</button>
    <div id="main" :style="{width: '300px',height:'300px'}"></div>
  </div>
</template>

<script>
import Alert from './Alert'
import store from '../store.js'
import * as echarts from 'echarts'
export default {
  name: 'Home',  
  components: {
    alert: Alert
  },
  data () {
    return {
      alerts: [
        {
          showAlert: true,
          alertVariant: 'danger',
          alertMessage: 'sign in 写完了'
        },
        {
          showAlert: true,
          alertVariant: 'info',
          alertMessage: 'register 也写完了'
        },
        {
          showAlert: true,
          alertVariant: 'dark',
          alertMessage: 'Profile初步完工'
        }
      ]
    }
  },
  computed:{
      alertsFilter: function(){
          return this.alerts.filter((alert)=>{
              return alert.showAlert;
          })
      }
  },
  methods:{
    drawLine(){
      let myChart = echarts.init(document.getElementById("main"))
      let options = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };
      myChart.setOption(options);
    }
  },
  mounted(){
    this.drawLine();
  }
}
</script>