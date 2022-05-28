<template>
<div>
<span>收藏于{{ $moment(star.timestamp).format("LLL") }}</span>
<v-btn text color="error" @click="takeoffStar(star.blog)">取消收藏</v-btn>
<blog :post="star.blog"></blog>
</div>
</template>

<script>
import Star from '@/api/star';
import BlogItem from '@/components/base/BlogItem.vue'
export default {
    name:'StarItem',
    components: {
        blog:BlogItem
    },
    props: ["star"],
    data(){
        return{}
    },
    methods: {
        takeoffStar(blog){
            this.$emit('takeoff',blog);
        }
    }
}
</script>

<style>

</style>