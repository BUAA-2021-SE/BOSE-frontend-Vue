<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="this.loadingComments"> 评论列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="this.loadingComments"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <v-container fluid>
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
                    sm="5"
                    md="3"
                >
                  <strong v-html="item.sender.username"></strong>
                  <!--                  <span-->
                  <!--                      v-if="message.total"-->
                  <!--                      class="grey&#45;&#45;text"-->
                  <!--                  >-->
                  <!--                  &nbsp;({{ message.total }})-->
                  <!--                </span>-->
                </v-col>

                <v-col
                    class="text-no-wrap"
                    cols="5"
                    sm="3"
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
                  <strong v-html="item.blog_title"></strong>
                </v-col>

                <v-col
                    class="grey--text text-truncate hidden-sm-and-down"
                >
                  &mdash;
                  {{ $moment(item.comment.timestamp).format("YYYY年MM月DD日 HH:mm:ss") }}
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
  </section>
</template>

<script>
import Notifications from '@/api/notifications.js'

export default {
  name: 'ReceivedComments',

  data() {
    return {
      items: [],
      loadingComments: true
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