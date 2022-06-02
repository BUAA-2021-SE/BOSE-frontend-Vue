<template>
  <div class=" my-auto container" >
    <div v-if="sharedState.is_authenticated" class="mx-auto" width="80vw">
      <v-row>
      <v-col cols="12" md="6">
      <label>标题</label>
      <br/>
      <v-text-field
          v-model="postForm.title"
          outlined
          dense
          placeholder=""
          :class="{'is-invalid': postForm.titleError}"
          :style="{width:'30vw' ,'margin-top':'10px'}"
      ></v-text-field>
       <label>摘要</label>
      <v-textarea
          v-model="postForm.summary"
          outlined
          row-height="15"
          auto-grow
          rows="2"
          placeholder=""
          :class="{'is-invalid': postForm.summaryError}"
          :style="{width:'30vw' ,'margin-top':'10px'}"
      ></v-textarea>
          <v-file-input
            v-model="uploadResource"
            show-size
            counter
            multiple
            label="上传资源"
            @change="getFiles"
          ></v-file-input>

          <div v-for="(item,index) in totalResource" :key="index">
          <span>{{item.name}}</span>
          <v-btn text @click="deleteFile(item.id)"> 删除资源 </v-btn>
          </div>
      </v-col>
      <v-col  md="6" class="my-auto">
          <v-btn @click="addFile">上传封面</v-btn>
          <input type="file" ref="upload_input" style="display: none;" @change="select_file" accept=".png,.jpg,.jpeg">
          <img v-if="postForm.cover" :src="postForm.cover" max-width="300px" max-height="150px" width="300px" height="150px">
      </v-col>
      </v-row>
      <v-alert dense outlined type="error" v-show="this.postForm.errors">
        {{ postForm.titleError || postForm.summaryError || postForm.resourceError }}
      </v-alert>
      <v-card-actions>
        <router-link :to="{name: 'Home'}">
          <v-btn>返回</v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn @click="postResource">发布</v-btn>
      </v-card-actions>
     
     
    </div>
  </div>
</template>

<script>
import store from '@/store.js'
import Post from '@/api/post'

export default {
  name: 'EditBlog',
  data() {
    return {
      sharedState: store.state,
      loadingProfile : false,
      postForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        resourceError: false,
        summaryError: false,
        fileError: false,
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
      uploadResource:[],
      totalResource:[]
    }
  },
  methods: {
    addFile() {
      this.$refs.upload_input.click() // 通过 ref 模拟点击
    },
    select_file(file) {
      this.select_file_data = file.target.files
      console.log(this.select_file_data)
      let uploads = new FormData()
      if (this.select_file_data != "") {
        uploads.append("image", this.select_file_data)
        Post.postCover(this.$route.params.id,uploads)
            .then((res) => {
              console.log(res.data)
              this.loadingProfile = true;
              this.postForm.cover = res.data;
            })
            .catch((err) => {
              console.log(err);
            })
      }
    },
    showFiles(){
      console.log("showFiles");
      Post.getResource(this.$route.params.id)
      .then((res)=>{
        console.log(res);
        this.totalResource = res.data;
      })
      .catch((err)=>{
        console.error(err);
      })
    },
    getFiles(){
      console.log("getFiles",this.uploadResource);
      const formData = new FormData();
      formData.append('resources',this.uploadResource[0]);
      Post.postResource(this.$route.params.id,formData)
      .then((res)=>{
        console.log(res);
        this.showFiles();
        this.$toasted.success('已成功上传');
        this.uploadResource.splice(1);
      })
      .catch((err)=>{
        console.error(err);
      })
    },
    deleteFile(id){
      Post.deleteResource(id)
      .then((res)=>{
        console.log(res);
        this.showFiles();
        this.$toasted.success('已成功删除');
      })
      .catch((err)=>{
        console.error(err);
      })
    },
    postResource(){
      if (!this.postForm.title) {
        this.postForm.errors++
        this.postForm.titleError = 'Title is required.'
      } else {
        this.postForm.titleError = null
      }
      if (!this.postForm.summary) {
        this.postForm.errors++
        this.postForm.summaryError = 'Summary is required.'
      } else {
        this.postForm.summaryError = null
      }
      if (!this.totalResource) {
        this.postForm.errors++
        this.postForm.resourceError = 'Resource is required.'
      } else {
        this.postForm.resourceError = null
      }
      if(this.postForm.errors>0){
        console.log("表单验证失败");
        return false
      }
      const formData = new FormData();
      formData.append('title', this.postForm.title);
      formData.append('summary', this.postForm.summary);
      Post.editResource(this.$route.params.id,formData)
      .then((res)=>{
        console.log(res);
        this.postForm.title = ''
        this.postForm.summary = ''
        this.addFile.errors = 0;
        this.$toasted.success('成功上传资源');
        this.$router.push({name:'Home'});
      })
      .catch((err)=>{
        console.error(err);
      })
    }
  },
  created(){
    this.showFiles();
  }
}
</script>

<style scoped>
.v-note-wrapper.markdown-body.fullscreen.shadow{
  margin-top: 64px;
}

</style>