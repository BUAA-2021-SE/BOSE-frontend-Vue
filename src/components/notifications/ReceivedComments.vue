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
            <v-expansion-panel-header
                @click="item.is_read = true, readMail(item.id)"
            >
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
                    来自用户
                    <router-link :to="{name:'ShowProfile',params:{id: item.sender.id}}"><strong
                        v-html="item.sender.name||item.sender.username"></strong></router-link>
                    的评论通知
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
                    v-show="item.is_read == false"
                    :style="{'background-color':'#00AEEC',color:'white'}"
                    label
                    small
                >
                  new
                </v-chip>
              </v-col>

            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text v-html="item.body"></v-card-text>
              <router-link
                  :to="{name: 'Post',params: {id:item.blog_id}}"
                  class="text-primary">
                <v-btn
                    color="primary"
                    class="mr-2"
                    small
                    text
                >
                  查看原文
                </v-btn>
              </router-link>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <span>共有评论{{ total }}条</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingComments"
        class="text-center">
      <h3>还没有新评论呢，快去努努力吧！</h3>
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
      total: 0, //总博文数
      page: 1, //第几页
      size: 4, //每页总数
      pageTotal: 1 //总页数
    }
  },
  methods: {
    getCommentList(page) {
      let commentId = 0;
      console.log("getCommentList");
      Notifications.getMailList(commentId,page,this.size)
          .then((res) => {
            console.log(res);
            this.items = res.data.items;
            this.total = res.data.total;
            this.page = res.data.page;
            this.size = res.data.size;
            this.pageTotal = Math.ceil(this.total / this.size);
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
    },
    readMail(id) {
      console.log("readMail" + id);
      Notifications.getMail(id);
    }
  },
  watch:{
			page: function(newPage, oldPage) {
				this.getCommentList(newPage);
			}
	},
  created() {
    this.getCommentList(1);
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getCommentList(1);
  }
}
</script>

<style>

</style>