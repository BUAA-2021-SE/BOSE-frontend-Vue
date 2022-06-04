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
          counter="20"
          placeholder=""
          :class="{'is-invalid': editForm.titleError}"
          :style="{width:'30vw' ,'margin-top':'10px'}"
      ></v-text-field>

      <label>摘要</label>
      <v-textarea
          v-model="editForm.summary"
          outlined
          row-height="15"
          counter="100"
          rows="3"
          no-resize
          placeholder=""
          :class="{'is-invalid': editForm.summaryError}"
          :style="{width:'30vw' ,'margin-top':'10px',}"
      ></v-textarea>

      </v-col>
<v-col  md="6" class="my-auto">
    <v-btn @click="addFile">上传封面</v-btn>
    <input type="file" ref="upload_input" style="display: none;" @change="select_file" accept=".png,.jpg,.jpeg">
     <img v-if="editForm.draft_cover" :src="editForm.draft_cover" max-width="300px" max-height="150px" width="300px" height="150px" 
     :style="{'margin-left':'50px','border-radius':'20px'}">
</v-col>
  </v-row>
      
 <v-row>
      <v-col cols="12" md="3">
      
    <label>标签</label>
      <div class="d-flex my-auto">
      <v-textarea
          v-model="editForm.tags"
          outlined
          row-height="10"
         counter="10"
          rows="1"
          dense
          no-resize
          placeholder=""
          :style="{'margin-top':'10px'}"
      > 
      
      </v-textarea>
       <v-btn @click="addTags" class="my-auto" :style="{'margin-bottom':'30px!important','margin-left':'10px'}">添加</v-btn>
        </div>
      </v-col>
       <v-col cols="12" md="9" class="d-flex my-auto" >
         <div  v-for="tag in tags" :key="tag" >
      <v-chip   class="ma-2" 
      close
     @click:close="removetags(tag)" >
        {{tag}}
    </v-chip>
    </div>
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
        <v-btn @click="onCommitDraft">保存</v-btn>
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
      tags:[],
      editForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false,
        tags:''
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
    addTags(){
      if(this.tags.length >=4){
        this.$toasted.error('最多只能添加4个标签')
        return false;
      }
      if(this.editForm.tags.length>10){
        this.$toasted.error('标签太长捏')
        return false
      }
      
        this.tags.push(this.editForm.tags);
        this.editForm.tags = '';
    },
    removetags(tag){
        this.tags.splice(this.tags.indexOf(tag), 1)
        this.tags = [...this.tags]
         console.log(this.tags)
    },
    getDraft(id) {
      const formData = new FormData();
      formData.append('view_id',0);
      Post.getDraft(id,formData)
          .then((res) => {
            this.post = res.data;
            if(res.data.tag1!='none'){this.tags.push(res.data.tag1)}
            if(res.data.tag2!='none'){this.tags.push(res.data.tag2)}
            if(res.data.tag3!='none'){this.tags.push(res.data.tag3)}
            if(res.data.tag4!='none'){this.tags.push(res.data.tag4)}
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
       let len=this.tags.length;
      for(let i=0;i<len;i++){
        formData.append('tag'+(i+1), this.tags[i]);
      }
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
       let len=this.tags.length;
      for(let i=0;i<len;i++){
        formData.append('tag'+(i+1), this.tags[i]);
      }
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
              this.postForm.cover = res.data
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