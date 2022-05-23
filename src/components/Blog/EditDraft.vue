<template>
  <div>
    <v-card>
      <div class="form-group" :class="{'u-has-error-v1': editForm.titleError}">
        <input type="text" v-model="editForm.title" class="form-control" id="post_title" placeholder="标题">
        <small class="form-control-feedback" v-show="editForm.titleError">{{ editForm.titleError }}</small>
      </div>
      <div class="form-group">
        <input type="text" v-model="editForm.summary" class="form-control" id="post_summary" placeholder="摘要">
      </div>
      <div class="form-group">
        <mavon-editor v-model="editForm.body" :toolbars="tools"/>
        <small class="form-control-feedback" v-show="editForm.bodyError">{{ editForm.bodyError }}</small>
      </div>
      <v-card-actions>
        <router-link
            :to="{name:'Drafts',params : {id:sharedState.user_id } }">
          <button class="btn btn-primary">Quit</button>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn @click="onCommitDraft">Commit</v-btn>
        <v-btn @click="onSubmitAdd">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import store from '@/store.js'
import Post from '@/api/post'

const highlightCode = () => {
  let blocks = document.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightElement(block)
  })
}
export default {
  name: 'EditBlog',
  data() {
    return {
      sharedState: store.state,
      post: {},
      editForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false
      },
      tools: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        navigation: true, // 导航目录
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
    }
  },
  methods: {
    getDraft(id) {
      const formData = new FormData();
      formData.append('view_id',0);
      Post.getDraft(id,formData)
          .then((res) => {
            this.post = res.data;
            console.log(res.data, "res");
            this.editForm = Object.assign({}, this.post);
          })
          .catch((err) => {
            console.error(err);
          })
    },
    onSubmitAdd() {
      if (!this.editForm.title) {
        this.editForm.errors++
        this.editForm.titleError = 'Title is required.'
      } else {
        this.editForm.titleError = null
      }
      if (!this.editForm.body) {
        this.editForm.errors++
        this.editForm.bodyError = 'Body is required.'
      } else {
        this.editForm.bodyError = null
      }
      if (this.editForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        console.log("表单验证没通过")
        return false
      }
      const formData = new FormData();
      formData.append('title', this.editForm.title);
      formData.append('summary', this.editForm.summary);
      formData.append('body', this.editForm.body);
      Post.editBlog(this.$route.params.id, formData)
          .then((res) => {
            console.log(res);
            this.getDraft(this.editForm.id);
            this.$toasted.success('Successfully upload the Draft.', {icon: 'check'});
            this.editForm.title = ''
            this.editForm.summary = ''
            this.editForm.body = ''
            this.$router.push({name:'Home'});
          })
          .catch((err) => {
            console.error(err);
            this.$toasted.error('Something error.', {icon: 'check'});
          })
    },
    onCommitDraft(){
      if (!this.editForm.title) {
        this.editForm.errors++
        this.editForm.titleError = 'Title is required.'
      } else {
        this.editForm.titleError = null
      }
      if (!this.editForm.body) {
        this.editForm.errors++
        this.editForm.bodyError = 'Body is required.'
      } else {
        this.editForm.bodyError = null
      }
      if (this.editForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        console.log("表单验证没通过")
        return false
      }
      const formData = new FormData();
      formData.append('title', this.editForm.title);
      formData.append('summary', this.editForm.summary);
      formData.append('body', this.editForm.body);
      Post.editDraft(this.$route.params.id, formData)
      .then((res)=>{
        console.log(res);
        this.$toasted.success('Successfully commit the draft.', {icon: 'check'});
      })
      .catch((err)=>{
        console.log(err);
        this.$toasted.error('Something error.', {icon: 'check'});
      })
    }
  },
  mounted() {
    highlightCode()
  },
  updated() {
    highlightCode()
  },
  beforeRouteUpdate(to, from, next) {
    this.getDraft(to.params.id);
    next()
  },
  created() {
    this.getDraft(this.$route.params.id);
  }
}
</script>

<style>

</style>