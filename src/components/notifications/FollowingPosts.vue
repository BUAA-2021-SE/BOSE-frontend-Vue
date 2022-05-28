<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="this.loadingFollowings"> 关注通知列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="this.loadingFollowings"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <v-container
        v-if="this.items.length > 0"
        fluid>
      <v-row justify="center">
        <h3>新粉丝通知</h3>
        <v-expansion-panels popout>
          <v-expansion-panel
              v-for="(item,index) in items"
              :key="index"
          >
            <v-expansion-panel-header>
              <v-row
                  align="center"
                  class="spacer"
                  no-gutters
              >
                <v-col
                    cols="4"
                    sm="3"
                    md="2"
                >
                  <v-avatar
                      size="60px"
                  >
                    <img
                        alt="Avatar"
                        :src="item.sender.headshot"
                    >
                  </v-avatar>
                </v-col>

                <v-col
                    class="hidden-xs-only"
                    sm="4"
                    md="2"
                >
                  <strong v-html="item.sender.name||item.sender.username"></strong>
                  <!--                  <span-->
                  <!--                      v-if="message.total"-->
                  <!--                      class="grey--text"-->
                  <!--                  >-->
                  <!--                  &nbsp;({{ message.total }})-->
                  <!--                </span>-->
                </v-col>

                <!--                <v-col-->
                <!--                    class="text-no-wrap"-->
                <!--                    cols="5"-->
                <!--                    sm="3"-->
                <!--                >-->
                <!--                  <v-chip-->
                <!--                      v-if="item.is_read == false"-->
                <!--                      :color="`${item.color} light-blue`"-->
                <!--                      class="ml-0 mr-2 black&#45;&#45;text"-->
                <!--                      label-->
                <!--                      small-->
                <!--                  >-->
                <!--                    new-->
                <!--                  </v-chip>-->
                <!--                  <strong v-html="item.blog_title"></strong>-->
                <!--                </v-col>-->

                <v-col
                    class="grey--text text-truncate hidden-sm-and-down"
                >
                  &mdash;
                  {{ $moment(item.follow.timestamp).format("YYYY年MM月DD日 HH:mm:ss") }}
                </v-col>
              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text v-text="item.body"></v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingFollowings"
        class="text-center">
      <h4>呜呜呜，没有新粉丝。</h4>
    </div>
  </section>
</template>

<script>
import Notifications from '@/api/notifications.js'

export default {
  name: 'FollowingPosts',
  data() {
    return {
      items: [],
      loadingFollowings: true,
    }
  },
  methods: {
    getFollowList() {
      let followId = 1;
      console.log("getFollowList");
      Notifications.getMailList(followId)
          .then((res) => {
            console.log(res);
            this.items = res.data.items;
            this.loadingFollowings = false;
          })
          .catch((err) => {
            console.error(err);
            this.loadingFollowings = false;
          })
    }
  },
  created() {
    this.getFollowList();
  },
  beforeRouteUpdate(to, from, next) {
    this.getFollowList();
  }
}
</script>

<style>

</style>