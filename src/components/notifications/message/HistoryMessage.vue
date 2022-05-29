<template>
  <div>
  <v-card>
  <v-virtual-scroll>
  <v-btn>primary</v-btn>
  </v-virtual-scroll>
  </v-card>
  </div>
</template>

<script>
export default {
  name:'HistoryMessage',
  data(){
    return{}
  },
  methods:{

  },
  created() {

  },
  beforeRouteUpdate(to, from, next){
    next();
    
  }
}
</script>

<style>

</style>