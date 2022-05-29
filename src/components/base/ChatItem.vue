<template>
  <div>
    <v-card outlined class="mx-auto">
        <v-card-title>
            <v-avatar size="60">
                <v-img
                :src="chat.headshot"
                alt="chat.name || chat.username"
                />
            </v-avatar>
            <router-link :to="{name:'ShowProfile',params:{id: chat.id}}">{{chat.name||chat.username}}</router-link>
        </v-card-title>
        <v-card-subtitle><span>{{chat.unread}}条未读信息</span></v-card-subtitle>
        <v-card-text>
        <span>{{chat.detail}}</span>
        </v-card-text>
        <v-card-actions>
        <v-btn text :to="{name: 'HistoryMessage',params: {id: chat.id}}">
        查看聊天记录
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
    name:'ChatItem',
    props:['chat'],
    data(){
        return{
        }
    },
}
</script>

<style>

</style>