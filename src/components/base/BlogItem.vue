<template>
  <div>
  <v-card class="mx-auto">
        <router-link
            :to="{name:'Post',params:{id:post.id} }"
        >
          <v-card-title>
            {{ post.title }}
          </v-card-title>
        </router-link>
        <v-card-text>
          <p>{{ post.author.name || post.author.username }}</p>
          <div class="text--primary">
            {{ post.summary }}
          </div>
        </v-card-text>
        <v-card-actions>
          <router-link
              :to="{name:'Post',params:{id:post.id} }"
          >
            <v-btn
                text
                color="deep-purple accent-4"
            >
              阅读全文
            </v-btn>
          </router-link>
          <v-btn
              v-if="post.author.id==sharedState.user_id"
              text
              color="deep-purple accent-4"
              @click="showDeleteDialog(post.id)"
          >
            删除
          </v-btn>
          <router-link
              :to="{name:'PostEdit',params:{id:post.id} }">
            <v-btn
                v-if="post.author.id==sharedState.user_id"
                text
                color="deep-purple accent-4"
            >
              编辑
            </v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
      <v-dialog style="z-index:2000"
                v-model="showDelete"
                width="25vw"
                height="20vh">
        <v-card :style="{width:'25vw', height:'12vh'}" class="d-flex align-content-end flex-wrap">
          <v-card-title class="mx-auto">
            确定删除？
          </v-card-title>
          <v-card-actions>
            <v-btn
                color="primary"
                text
                @click="showDelete= false"
            >
              退出
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
                text
                @click="onDeletePost"
            >
              确认
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import store from '@/store.js'
import Post from '@/api/post.js'
export default {
    props:['post'],
    inject: ['reload'],
    data(){
        return {
            sharedState: store.state,
            showDelete: false,
            deleteId: 0,
        }
    },
    methods:{
      showDeleteDialog(id) {
        this.deleteId = id;
        this.showDelete = true;
      },
      onDeletePost() {
        console.log("onDelete", this.deleteId);
        Post.deleteBlog(this.deleteId)
            .then((res) => {
              console.log(res);
              this.$emit('delete');
              this.deleteId = 0;
              this.showDelete = false;
              this.$toasted.success(res.data,
                  {
                    icon: 'check',
                    fullWidth: true,
                    position: "bottom-center"
                  })
            })
            .catch((err) => {
              console.error(err, "not deleted");
            })
      }
    }
}
</script>
