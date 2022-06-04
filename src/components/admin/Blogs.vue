<template>
  <v-data-table
    :headers="headers"
    :items="posts"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>打回违规博文</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">确定打回博文？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{item}">
      <v-btn
          color="error"
          text
        @click="deleteItem(item)"
      >
        打回
      </v-btn>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        摘要：{{ item.summary }}
      </td>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        刷新
      </v-btn>
    </template>
    <template v-slot:item.title="{ item }">
      <v-btn
        text
        :to="{ name: 'Post', params: { id: item.id } }"
      >
        {{ item.title }}
      </v-btn>
    </template>
    <template v-slot:item.author="{ item }">
      <v-btn
        text
        :to="{name:'ShowProfile', params:{ id: item.author.id}}"
      >
        {{ item.author.name||item.author.username}}
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Post from '@/api/post'
import Admin from '@/api/admin'
import store from '../../store.js'
export default {
  name:'AdminBlogs',
    data: () => ({
      sharedState: store.state,
      dialogDelete: false,
      headers: [
        {
          text: '标题',
          align: 'start',
          value: 'title',
        },
        { text: '作者', value: 'author' },
        { text: '上传时间', value: 'timestamp' },
        { text: '操作', value: 'actions'},
      ],
      posts:[],
      editedItem:{}
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
        Admin.getExaminedBlogs()
        .then((res)=>{
          console.log(res.data);
          this.posts = res.data;
        })
      },
      deleteItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        console.log(this.editedItem);
        Admin.failExamination(this.editedItem.id)
        .then((res)=>{
          console.log(res.data);
          this.$toasted.success(`博文${this.editedItem.title}被成功打回`);
          this.closeDelete()
          this.initialize()
          
        })
        .catch((err)=>{
          console.error(err);
        })
      },
      closeDelete () {
        this.dialogDelete = false
      },
    },
}
</script>

<style>

</style>