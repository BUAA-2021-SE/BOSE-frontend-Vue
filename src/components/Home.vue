<template>
  <div class="container">
    <alert 
      v-for="(alert, index) in alertsFilter" :key="index"
      :variant="alert.alertVariant"
      :message="alert.alertMessage">
    </alert>
    <button type="button" class="btn btn-primary">HomePage</button>
  </div>
</template>

<script>
import Alert from './Alert'
import store from '../store.js'
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
  }
}
</script>