<template>
  
</template>

<script>
import store from "@/store.js";
import Post from "@/api/post";
import BlogItem from '@/components/base/BlogItem.vue'
export default {
    name:'Stars',
    components: {
        blog: BlogItem
    },
    data() {
        return{
            posts: [],
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
        getStarPosts(page){

        }
    },
    created() {
    this.getStarPosts(1);
    },
    beforeRouteUpdate(to, from, next) {
        next()
        this.getStarPosts(1);
    },
}
</script>

<style>

</style>