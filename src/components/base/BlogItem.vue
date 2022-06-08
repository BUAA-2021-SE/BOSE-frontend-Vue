<template>
  <div>
    <v-card outlined class="mx-auto" :style="{'border-radius':'20px'}">
      <v-row>
        <v-col class="d-flex justify-center" cols="12" md="5">
          <v-img
              :src="post.cover"
              class="my-auto"
              contain
              height="180"
              max-width="240"
              max-height="180"
              :style="{'border-radius':'20px'}"
          />
        </v-col>
        <v-col cols="12" md="7">
          <router-link v-if="!post.if_resource" :to="{ name: 'Post', params: { id: post.id } }">
            <v-card-title>
              <h3 v-if="post.title.length <12">{{ post.title }}</h3>
              <h3 v-else>{{ post.title.substring(0, 9) + '...' }}</h3>
              <v-btn v-if="post.status===-1" color="error" text small>被打回</v-btn>
              <v-btn v-if="post.status===1" color="error" text small>待审核</v-btn>
            </v-card-title>
          </router-link>
          <v-card-title v-else>
            <h3 v-if="post.title.length <12">{{ post.title }}</h3>
            <h3 v-else>{{ post.title.substring(0, 9) + '...' }}</h3>
            <v-btn v-if="post.status===-1" color="error" text small>被打回</v-btn>
            <v-btn v-if="post.status===1" color="error" text small>待审核</v-btn>
          </v-card-title>
          <v-card-text>
            <router-link :to="{name:'ShowProfile',params:{id: post.author.id}}"><strong
                v-html="post.author.name || post.author.username"></strong></router-link>
            <div class="text--primary">
              {{ post.summary }}
            </div>
            <div>
              <v-chip :style="{'background-color':'#00AEEC','color':'white'}" v-show="post.tag1!='none'" class="ma-2"
                      small>{{ post.tag1 }}
              </v-chip>
              <v-chip :style="{'background-color':'#00AEEC','color':'white'}" v-show="post.tag2!='none'" class="ma-2"
                      small>{{ post.tag2 }}
              </v-chip>
              <v-chip :style="{'background-color':'#00AEEC','color':'white'}" v-show="post.tag3!='none'" class="ma-2"
                      small>{{ post.tag3 }}
              </v-chip>
              <v-chip :style="{'background-color':'#00AEEC','color':'white'}" v-show="post.tag4!='none'" class="ma-2"
                      small>{{ post.tag4 }}
              </v-chip>
            </div>
            <v-row
                v-if="post.if_resource==true"
            >
              <v-spacer></v-spacer>
              <strong>资源下载链接 </strong>
              <div class="resources_url"
                   v-for="(resource, index) in post.resources"
                   :key="index"
              >
                <a :href="resource.resources_url" target="_blank">
                  {{ resource.name }}
                </a>
              </div>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <router-link :to="{ name: 'Post', params: { id: post.id } }">
              <v-btn
                  v-if="post.if_resource==false"
                  text color="deep-purple accent-4"> 阅读全文
              </v-btn>
            </router-link>
            <v-btn
                v-if="post.author.id == sharedState.user_id"
                text
                color="deep-purple accent-4"
                @click="showDeleteDialog(post.id)"
            >
              删除
            </v-btn>
            <router-link v-if="!post.if_resource" :to="{ name: 'PostEdit', params: { id: post.id } }">
              <v-btn
                  v-if="post.author.id == sharedState.user_id"
                  text
                  color="deep-purple accent-4"
              >
                编辑博文
              </v-btn>
            </router-link>
            <router-link v-else :to="{ name: 'EditResource', params: { id: post.id } }">
              <v-btn
                  v-if="post.author.id == sharedState.user_id"
                  text
                  color="deep-purple accent-4"
              >
                编辑资源
              </v-btn>
            </router-link>
          </v-card-actions>
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
          <v-card-title class="mx-auto"><h3 class="mx-auto">确定删除？</h3></v-card-title>
          <v-card-actions>
            <v-btn color="primary" text @click="showDelete = false"> 取消</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="onDeletePost"> 确认</v-btn>
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
            this.$toasted.success("删除成功", {
              icon: "check",
              fullWidth: true,
              position: "bottom-center",
            });
          })
          .catch((err) => {
            console.error(err, "not deleted");
            if (err.response.status === 461) {
              this.showDelete = false;
              this.$toasted.error("被编辑精选，不能删除", {icon: "check"});
            }
          });
    },
  },
};
</script>
<style scoped>
h3 {
  margin-top: 0px !important;
  padding-top: 0px !important;
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
