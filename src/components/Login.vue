<template>
  <div class="container">
  <alert

  ></alert>
  </div>
</template>

<script>
import axios from "axios"
import Alert from "./Alert.vue"
import store from "store.js"
export default {
    name:'Login',
    components: {
        alert: Alert
    },
    data(){
        return{
            
        }
    }
}
</script>

<style>

</style>