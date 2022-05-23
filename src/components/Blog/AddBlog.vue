<template>
  <div class=" my-auto container" >
    <v-form v-if="sharedState.is_authenticated" class="mx-auto" width="80vw">
      
      <label>标题</label>
      <v-text-field
          v-model="postForm.title"
          solo
          dense
          placeholder=""
          :class="{'is-invalid': postForm.titleError}"
      ></v-text-field>
      <label>摘要</label>
      <v-text-field
          v-model="postForm.summary"
          solo
          dense
          placeholder=""
          :class="{'is-invalid': postForm.summaryError}"
      ></v-text-field>
      <label>正文</label>
  <div style="z-index:-10">
        <mavon-editor v-model="postForm.body" :toolbars="tools"/>
  </div>
  <br/>
  
      <v-alert dense outlined type="error" v-show="this.postForm.errors">
        {{ postForm.titleError || postForm.summaryError || postForm.bodyError }}
      </v-alert>
      <v-card-actions>
        <router-link :to="{name: 'Home'}">
          <v-btn>Quit</v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn @click="onCommitBlog">Commit</v-btn>
        <v-btn @click="onSubmitAdd">Submit</v-btn>
      </v-card-actions>
     
     
    </v-form>
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
      postForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false,
        summaryError: false
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
    onSubmitAdd() {
      this.postForm.errors = 0;
      this.postForm.title = this.postForm.title.trim()
      this.postForm.summary = this.postForm.summary.trim()
      this.postForm.body = this.postForm.body.trim()

      if (this.postForm.title == "") {
        this.postForm.errors++;
        console.log("aaa");
        this.postForm.titleError = "Please Enter Title"
      } else {
        this.postForm.titleError = null
      }
      if (this.postForm.summary == "") {
        this.postForm.errors++;
        this.postForm.summaryError = "Please Enter Summary"
      } else {
        this.postForm.summaryError = null
      }
      if (this.postForm.body == "") {
        this.postForm.errors++;
        this.postForm.bodyError = "You Should Write Something"
      } else {
        this.postForm.bodyError = null
      }
      if (this.postForm.errors > 0) {
        return false;
      }
      const payload = new FormData();
      payload.append('title', this.postForm.title);
      payload.append('summary', this.postForm.summary);
      payload.append('body', this.postForm.body);
      console.log("onSubmitAdd");
      Post.postBlog(payload)
          .then((res) => {
            console.log(res);
            this.$toasted.success(`${this.postForm.title} is submitted successfully!`,
                {
                  icon: 'check',
                  fullWidth: true,
                  position: "bottom-center"
                })
            this.postForm.title = ''
            this.postForm.summary = ''
            this.postForm.body = ''
            this.$router.push({name:'Home'})
          })
          .catch((error) => {
            console.log(error);
          })
    },
    onCommitBlog(){
      this.postForm.errors = 0;
      this.postForm.title = this.postForm.title.trim()
      this.postForm.summary = this.postForm.summary.trim()
      this.postForm.body = this.postForm.body.trim()

      if (this.postForm.title == "") {
        this.postForm.errors++;
        console.log("aaa");
        this.postForm.titleError = "Please Enter Title"
      } else {
        this.postForm.titleError = null
      }
      if (this.postForm.summary == "") {
        this.postForm.errors++;
        this.postForm.summaryError = "Please Enter Summary"
      } else {
        this.postForm.summaryError = null
      }
      if (this.postForm.body == "") {
        this.postForm.errors++;
        this.postForm.bodyError = "You Should Write Something"
      } else {
        this.postForm.bodyError = null
      }
      if (this.postForm.errors > 0) {
        return false;
      }
      const payload = new FormData();
      payload.append('title', this.postForm.title);
      payload.append('summary', this.postForm.summary);
      payload.append('body', this.postForm.body);
      console.log("onCommitBlog");
      Post.commitBlog(payload)
      .then((res)=>{
        console.log(res);
        this.$toasted.success(`${this.postForm.title} is committed successfully!`,
        {
                  icon: 'check',
                  fullWidth: true,
                  position: "bottom-center"
        })
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
  }
}
</script>

<style>
.v-note-wrapper.markdown-body.fullscreen.shadow{
  margin-top: 64px;
}
</style>