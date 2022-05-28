<template>
<section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="this.loadingProfile"> 收藏列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="loadingProfile"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <div v-show="!loadingProfile" v-for="(star,index) in stars" :key="index">
        {{ $moment(star.timestamp).format("LLL") }}
        <v-btn text color="error" @click="takeoffStar(star.blog)">取消收藏</v-btn>
      <blog :post = "star.blog">
      </blog>
      <div>
        <span>共有收藏{{ total }}篇</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </div>
    </div>
</section>
</template>

<script>
import store from "@/store.js";
import Star from '@/api/star';
import BlogItem from '@/components/base/BlogItem.vue'
export default {
    name:'Stars',
    components: {
        blog: BlogItem
    },
    data() {
        return{
            stars: [],
            loadingProfile: true,
            sharedState: store.state,
            blog: {
            title: "",
            summary: "",
            body: "",
            views: "",
            thumbs_up: "",
            collection: "",
            last_edit_time: "",
            },
            total: 0, //总博文数
            page: 1, //第几页
            size: 5, //每页总数
            pageTotal: 1 //总页数
        }
    },
    methods:{
        getStarPosts(){
            console.log("getStarPosts");
            Star.getStarList()
            .then((res)=>{
                console.log(res);
                this.stars = res.data;
                this.total = res.data.length;
                this.loadingProfile = false;
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        takeoffStar(post){
            console.log("takeoffStar",post);
            Star.takeoffStar(post.id)
            .then((res)=>{
                console.log(res);
                this.getStarPosts();
            })
            .catch((err)=>{
                console.log(err.response.details);
            })
        }
    },
    created() {
    this.getStarPosts();
    },
    beforeRouteUpdate(to, from, next) {
        next()
        this.getStarPosts();
    },
}
</script>

<style>

</style>