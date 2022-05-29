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
        <v-card-text>
        向您发送了私信
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