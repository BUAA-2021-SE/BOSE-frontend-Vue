<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingLikes"> 资源列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="loadingLikes"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <v-container
        v-if="items.length > 0"
        fluid>
      <v-row justify="center">
        <v-subheader>
          <h3>我的资源</h3>
        </v-subheader>

        <v-expansion-panels popout>
          <v-expansion-panel
              v-for="(item,index) in items"
              :key="index"
          >
            <v-expansion-panel-header>
              <v-col class="d-flex justify-center" cols="12" md="5">
                <v-img
                    :src="item.cover"
                    class="my-auto"
                    contain
                    height="120"
                    max-width="150"
                    max-height="120"
                    :style="{'border-radius':'20px'}"
                />
              </v-col>
              <v-col class="text-left">
                <v-row align="center">
                  <v-card-title>
                    <div v-if="item.title.length <12">{{ item.title }}</div>
                    <div v-else>{{ item.title.substring(0, 9) + '...' }}</div>
                  </v-card-title>
                </v-row>
                <v-row align="center">
                  <v-card-text>
                    <div class="text--primary" v-if="item.summary.length <30">
                      {{ item.summary }}
                    </div>
                    <div class="text--primary" v-else>
                      {{ item.summary.substring(0, 27) + '...' }}
                    </div>
                  </v-card-text>
                </v-row>
                <v-row>
                  <v-col class="grey--text text-truncate hidden-sm-and-down">
                    {{ $moment(item.timestamp).format("YYYY年MM月DD日 HH:mm:ss") }}
                  </v-col>
                </v-row>
              </v-col>

            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <strong>资源摘要说明 </strong>
              <v-card-text>
                {{ item.summary }}
              </v-card-text>
              <v-spacer></v-spacer>
              <strong>资源下载链接 </strong>
              <div class="resources_url"
                   v-for="(resource, index) in item.resources"
                   :key="index"
              >
                <a :href="resource.resources_url" target="_blank">
                  {{ resource.name }}
                </a>
              </div>
              <v-btn
                  v-if="item.author.id == sharedState.user_id"
                  text
                  color="deep-purple accent-4"
                  @click="showDeleteDialog(item.id)"
              >
                删除
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingLikes"
        class="text-center">
      <h3>呜呜呜，你来到了没有资源的荒漠。</h3>
    </div>
  </section>
</template>
<script>
import Resource from "@/api/resource";
import Post from "@/api/post";
import store from "@/store";

export default {
  name: 'Resource',
  data() {
    return {
      items: [],
      loadingLikes: true,
      sharedState: store.state,
      deleteId: 0,
      showDelete: false,
    }
  },
  methods: {
    showDeleteDialog(id) {
      this.deleteId = id;
      this.showDelete = true;
    },
    onDeletePost() {
      console.log("onDelete", this.deleteId);
      Post.deleteResource(this.deleteId)
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
    getResourcesList() {
      console.log("getResourcesList");
      Resource.getResourcesList(this.$route.params.id)
          .then((res) => {
            console.log(res);
            this.items = res.data.items;
            this.loadingLikes = false;
          })
          .catch((err) => {
            console.error(err);
            this.loadingLikes = false;
          })
    },
  },
  created() {
    this.getResourcesList();
  },
  beforeRouteUpdate(to, from, next) {
    this.getResourcesList();
  }
}
</script>

<style>

.resources_url {
  margin-top: 10px;
}

</style>