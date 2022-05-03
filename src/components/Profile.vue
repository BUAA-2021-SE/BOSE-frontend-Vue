<template>

</template>

<script>
import {Account} from "@/api/account.js"
import store from '@/store.js'
export default {
    name:'Profile',
    data(){
        return{
            sharedState: store.state,
            user:{
                username:'',
                name:'',
                email:'',
                location:'',
                about_me:'',
                headshot:'',
                member_since:'',
                last_seen:'',
                _links:{
                    avatar:''
                }
            }
        }
    },
    methods:{
        getUserDetail(id){
            let formData = new FormData()
            formData.append('user_id',id)
            Account.getUser(formData)
            .then((res)=>{
                console.log((res.data));
                this.user.name = res.data.username
                this.user.about_me = res.data.about_me
                this.$toasted.('hello there, i am a toast !!', { icon : 'check'});
                this.user._links.avatar = res.data.headshot
                this.user.last_seen = res.data.last_seen
                this.user.location = res.data.location
                this.user.username = res.data.username
            })
            .catch((err)=>{
                console.log((err));
            })
        }
    },
    created(){
        this.getUserDetail(store.state.user_id);
    }
}
</script>

<style>

</style>