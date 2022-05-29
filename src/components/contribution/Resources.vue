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
              <v-col
                  cols="16"
                  sm="4"
                  md="4"
                  class="spacer"
              >
                这里是用户头像
                <!--                <v-avatar-->
                <!--                    size="62px"-->
                <!--                >-->
                <!--                  <img-->
                <!--                      alt="Avatar"-->
                <!--                      :src="item.sender.headshot"-->
                <!--                  >-->
                <!--                </v-avatar>-->
              </v-col>
              <v-col
                  class="text-left"
              >
                <v-row
                    align="center"
                    class="spacer"
                    no-gutters
                >
                  <v-col
                      class="hidden-xs-only"
                  >

                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                      class="grey--text text-truncate hidden-sm-and-down"
                  >
                    这里是上传时间
                    <!--                    {{ $moment(item.date_time).format("YYYY年MM月DD日 HH:mm:ss") }}-->
                  </v-col>
                </v-row>
              </v-col>

            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>
                这里是资源详细介绍
              </v-card-text>
              这里还应该有一个去这个资源的链接
              <!--              <router-link-->
              <!--                  :to="{name: 'Post',params: {id:item.blog_id}}"-->
              <!--                  class="text-primary">-->
              <!--                <v-btn-->
              <!--                    color="primary"-->
              <!--                    class="mr-2"-->
              <!--                    small-->
              <!--                    text-->
              <!--                >-->
              <!--                  查看原文-->
              <!--                </v-btn>-->
              <!--              </router-link>-->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingLikes"
        class="text-center">
      <h4>呜呜呜，你来到了没有资源的荒漠。</h4>
    </div>
  </section>
</template>
<script>
import Resource from "@/api/resource";

export default {
  name: 'Resource',
  data() {
    return {
      items: [],
      loadingLikes: true,
    }
  },
  methods: {
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

</style>