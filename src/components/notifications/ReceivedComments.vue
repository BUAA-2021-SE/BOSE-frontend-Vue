<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingComments"> 评论列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="loadingComments"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <v-container
        v-if="items.length > 0"
        fluid>
      <v-row justify="center">
        <v-subheader>
          <h3>与我相关的评论</h3>
        </v-subheader>

        <v-expansion-panels popout>
          <v-expansion-panel
              v-for="(item,index) in items"
              :key="index"
          >
            <v-expansion-panel-header>
              <v-col
                  cols="4"
                  sm="3"
                  md="2"
                  class="spacer"
              >
                <v-avatar
                    size="62px"
                >
                  <img
                      alt="Avatar"
                      :src="item.sender.headshot"
                  >
                </v-avatar>
              </v-col>
              <v-col
                  cols="8"
                  sm="9"
                  md="10"
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
                    <strong v-html="item.sender.name||item.sender.username"></strong>
                    在博文
                    <strong v-html="item.blog_title"></strong>
                    给你留下了评论
                    <!--                  <span-->
                    <!--                      v-if="message.total"-->
                    <!--                      class="grey--text"-->
                    <!--                  >-->
                    <!--                  &nbsp;({{ message.total }})-->
                    <!--                </span>-->
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                      class="grey--text text-truncate hidden-sm-and-down"
                  >
                    {{ $moment(item.date_time).format("YYYY年MM月DD日 HH:mm:ss") }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                  cols="12"
                  sm="3"
                  md="2"
                  class="text-right"
              >
                <v-chip
                    v-if="item.is_read == false"
                    :color="`${item.color} light-blue`"
                    class="ml-0 mr-2 black--text"
                    label
                    small
                >
                  new
                </v-chip>
              </v-col>

            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>
                {{ getComments(item.body) }}
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingComments"
        class="text-center">
      <h4>呜呜呜，没有新评论。</h4>
    </div>
    <div>
      {{ items }}
    </div>
  </section>
</template>

<script>
import Notifications from '@/api/notifications.js'

export default {
  name: 'ReceivedComments',

  data() {
    return {
      items: [],
      loadingComments: true,
    }
  },
  methods: {
    getCommentList() {
      let commentId = 0;
      console.log("getCommentList");
      Notifications.getMailList(commentId)
          .then((res) => {
            console.log(res);
            this.items = res.data.items;
            this.loadingComments = false;
          })
          .catch((err) => {
            console.error(err);
            this.loadingComments = false;
          })
    },
    getComments(rawString) {
      let comments = rawString.split(":");
      comments = comments[comments.length - 1].split("：");
      return comments[comments.length - 1];
    }
  },
  created() {
    this.getCommentList();
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getCommentList();
  }
}
</script>

<style>

</style>