<template>
  <div class=" my-auto container" >
    <div v-if="sharedState.is_authenticated" class="mx-auto" width="80vw">
      <v-row>
      <v-col cols="12" md="6">
      <label>标题</label>
      <br/>
      <v-text-field
          v-model="editForm.title"
          outlined
          dense
          placeholder=""
          :class="{'is-invalid': editForm.titleError}"
          :style="{width:'30vw' ,'margin-top':'10px'}"
      ></v-text-field>

      <label>摘要</label>
      <v-textarea
          v-model="editForm.summary"
          outlined
          row-height="15"
          auto-grow
          rows="2"
          placeholder=""
          :class="{'is-invalid': editForm.summaryError}"
          :style="{width:'30vw' ,'margin-top':'10px'}"
      ></v-textarea>

      </v-col>
<v-col  md="6" class="my-auto">
    <v-btn @click="addFile">上传封面</v-btn>
    <input type="file" ref="upload_input" style="display: none;" @change="select_file" accept=".png,.jpg,.jpeg">
     <img v-if="editForm.cover" :src="editForm.cover" max-width="300px" max-height="150px" width="300px" height="150px">
</v-col>
  </v-row>
      
      <label>正文</label>
  <div style="z-index:-10">
        <mavon-editor  ref="md" v-model="editForm.body" :toolbars="tools" @imgAdd="imgAdd" :style="{'min-height':'50hv'}"/>
  </div>
  <br/>
  
      <v-alert dense outlined type="error" v-show="this.editForm.errors">
        {{ editForm.titleError || editForm.summaryError || editForm.bodyError }}
      </v-alert>
      <v-card-actions>
        <router-link :to="{name: 'Home'}">
          <v-btn>返回</v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn @click="onCommitBlog">保存</v-btn>
        <v-btn @click="onSubmitAdd">发布</v-btn>
      </v-card-actions>
     
     
    </div>
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
        bodyError: false,
        summaryError: false,
        cover: ''
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
        // navigation: true, // 导航目录
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
    }
  },
  methods: {
    imgAdd(pos,file){
      let formData=new FormData();
      formData.append("image", file);
      Post.postPicture(this.$route.params.id,formData)
          .then((res) => {
           console.log(res);
           this.$refs.md.$img2Url(pos, res.data)
          })
          .catch((error) => {
            console.log(error);
          })
    },
    getBlog(id) {
      const formData = new FormData();
      formData.append('view_id',0);
      Post.getBlog(id,formData)
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
      if (!this.editForm.summary) {
        this.editForm.errors++
        this.editForm.summaryError = 'Summary is required.'
      } else {
        this.editForm.summaryError = null
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
            this.getBlog(this.editForm.id);
            this.$toasted.success('Successfully update the post.', {icon: 'check'});
            this.editForm.title = ''
            this.editForm.summary = ''
            this.editForm.body = ''
            this.$router.push(`/post/${this.editForm.id}`)
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
    },
    addFile() {
      this.$refs.upload_input.click() // 通过 ref 模拟点击
    },
    select_file(file) {
      this.select_file_data = file.target.files
      console.log(this.select_file_data)
      let uploads = new FormData()
      if (this.select_file_data != "") {
        uploads.append("image", this.select_file_data[0])
        Post.postCover(this.$route.params.id,uploads)
            .then((res) => {
              console.log(res.data)
              this.loadingProfile = true;
              this.editForm.cover = res.data
            })
            .catch((err) => {
              console.log(err)
            })
      }
    },
  },
  mounted() {
    highlightCode()
  },
  updated() {
    highlightCode()
  },
  beforeRouteUpdate(to, from, next) {
    this.getBlog(to.params.id);
    next()
  },
  created() {
    this.getBlog(this.$route.params.id);
  }
}
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
  color: yellow;
  color: #4cabeb;
}

a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}
</style>