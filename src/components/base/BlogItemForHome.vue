<template>
  <div>
    <v-card outlined class="mx-auto" :style="{'border-radius':'20px',height:'240px'}">
      <v-row>
        <v-col class="d-flex justify-center m-auto" cols="12" md="4" >
          <v-card :style="{'height':'180px','max-height':'180px','border-radius':'20px','margin-left':'50px','margin-top':'18px'}">
          <router-link v-if="!post.if_resource" :to="{ name: 'Post', params: { id: post.id } }">
         
         <v-img
              :src="post.cover"
             :style="{'min-width':'100%','min-height':'100%','max-height':'180px','border-radius':'20px'}"
          />
          </router-link>
          </v-card>
           <v-img
              v-if="post.if_resource"
              :src="post.cover"
               :style="{'min-width':'100%','min-height':'100%','max-height':'180px','border-radius':'20px'}"
          />
        </v-col>
     
        <v-col cols="12" md="8">
          <router-link v-if="!post.if_resource" :to="{ name: 'Post', params: { id: post.id } }">
            <v-card-title :style="{'margin-top':'4px'}">
              <h3 >{{ post.title }}</h3>
          
            </v-card-title>
          </router-link>
          <v-card-title v-else  :style="{'margin-top':'4px'}">
            <h3 >{{ post.title }}</h3>
 
          </v-card-title>
          <v-card-text>
            <router-link :to="{name:'ShowProfile',params:{id: post.author.id} }"><strong
                v-html="post.author.name || post.author.username"></strong></router-link>
            <div class="text--primary" v-if="post.summary.length <60">
              {{ post.summary }}
            </div>
             <div class="text--primary" v-else>
              {{ post.summary.substring(0, 57) + '...'  }}
            </div>
            <div>
              <router-link :to="{name: 'TagAll' , params: {tag: post.tag1},}">
              <v-chip :style="{'background-color':'#00AEEC','color':'white'}" v-show="post.tag1!='none'" class="ma-2"
                      small>{{ post.tag1 }}
              </v-chip></router-link>
              <router-link :to="{name: 'TagAll' , params: {tag: post.tag2},}">
              <v-chip :style="{'background-color':'#00AEEC','color':'white'}" v-show="post.tag2!='none'" class="ma-2"
                      small>{{ post.tag2 }}
              </v-chip></router-link>
               <router-link :to="{name: 'TagAll' , params: {tag: post.tag3},}">
              <v-chip :style="{'background-color':'#00AEEC','color':'white'}" v-show="post.tag3!='none'" class="ma-2"
                      small>{{ post.tag3 }}
              </v-chip></router-link>
               <router-link :to="{name: 'TagAll' , params: {tag: post.tag4},}">
              <v-chip :style="{'background-color':'#00AEEC','color':'white'}" v-show="post.tag4!='none'" class="ma-2"
                      small>{{ post.tag4 }}
              </v-chip></router-link>
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
  name: "BlogItemForHome",
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
