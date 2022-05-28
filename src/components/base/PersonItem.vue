<template>
  <div>
    <v-card outlined class="mx-auto">
      <v-row>
          <v-col class="d-flex justify-end" cols="12" md="2">
       <v-img
          :src="followers.headshot"
          class="my-auto"
          contain
          height="70"
          max-width="70"
          max-height="70"
         
        />
        </v-col>
        
        <v-col cols="12" md="6">
    
        <v-card-title>
          <h3>{{ followers.username }}</h3>
        </v-card-title>
      
      <v-card-text>
      
        <div class="text--primary" v-if="followers.about_me.length<30">
          {{ followers.about_me }}
        </div>
        <div class="text--primary" v-else>
          {{ followers.about_me.substring(0, 27)+'...'}}
        </div>
      </v-card-text>
      <!-- <v-card-actions>
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
          <v-btn text color="deep-purple accent-4"> 阅读全文 </v-btn>
        </router-link>
        <v-btn
          v-if="post.author.id == sharedState.user_id"
          text
          color="deep-purple accent-4"
          @click="showDeleteDialog(post.id)"
        >
          删除
        </v-btn>
        <router-link :to="{ name: 'PostEdit', params: { id: post.id } }">
          <v-btn
            v-if="post.author.id == sharedState.user_id"
            text
            color="deep-purple accent-4"
          >
            编辑
          </v-btn>
        </router-link>
      </v-card-actions> -->
      </v-col>
    
        <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="2" class="my-auto">
            <v-btn v-if="followers.both_follow" >
                已互粉
            </v-btn>
             <v-btn v-else>
                已关注
            </v-btn>
          </v-col>
        </v-row>

    </v-card>
    <!-- <v-dialog
      style="z-index: 2000"
      v-model="showDelete"
      width="25vw"
      height="20vh"
    >
      <v-card
        :style="{ width: '25vw', height: '12vh' }"
        class="d-flex align-content-end flex-wrap"
      >
        <v-card-title class="mx-auto"> 确定删除？ </v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="showDelete = false"> 退出 </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="onDeletePost"> 确认 </v-btn>
        </v-card-actions>
       
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  name: "PersonItem",
  props: ["followers"],
  data() {
    return {
      sharedState: store.state,

    };
  },
  methods: {
    
  },
};
</script>
<style scoped>
.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.v-card__title {
  color: #3c80de;
}
</style>
