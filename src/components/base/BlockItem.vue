<template>
  <div>
    <v-card outlined class="mx-auto" v-show="isBlock">
      <v-row>
          <v-col class="d-flex justify-center my-auto" cols="12" md="2" >
              <router-link :to="{ name: 'ShowProfile',params: { id:blockers.id} }">
               <v-avatar
                      size="70px"
                  >
       <v-img
          :src="blockers.headshot"
          class="my-auto"
          contain
          height="70"
          max-width="70"
          max-height="70"
         
         
        />
               </v-avatar>
               </router-link>
        </v-col>
        
        <v-col cols="12" md="6">
        
        <v-card-title>
             <router-link :to="{ name: 'ShowProfile',params: { id:blockers.id} }">
          <h3>{{ blockers.name||blockers.username }}</h3>
          </router-link>
        </v-card-title>
      
      <v-card-text>
      
        <div class="text--primary" v-if="blockers.about_me.length<30">
          {{ blockers.about_me }}
        </div>
        <div class="text--primary" v-else>
          {{ blockers.about_me.substring(0, 27)+'...'}}
        </div>
      </v-card-text>
      </v-col>
    
        <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="2" class="my-auto">
             <v-btn depressed :style="{color: 'DimGray',width:'100px'}"  @click="onUnblockUser(blockers.id)">
                <v-icon class="material-icons" >tag_faces</v-icon>解除误会
            </v-btn>
          </v-col>
        </v-row>

    </v-card>
  </div>
</template>

<script>
import store from "@/store.js";
import Followers from "@/api/follower.js";
export default {
  name: "BlockItem",
  props: ["blockers"],
  data() {
    return {
      sharedState: store.state,
      isBlock:true,
    };
  },
  methods: {
      toProfile(id){
          this.$router.push({name: 'ShowProfile', params: {id: id}})
      },
    onUnblockUser(id) {
      Followers.unBlock(id)
          .then((res) => {
            console.log(res, "unblockUser");
            this.isBlock = false;
            this.$toasted.success("误会解除~", {
              icon: "check",
            });
         
          })
          .catch((err) => {
            console.error(err);
          })
    },
  },
};
</script>
<style scoped>
.router-link-active {
  text-decoration: none;
}
h3{
  margin-top:0px!important;
  padding-top:0px!important;
}
a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.v-card__title {
  color: #3c80de;
}
.v-avatar{
     pointer-events:auto;
}

</style>
