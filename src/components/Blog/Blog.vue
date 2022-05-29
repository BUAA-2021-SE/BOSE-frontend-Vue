<template>
  <div class="mx-5">
    <div class="text-center" v-show="this.loadingProfile">
      <h3 v-show="this.loadingProfile">
        博客加载中······
        <v-progress-circular
          class="center"
          indeterminate
          color="primary"
          :size="40"
          :width="3"
          v-show="this.loadingProfile"
        ></v-progress-circular>
      </h3>
    </div>
    <v-container v-show="!this.loadingProfile" grid-list-xl>
      <!-- 目录 -->
      <!-- Sidebar -->
      <v-row>
        <!-- End Sidebar -->
        <v-col cols="12" md="9" >
          <!-- 博文内容 -->
          <!-- Articles Content -->
          <article>
            <header class="g-mb-30">
              <h1 class="g-color-primary g-mb-15">{{ post.title }}</h1>
              <ul class="list-inline d-sm-flex g-color-gray-dark-v4 mb-0">
                <li v-if="post.author">
                  <router-link
                    :to="{
                      name: 'ShowProfile',
                      params: { id: post.author.id },
                    }"
                    class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover"
                  >
                    <span v-if="post.author.name">{{ post.author.name }}</span>
                    <span v-else>{{ post.author.username }}</span></router-link
                  >
                </li>
                <li>/</li>
                <li>
                  <i class="icon-clock"></i>
                  {{ $moment(post.timestamp).format("LLL") }}
                </li>
                <li>/</li>
                <li>
                  <a
                    class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover"
                    href="#comment-list-wrap"
                  >
                    <i class="icon-bubble"></i> {{ comments.length }}
                  </a>
                </li>
                <li><i class="icon-eye"></i> {{ post.views }} 次阅读</li>
              </ul>
              <div v-if="post.author && post.author.id == sharedState.user_id">
                <v-btn
                  color="primary"
                  text
                  :to="{ name: 'PostEdit', params: { id: post.id } }"
                  >编辑</v-btn
                >
                <v-btn @click="deleteBlogDialog = true" color="error" text
                  >删除</v-btn
                >
              </div>
              <hr class="g-brd-gray-light-v4 g-my-15" />
            </header>

            <div class="postBody">
              <vue-markdown
                :source="post.body"
                v-highlight
                :toc="showToc"
                :toc-first-level="1"
                :toc-last-level="3"
                @toc-rendered="tocAllRight"
                toc-id="toc"
              >
              </vue-markdown>
            </div>
            <v-btn
              v-if="btnOutlineColor"
              @click="onLikeOrUnlikePost(post)"
              color="primary"
              text
              :style="{ width: '80px' }"
            >
              <span v-if="post.likers_id && post.likers_id.length > 0"
                ><v-icon
                  class="material-icons my-auto"
                  :style="{
                    color: '#1976D2',
                    'font-size': '20px',
                    'margin-right': '10px',
                    'margin-top': '-4px!important',
                  }"
                >
                  thumb_up </v-icon
                >{{ post.likers_id.length }}</span
              >
            </v-btn>
            <v-btn
              v-else
              :style="{ width: '80px' }"
              text
              @click="onLikeOrUnlikePost(post)"
            >
              <span v-if="post.likers_id && post.likers_id.length > 0"
                ><v-icon
                  class="material-icons my-auto"
                  :style="{
                    'margin-right': '10px',
                    'margin-top': '-4px!important',
                  }"
                >
                  thumb_up </v-icon
                >{{ post.likers_id.length }}</span
              >
            </v-btn>
            <v-btn
              text
              v-if="ifStarred"
              @click="onUnStarPost(post)"
              color="primary"
            >
              <span v-if="post.stars_id && post.stars_id.length > 0"
                ><v-icon
                  class="material-icons my-auto"
                  :style="{
                    color: '#1976D2',
                    'font-size': '20px',
                    'margin-right': '10px',
                    'margin-top': '-4px!important',
                  }"
                  >star</v-icon
                >{{ post.stars_id.length }}</span
              >
              <span v-else
                ><v-icon
                  class="material-icons my-auto"
                  :style="{
                    color: '#1976D2',
                    'font-size': '20px',
                    'margin-right': '10px',
                    'margin-top': '-4px!important',
                  }"
                  >star</v-icon
                >
              </span>
            </v-btn>
            <v-btn
              text
              v-else
              @click="onStarPost(post)"
              :style="{ width: '80px' }"
            >
              <span v-if="post.stars_id && post.stars_id.length > 0">
                <v-icon
                  class="material-icons my-auto"
                  :style="{
                    'margin-right': '10px',
                    'margin-top': '-4px!important',
                  }"
                  >star</v-icon
                >{{ post.stars_id.length }}</span
              >
              <span v-else
                ><v-icon
                  class="material-icons my-auto"
                  :style="{
                    'margin-right': '10px',
                    'margin-top': '-4px!important',
                  }"
                  >star</v-icon
                >
              </span>
            </v-btn>

            <div class="col-lg-9">
              <ul v-if="post.likers" class="list-inline mb-0">
                <li
                  class="list-inline-item"
                  v-for="(liker, index) in post.likers"
                  v-bind:key="index"
                >
                  <router-link
                    v-bind:to="{ path: `/user/${liker.id}` }"
                    v-bind:title="liker.name || liker.username"
                  >
                    <img
                      class="g-brd-around g-brd-gray-light-v3 g-pa-2 g-width-40 g-height-40 rounded-circle rounded mCS_img_loaded g-mt-3"
                      v-bind:src="liker.avatar"
                      v-bind:alt="liker.name || liker.username"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
          </article>

          <v-dialog
            style="z-index: 2000"
            v-model="deleteBlogDialog"
            width="25vw"
            height="20vh"
          >
            <v-card
              :style="{ width: '25vw', height: '20vh' }"
              class="d-flex align-center flex-wrap"
            >
              <v-row class="mx-auto d-flex justify-center">
                <v-card-title class="mx-auto"
                  ><h3 class="mx-auto">确定删除？</h3>
                </v-card-title>
                <v-card-actions>
                  <v-btn color="primary" text @click="deleteBlogDialog = false">
                    取消
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="onDeletePost"> 确认 </v-btn>
                </v-card-actions>
              </v-row>
            </v-card>
          </v-dialog>
          <v-dialog
            style="z-index: 2000"
            v-model="deleteCommentDialog"
            width="25vw"
            height="20vh"
          >
            <v-card
              :style="{ width: '25vw', height: '20vh' }"
              class="d-flex align-center flex-wrap"
            >
              <v-row class="mx-auto d-flex justify-center">
                <v-card-title class="mx-auto"
                  ><h3 class="mx-auto">确定删除？</h3>
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    text
                    @click="deleteCommentDialog = false"
                  >
                    取消
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="onDeleteComment">
                    确认
                  </v-btn>
                </v-card-actions>
              </v-row>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="replyCommentDialog"
            style="z-index: 2000"
            width="60vw"
            height="30vh"
          >
            <!-- Add Comment Form -->
            <v-card v-if="sharedState.is_authenticated">
              <!-- <v-form
                id="addCommentForm"
                v-if="sharedState.is_authenticated"
                @submit.prevent="onSubmitReplyComment"
                @reset.prevent="currentForm.body=''"
              > -->
              <v-row class="mx-auto d-flex justify-center">
                <v-card-title id="replyTo"
                  ><h4
                    :style="{ 'padding-top': '100px', 'padding-left': '30px' }"
                    v-html="currentForm.replyTo"
                  ></h4
                ></v-card-title>
              </v-row>
              <v-divider class="mx-4"></v-divider>

              <v-textarea
                class="m-auto"
                :style="{ width: '50vw', 'margin-top': '10px' }"
                outlined
                auto-grow
                v-model="currentForm.body"
              ></v-textarea>
              <small
                class="form-control-feedback"
                v-show="currentForm.bodyError"
                >{{ currentForm.bodyError }}</small
              >

              <v-card-actions
                class="d-flex justify-between"
                :style="{
                  'padding-bottom': '20px',
                  'padding-left': '20px',
                  'padding-right': '20px',
                }"
              >
                <v-btn
                  type="reset"
                  text
                  @click="replyCommentDialog = !replyCommentDialog"
                  >取消</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  text
                  color="primary"
                  preventdefault
                  @click="onSubmitReplyComment"
                  >评论</v-btn
                >
              </v-card-actions>

              <!-- </v-form> -->
            </v-card>
            <!-- End Add Comment Form -->
          </v-dialog>
  
          <!-- End Articles Content -->
          <!-- 博文评论 -->
          <div id="comment-list-wrap" class="card border-0 g-mb-15">
            <!-- Panel Header -->
            <div
              class="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15"
            >
              <h3 class="h6 mb-0">
                <i class="icon-bubbles g-pos-rel g-top-1 g-mr-5"></i> 评论区
              </h3>
            </div>
            <!-- End Panel Header -->

            <!-- Add Comment Form -->

            <v-row>
              <v-col cols="12" md="1" class="d-flex justify-center">
                <v-avatar size="60">
                  <img
                    :src="user._links.avatar"
                    width="60px"
                    height="60px"
                    max-height="60px"
                    max-width="60px"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" md="11">
                <div id="addCommentForm" v-if="sharedState.is_authenticated">
                  <v-row>
                    <v-col cols="12" md="10">
                      <v-textarea
                        v-model="commentForm.body"
                        dense
                        v-highlight
                        outlined
                        auto-grow
                        placeholder="发布一条友善的评论"
                        row-height="20"
                        rows="3"
                      ></v-textarea>

                      <v-alert
                        dense
                        outlined
                        type="error"
                        v-show="commentForm.bodyError"
                        :style="{'margin-top':'-20px','margin-bottom':'5px'}"
                      >
                        评论不能为空哦
                      </v-alert>
                    </v-col>
                    <v-col cols="12" md="2">
                      <v-btn
                        :style="{
                          height: '70px',
                          width: '100%',
                          'margin-top': '-5px',
                          'background-color': '#00AEEC',
                          color: '#FFFFFF',
                        }"
                        type="submit"
                        @click="onSubmitAddComment()"
                        preventdefault
                        >发布</v-btn
                      >
                    </v-col>
                  </v-row>
                </div>
                <!-- End Add Comment Form -->

                <div v-else>
                  <v-btn color="error" block :to="{ name: 'Login' }">
                    发表评论前，请先登录 ...
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <!-- Panel Body -->
            <!-- 一级评论，按时间倒序排列 -->
            <div v-for="(comment, index) in comments" :key="index">
              <v-card outlined :id="'c' + comment.id"  :style="{'border-left-color':'#FFFFFF','border-bottom-color':'#FFFFFF','border-right-color':'#FFFFFF'}">
                <v-card-title>
                  <router-link :to="{ path: `/user/${comment.author.id}` }">
                    <v-avatar size="60">
                      <v-img
                        :src="comment.author.headshot"
                        alt="comment.author.name || comment.author.username"
                      />
                    </v-avatar>
                  </router-link>
                  <p class="ml-3">
                    <router-link
                      style="text-decoration: none"
                      :to="{ path: `/user/${comment.author.id}` }"
                    >
                      {{ comment.author.name || comment.author.username }}
                    </router-link>

                    <v-btn
                      v-if="comment.author.id == post.author.id"
                      x-small
                      text
                      :style="{ 'pointer-events': 'none' }"
                    >
                      <i
                        class="icon-check g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5"
                      ></i
                      >博文作者
                    </v-btn>
                  </p>
                </v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text :style="{'color':'#000000','padding-bottom':'0px'}">
                  <div v-if="comment.disabled">
                    此评论包含不良信息，已被禁止显示.
                  </div>
                  <div v-else>
                    <!-- vue-markdown 开始解析markdown，它是子组件，通过 props 给它传值即可
                    v-highlight 是自定义指令，用 highlight.js 语法高亮 -->
                    <vue-markdown :source="comment.body" v-highlight >
                    </vue-markdown>
                  </div>
                </v-card-text>
                
                <ul class="list-inline d-sm-flex my-0">
                  <li class="my-auto" :style="{color:'grey'}">{{$moment(comment.timestamp).format("YYYY年MM月DD日 HH:mm:ss")}}</li>
                  <li v-if="!comment.disabled" class="list-inline-item g-mr-20">
                    <v-btn
                      @click="onLikeOrUnlikeComment(comment)"
                      v-if="
                        comment.likers_id.indexOf(sharedState.user_id) != -1
                      "
                      text
                      :style="{ width: '80px' }"
                      color="primary"
                    >
                      <span v-if="comment.likers_id.length > 0">
                        <v-icon
                          class="material-icons my-auto"
                          :style="{
                            color: '#1976D2',
                            'font-size': '20px',
                            'margin-right': '10px',
                            'margin-top': '-4px!important',
                          }"
                        >
                          thumb_up </v-icon
                        >{{ comment.likers_id.length }}</span
                      >
                      <span v-else
                        ><v-icon
                          class="material-icons my-auto"
                          :style="{
                            color: '#1976D2',
                            'font-size': '20px',
                            'margin-right': '10px',
                            'margin-top': '-4px!important',
                          }"
                        >
                          thumb_up
                        </v-icon></span
                      >
                    </v-btn>
                    <v-btn
                      text
                      @click="onLikeOrUnlikeComment(comment)"
                      :style="{ width: '80px' }"
                      v-else
                    >
                      <span v-if="comment.likers_id.length > 0">
                        <v-icon
                          class="material-icons my-auto"
                          :style="{
                            'margin-right': '10px',
                            'margin-top': '-4px!important',
                          }"
                        >
                          thumb_up </v-icon
                        >{{ comment.likers_id.length }}</span
                      >
                      <span v-else>
                        <v-icon
                          class="material-icons my-auto"
                          :style="{
                            'margin-right': '10px',
                            'margin-top': '-4px!important',
                          }"
                        >
                          thumb_up
                        </v-icon></span
                      >
                    </v-btn>
                  </li>
                  <li v-if="!comment.disabled" class="list-inline-item g-mr-20">
                    <v-btn @click="onClickReply(comment)" text>
                      <i class="icon-note g-pos-rel g-top-1 g-mr-3"></i>
                      回复
                    </v-btn>
                  </li>
                  <ul class="list-inline mb-0 ml-auto">
                    <li style="display: none" class="list-inline-item g-mr-5">
                      <v-btn
                        @click="onEditComment(comment)"
                        color="purple"
                        data-toggle="modal"
                        data-target="#editCommentModal"
                        >编辑</v-btn
                      >
                    </li>
                    <li
                      v-if="
                        comment.disabled &&
                        post.author.id == sharedState.user_id
                      "
                      class="list-inline-item"
                    >
                      <v-btn
                        @click="onEnabledComment(comment)"
                        small
                        color="teal"
                        >恢复</v-btn
                      >
                    </li>
                    <li
                      v-if="
                        comment.author.id == sharedState.user_id ||
                        post.author.id == sharedState.user_id
                      "
                      class="list-inline-item"
                    >
                      <v-btn
                        @click="
                          deleteCommentDialog = true;
                          deleteCommentId = comment.id;
                        "
                        text
                        small
                        color="red"
                        >删除</v-btn
                      >
                    </li>
                  </ul>
                </ul>
              </v-card>

              <!-- 子级评论，按时间正序排列 -->
              <v-card
                v-show="comment.descendants"
                v-for="(child, cindex) in comment.descendants"
                :key="cindex"
                :id="'c' + child.id"
                outlined
                width="80%"
                class="mx-auto"
                :style="{'border-color':'#FFFFFF','border-right-color':'#FFFFFF','margin-right':'0px'}"
              >
                <v-card-title>
                  <router-link :to="{ path: `/user/${child.author.id}` }">
                    <v-avatar size="40">
                      <v-img
                        :src="child.author.headshot"
                        alt="child.author.name || child.author.username"
                      />
                    </v-avatar>
                  </router-link>
                  <p class="ml-3">
                    <router-link
                      style="text-decoration: none"
                      :to="{ path: `/user/${child.author.id}` }"
                    >
                      {{ child.author.name || child.author.username }}
                    </router-link>

                    <v-btn
                      v-if="child.author.id == post.author.id"
                      x-small
                      text
                      :style="{ 'pointer-events': 'none' }"
                    >
                      <i
                        class="icon-check g-pos-rel g-top-1 g-color-gray-dark-v5 g-mr-5"
                      ></i
                      >博文作者
                    </v-btn>
                  </p>
                </v-card-title>
                <v-card-subtitle>
                  <span></span>
                </v-card-subtitle>
                <v-card-text :style="{'color':'#000000','padding-bottom':'0px'}">
                  <div v-if="child.disabled" class="g-color-red g-mb-15">
                    此评论已被禁止显示.
                  </div>
                  <div v-else>
                    <vue-markdown :source="child.body" highlight >
                    </vue-markdown>
                  </div>
                </v-card-text>
                <ul class="list-inline d-sm-flex my-0">
                  <li class="my-auto" :style="{color:'grey'}">{{$moment(child.timestamp).format("YYYY年MM月DD日 HH:mm:ss")}}</li>
                  <li v-if="!child.disabled" class="list-inline-item g-mr-20">
                    <v-btn
                      text
                      @click="onLikeOrUnlikeComment(child)"
                      v-if="child.likers_id.indexOf(sharedState.user_id) != -1"
                      color="primary"
                      :style="{ width: '80px' }"
                    >
                      <span v-if="child.likers_id.length > 0">
                        <v-icon
                          class="material-icons my-auto"
                          :style="{
                            color: '#1976D2',
                            'font-size': '20px',
                            'margin-right': '10px',
                            'margin-top': '-4px!important',
                          }"
                        >
                          thumb_up </v-icon
                        >{{ child.likers_id.length }}</span
                      >
                      <span v-else
                        ><v-icon
                          class="material-icons my-auto"
                          :style="{
                            color: '#1976D2',
                            'font-size': '20px',
                            'margin-right': '10px',
                            'margin-top': '-4px!important',
                          }"
                        >
                          thumb_up
                        </v-icon></span
                      >
                    </v-btn>
                    <v-btn
                      @click="onLikeOrUnlikeComment(child)"
                      :style="{ width: '80px' }"
                      v-else
                      text
                    >
                      <span v-if="child.likers_id.length > 0">
                        <v-icon
                          class="material-icons my-auto"
                          :style="{
                            'margin-right': '10px',
                            'margin-top': '-4px!important',
                          }"
                        >
                          thumb_up </v-icon
                        >{{ child.likers_id.length }}</span
                      >
                      <span v-else>
                        <v-icon
                          class="material-icons my-auto"
                          :style="{
                            'margin-right': '10px',
                            'margin-top': '-4px!important',
                          }"
                        >
                          thumb_up
                        </v-icon></span
                      >
                    </v-btn>
                  </li>
                  <li v-if="!child.disabled" class="list-inline-item g-mr-20">
                    <v-btn
                      @click="onClickReply(child)"
                      class="comment-reply-link"
                      text
                    >
                      <i class="icon-note g-pos-rel g-top-1 g-mr-3"></i>
                      回复
                    </v-btn>
                  </li>
                  <ul class="list-inline mb-0 ml-auto">
                    <li style="display: none" class="list-inline-item g-mr-5">
                      <button
                        @click="onEditComment(child)"
                        class="btn btn-xs u-btn-outline-purple"
                        data-toggle="modal"
                        data-target="#editCommentModal"
                      >
                        编辑
                      </button>
                    </li>
                    <li
                      v-if="
                        child.disabled && post.author.id == sharedState.user_id
                      "
                      class="list-inline-item"
                    >
                      <v-btn
                        @click="onEnabledComment(comment)"
                        small
                        color="teal"
                        >恢复</v-btn
                      >
                    </li>
                    <li
                      v-if="
                        child.author.id == sharedState.user_id ||
                        post.author.id == sharedState.user_id
                      "
                      class="list-inline-item"
                    >
                      <v-btn
                        @click="
                          deleteCommentDialog = true;
                          deleteCommentId = child.id;
                        "
                        text
                        small
                        color="red"
                        >删除</v-btn
                      >
                    </li>
                  </ul>
                </ul>
              </v-card>
            </div>
            <v-divider></v-divider>
            <span class="mx-auto">没有更多评论了捏~</span>
            <!-- End Panel Body -->
          </div>
          <!-- Pagination #04 -->
          <!-- <div v-if="comments && comments._meta.total_pages > 1">
          <v-pagination
          v-model="comments._meta.page"
          :length="comments._meta.total_pages"
          :total-visible="7"
          circle
          ></v-pagination>
        </div> -->
          <!-- End Pagination #04 -->

          <!-- end Articles Content -->
        </v-col>
        <v-col cols="12" md="3" class="link">
          <v-row class="d-flex justify-center">
            <v-btn
              class="mx-5"
              fab
              dark
              large
              color="blue"
              @click="showContent = !showContent"
              v-if="!showContent"
            >
              <span class="material-icons" :style="{ 'font-size': '40px' }">
                expand_more
              </span>
            </v-btn>
            <v-btn
              class="mx-5"
              fab
              dark
              large
              color="blue"
              @click="showContent = !showContent"
              v-else
            >
              <span class="material-icons" :style="{ 'font-size': '40px' }">
                expand_less
              </span>
            </v-btn>
            <v-expand-transition>
              <v-card outlined class="mx-auto" v-show="showContent">
                <div :style="{ 'margin-top': '15px' }">
                  <div :style="{ 'margin-left': '9px', 'font-size': '30px' }">
                    目录
                  </div>
                  <div v-html="topic"></div>
                </div>
              </v-card>
            </v-expand-transition>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store.js";
import VueMarkdown from "vue-markdown";
import Post from "@/api/post";
import * as hljs from "highlight.js";
import Comment from "@/api/comment";
import Star from "@/api/star";
import { Account } from "@/api/account.js";
const highlightCode = () => {
  let blocks = document.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightElement(block);
  });
};
export default {
  name: "Post",
  components: {
    VueMarkdown,
  },
  data() {
    return {
      loadingProfile: true,
      showContent: true,

      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      sharedState: store.state,
      post: {},
      rules: [(v) => v.length <= 50 || "Max 50 characters"],
      comments: [],
      commentForm: {
        body: "",
        errors: 0, // 表单是否在前端验证通过，0 表示没有错误，验证通过
        bodyError: null,
      },
      currentForm: {
        replyId: 0,
        replyTo: "",
        body: "",
        errors: 0, // 表单是否在前端验证通过，0 表示没有错误，验证通过
        bodyError: null,
      },

      editForm: {
        title: "",
        summary: "",
        body: "",
        errors: 0, // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false,
      },
      editCommentForm: {
        body: "",
        errors: 0, // 表单是否在前端验证通过，0 表示没有错误，验证通过
        bodyError: null,
      },
      deleteCommentId: 0,
      snackbar: false,
      deleteCommentDialog: false,
      deleteBlogDialog: false,
      replyCommentDialog: false,
      showToc: true,
      showEdit: false,
      topic: "",
      ifStarred: false,
      user: {
        username: "",
        name: "",
        email: "",
        followed_num: 0,
        followes_num: 0,
        have_new_mail: false,
        unread_comments: 0,
        unread_followings: 0,
        unread_likes: 0,
        unread_messages: 0,
        location: "",
        about_me: "",
        headshot: "",
        member_since: "",
        last_seen: "",
        _links: {
          avatar: "",
        },
      },
    };
  },
  methods: {
    getBlog(id) {
      const formData = new FormData();
      formData.append("view_id", this.sharedState.user_id);
      Post.getBlog(id, formData)
        .then((res) => {
          this.post = res.data;
          console.log("blog", this.post);
          console.log(this.sharedState.user_id);
          this.ifStarred = false;
          if (
            this.post.stars_id &&
            this.post.stars_id.indexOf(this.sharedState.user_id) != -1
          ) {
            this.ifStarred = true;
          }
          this.loadingProfile = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onDeletePost() {
      Post.deleteBlog(this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.deleteBlogDialog = false;
          this.$toasted.success(res.data, {
            icon: "check",
            fullWidth: true,
            position: "bottom-center",
          });
          this.$router.push("/");
        })
        .catch((err) => {
          console.error(err, "not deleted");
        });
    },
    getDocsFirstLevels(times) {
      // 解决图片加载会影响高度问题
      setTimeout(() => {
        let firstLevels = [];
        Array.from(document.querySelectorAll("h3"), (element) => {
          firstLevels.push(element.offsetTop - 60);
        });
        this.docsFirstLevels = firstLevels;
        if (times < 8) {
          this.getDocsFirstLevels(times + 1);
        }
      }, 500);
    },
    tocAllRight(tocHtmlStr) {
      this.topic = tocHtmlStr;
      console.log(this.topic);
    },
    getPostComments(id) {
      Comment.getComments(id)
        .then((res) => {
          this.comments = res.data;
          console.log(this.comments, "getComments");
        })
        .catch((err) => {
          console.error(err.response.data.detail, "errorMessage");
        });
    },
    onSubmitAddComment() {
      console.log("onSubmitAddComment");
      let blogId = this.$route.params.id;
      if (!this.commentForm.body) {
        this.commentForm.error++;
        this.commentForm.bodyError = "Body is required.";
        this.snackbar = true;
        setInterval(() => {
          this.snackbar = false;
        }, 3000);
      } else {
        this.commentForm.bodyError = null;
      }
      if (this.commentForm.error > 0) {
        return false;
      }
      const formData = new FormData();
      formData.append("text", this.commentForm.body);
      Comment.postComments(blogId, formData)
        .then((res) => {
          console.log(res.data, "onsubmit");
          this.commentForm.body = "";
          this.commentForm.error = 0;
          this.commentForm.bodyError = "";
          this.getPostComments(this.$route.params.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickReply(comment) {
      if (!this.sharedState.is_authenticated) {
        this.$toasted.error("您需要先登录才能回复评论 ...", { icon: "check" });
        this.$router.replace({ name: "Login" });
      }
      console.log(comment.author.id, "comment");

      let cid = comment.author.id;
      let name = comment.author.name;
      this.currentForm.replyId = comment.id;
      this.currentForm.replyTo = `回复 <a href="/user/${cid}"> @${name}</a>:`;
      // console.log(document.getElementById("replyTo"));
      this.currentForm.body = "";
      this.replyCommentDialog = true;
    },
    onSubmitReplyComment() {
      const formData = new FormData();
      formData.append("text", this.currentForm.replyTo + this.currentForm.body);
      Comment.replyComment(this.currentForm.replyId, formData)
        .then((res) => {
          console.log(res);
          this.getPostComments(this.$route.params.id);
          this.replyCommentDialog = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onDeleteComment() {
      this.deleteCommentDialog = false;
      Comment.deleteComment(this.deleteCommentId)
        .then((res) => {
          console.log(res, "ondeleteComment");
          this.getPostComments(this.$route.params.id);
        })
        .catch((err) => {
          console.error(err.response.data.detail);
        });
    },
    onLikeOrUnlikePost(post) {
      console.log("onLikeOrUnlikePost", post);
      Post.thumbUp(post.id)
        .then((res) => {
          console.log(res);
          this.getBlog(this.$route.params.id);
        })
        .catch((err) => {
          console.error(err.response.detail);
        });
    },
    onLikeOrUnlikeComment(comment) {
      console.log("onLikeOrUnlikeComment", comment);
      Comment.thumbUpComment(comment.id)
        .then((res) => {
          console.log(res);
          this.getPostComments(this.$route.params.id);
        })
        .catch((err) => {
          console.error(error.response.detail);
        });
    },
    onUnStarPost(post) {
      console.log("onUnStarPost", post);
      Star.takeoffStar(post.id)
        .then((res) => {
          console.log(res);
          this.getBlog(this.$route.params.id);
        })
        .catch((err) => {
          console.log(err.response.detail);
        });
    },
    onStarPost(post) {
      console.log("onStarPost", post);
      Star.postStar(post.id)
        .then((res) => {
          console.log(res);
          this.getBlog(this.$route.params.id);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    queryUser() {
      Account.getUser(this.sharedState.user_id)
        .then((res) => {
          console.log(res.data);
          this.user.name = res.data.name;
          this.user.about_me = res.data.about_me;
          this.user._links.avatar = res.data.headshot;
          this.user.last_seen = res.data.last_seen;
          this.user.location = res.data.location;
          this.user.username = res.data.username;
          this.user.followed_num = res.data.followed_num;
          this.user.followes_num = res.data.followes_num;
          this.user.have_new_mail = res.data.have_new_mail;
          this.user.unread_comments = res.data.unread_comments;
          this.user.unread_followings = res.data.unread_followings;
          this.user.unread_likes = res.data.unread_likes;
          this.user.unread_messages = res.data.unread_messages;
          this.loadingProfile = false;
          this.newMessage =
            this.user.unread_comments +
            this.user.unread_followings +
            this.user.unread_likes +
            this.user.unread_messages;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    content() {
      return this.post.body;
    },
    btnOutlineColor() {
      if (this.sharedState.is_authenticated) {
        if (
          this.post.likers_id &&
          this.post.likers_id.indexOf(this.sharedState.user_id) != -1
        ) {
          return true;
        }
      }
      return false;
    },
  },
  created() {
    const postId = this.$route.params.id;
    this.getBlog(postId);
    this.getPostComments(postId);
  },
  mounted() {
    highlightCode();
    this.queryUser();
  },
  updated() {
    highlightCode();
  },
  beforeRouteUpdate(to, from, next) {
    this.getBlog(to.params.id);
    next();
  },
};
</script>

<style scoped>
.postBody {
  margin-top: -70px !important;
  padding-top: 70px;
}
</style>
<style>

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: -70px !important;
  padding-top: 70px;
}

</style>

<style scoped>

.content {
  padding: 8px 8px;
  font-size: 14px;
}

.body {
  margin-top: 24px;
  background: #f0f0f0;
  border-radius: 5px;
}
ul {
  list-style-type: none;
  padding: 2px 6px;
}
li {
  list-style-type: none;
  margin: 2px 6px;
}

a {
  color: #42b983;
  text-decoration: none;
}

@media screen and (min-width: 960px) {
  .link {
    padding-top: 100px;
    position: fixed;
    right: 25px;
    top: 100;
  }
  .link_cover {
    max-height: 400px;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: visible;
  }
}

@media screen and (min-width: 1060px) {
  .link {
    padding-top: 100px;
    position: fixed;
    right: 50px;
    top: 100;
  }
  .link_cover {
    max-height: 400px;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: visible;
  }
}

</style>
