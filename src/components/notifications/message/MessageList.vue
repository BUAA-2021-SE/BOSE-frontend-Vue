<template>
  <div>
  <div v-for="(message,index) in messages" :key="index">
    <chat :chat="message"></chat>
  </div>
          <span>共有用户{{ total }}人</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
  </div>
</template>

<script>
import Notifications from '@/api/notifications.js'
import ChatItem from '@/components/base/ChatItem.vue'
export default {
    name:'MessageList',
    components: {
        chat:ChatItem
    },
    data(){
        return{
            messages:[],
            total: 0, //总博文数
            page: 1, //第几页
            size: 4, //每页总数
            pageTotal: 1 //总页数
        }
    },
    methods:{
        getRoomList(page){
            Notifications.getRoomList(page,this.size)
            .then((res)=>{
                console.log(res.data);
                this.messages = res.data.items;
                this.total = res.data.total;
                this.page = res.data.page;
                this.size = res.data.size;
                this.pageTotal = Math.ceil(this.total / this.size);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    watch:{
			page: function(newPage, oldPage) {
				this.getRoomList(newPage);
			}
	},
    created(){
        this.getRoomList(1);
    },
    beforeRouteUpdate(to, from, next){
        next();
        this.getRoomList(1);
    }
}
</script>

<style>

</style>