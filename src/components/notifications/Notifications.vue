<template>
  <div>
  <v-row>
    <v-col cols="12" md="3">
        <ul>
        <li>
        <router-link :to="{name: 'ReceivedComments'}">
        <span>ReceivedComments</span>
        </router-link>
        </li>
        <li>
        <router-link :to="{name: 'ReceivedMessages'}">
        <span>ReceivedMessages</span>
        </router-link>
        </li>
        <li>
        <router-link :to="{name: 'Likes'}">
        <span>Likes</span>
        </router-link>
        </li>
        <li>
        <router-link :to="{name: 'FollowingPosts'}">
        <span>FollowingPosts</span>
        </router-link>
        </li>
        </ul>
    </v-col>
    <v-col cols="12" md="9">
    <router-view></router-view>
    </v-col>
  </v-row>
  </div>
</template>

<script>
export default {
    name:'Notifications',

}
</script>

<style>

</style>