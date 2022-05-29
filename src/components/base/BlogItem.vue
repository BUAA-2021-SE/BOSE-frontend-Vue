<template>
  <div>
    <v-card outlined class="mx-auto">
      <v-row>
        <v-col cols="12" md="7">
      <router-link :to="{ name: 'Post', params: { id: post.id } }">
        <v-card-title>
          <h3>{{ post.title }}</h3>
        </v-card-title>
      </router-link>
      <v-card-text>
        <p>{{ post.author.name || post.author.username }}</p>
        <div class="text--primary" v-if="post.summary.length <30">
          {{ post.summary }}
        </div>
        <div class="text--primary" v-else>
          {{ post.summary.substring(0, 27)+'...'}}
        </div>
      </v-card-text>
      <v-card-actions>
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
      </v-card-actions>
      </v-col>
      <v-col cols="12" md="2"></v-col>
      <v-col class="d-flex justify-end" cols="12" md="3">
       <v-img
          :src="post.cover"
          class="my-auto"
          contain
          height="150"
          max-width="200"
          max-height="150"
          :style="{'margin-right':'10px'}"
        />
        </v-col>
        </v-row>

    </v-card>
    <v-dialog
      style="z-index: 2000"
      v-model="showDelete"
      width="25vw"
      height="20vh"
    >
      <v-card
        :style="{ width: '25vw', height: '20vh' }"
        class="d-flex align-center flex-wrap"
      >
      <v-row class="mx-auto d-flex justify-center">
        <v-card-title class="mx-auto"><h3 class="mx-auto">确定删除？</h3> </v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="showDelete = false"> 取消 </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="onDeletePost"> 确认 </v-btn>
        </v-card-actions>
       </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from "@/store.js";
import Post from "@/api/post.js";
export default {
  name: "BlogItem",
  props: ["post"],
  data() {
    return {
      sharedState: store.state,
      showDelete: false,
      deleteId: 0,
    };
  },
  methods: {
    showDeleteDialog(id) {
      this.deleteId = id;
      this.showDelete = true;
    },
    onDeletePost() {
      console.log("onDelete", this.deleteId);
      Post.deleteBlog(this.deleteId)
        .then((res) => {
          console.log(res);
          this.$emit("delete");
          this.deleteId = 0;
          this.showDelete = false;
          this.$toasted.success(res.data, {
            icon: "check",
            fullWidth: true,
            position: "bottom-center",
          });
        })
        .catch((err) => {
          console.error(err, "not deleted");
        });
    },
  },
};
</script>
<style scoped>
h3{
  margin-top:0px!important;
  padding-top:0px!important;
}
.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
.v-card__title {
  color: #df2d2d;
}
</style>
