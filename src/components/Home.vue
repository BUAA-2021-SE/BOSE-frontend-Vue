<template>
  <div class="container">
    <alert 
      v-for="(alert, index) in alertsFilter" :key="index"
      :variant="alert.alertVariant"
      :message="alert.alertMessage">
    </alert>
    <mavon-editor v-model="value"/>
    <button class="btn btn-primary" @click="getText">Submit</button>
  </div>
</template>


<script>
import Alert from './Alert'
import store from '../store.js'
import * as echarts from 'echarts'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Home',  
  components: {
    alert: Alert
  },
  data () {
    return {
      value: '',
      sharedState: store.state,
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
        },
        {
          showAlert: true,
          alertVariant: 'primary',
          alertMessage: 'Markdown在线编辑器写完了'
        }
      ],
      posts: '',
      postForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false
      },
      editPostForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false
      }
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

    getText(){
      console.log(this.value)
    },
    // drawLine(){
    //   let myChart = this.$echarts.init(document.getElementById("a"))
    //   let options = {
    //     xAxis: {
    //       type: 'category',
    //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     series: [
    //       {
    //         data: [150, 230, 224, 218, 135, 147, 260],
    //         type: 'line'
    //       }
    //     ]
    //   };
    //   myChart.setOption(options);
    // },
   
  },
  mounted(){
    this.drawLine();
  },
  
}
</script>