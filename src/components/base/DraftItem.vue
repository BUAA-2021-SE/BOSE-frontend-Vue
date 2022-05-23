<template>
  <div>
  <v-card class="mx-auto">
        <v-card-title>
        {{ draft.title }}
        </v-card-title>
        <v-card-text>
          <p>{{ draft.author.name || draft.author.username }}</p>
          <div class="text--primary">
            {{ draft.summary }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
              v-if="draft.author.id==sharedState.user_id"
              text
              color="deep-purple accent-4"
              @click="showDeleteDialog(draft.id)"
          >
            删除
          </v-btn>
          <router-link
              :to="{name:'PostEdit',params:{id:draft.id} }">
            <v-btn
                v-if="draft.author.id==sharedState.user_id"
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
                @click="onDeleteDraft"
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
    name:'DraftItem',
    props:['draft'],
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
      onDeleteDraft() {
        console.log("onDelete", this.deleteId);
        Post.deleteDraft(this.deleteId)
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
              this.$toasted.error("not deleted",{icon:'check'});
            })
      }
    }
}
</script>
