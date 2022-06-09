<template>
  <div class=" my-auto container">
    <div v-if="sharedState.is_authenticated" class="mx-auto" width="80vw">
      <v-row>
        <v-col cols="12" md="7">
          <label>标题</label>
          <br/>
          <v-text-field
              v-model="postForm.title"
              outlined
              dense
              placeholder=""
              counter="20"
              :class="{'is-invalid': postForm.titleError}"
              :style="{width:'50vw' ,'margin-top':'10px'}"
          ></v-text-field>
          <label>摘要</label>
          <v-textarea
              v-model="postForm.summary"
              outlined
              row-height="15"
              counter="100"
              no-resize
              rows="3"
              placeholder=""
              :class="{'is-invalid': postForm.summaryError}"
              :style="{width:'50vw' ,'margin-top':'10px'}"
          ></v-textarea>

        </v-col>
        <v-col md="5" class="my-auto">
          <v-card>
          <v-card-title>
           封面预览
          </v-card-title>
          <v-card-content>
          <img v-if="postForm.cover" :src="postForm.cover" :style="{'margin-left':'20px','border-radius':'20px','max-width':'350px','min-height':'100%','max-height':'150px'}">
          <div v-else>
          <br><br><br><br><br><br>
          </div>
          </v-card-content>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addFile" text>上传封面</v-btn>
          <input type="file" ref="upload_input" style="display: none;" @change="select_file" accept=".png,.jpg,.jpeg">
          </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <div class="d-flex">
            <div v-for="(tag,index) in givenTags" :key="index">
              <v-btn depressed outlined v-if="!tag.value" @click="addExistTags(tag)"
                     :style="{'border-radius':'20px','margin-right':'5px'}">{{ tag.key }}
              </v-btn>
              <v-btn depressed v-if="tag.value" @click="removeExistTags(tag)"
                     :style="{'border-radius':'20px','margin-right':'5px','background-color':'#00AEEC','color':'white'}">
                {{ tag.key }}
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">

          <label>标签</label>
          <div class="d-flex my-auto" :style="{'width':'1000px'}">
            <div v-for="(tag,index) in tags" :key="index">
              <v-chip class="ma-2"
                      close
                      @click:close="removetags(tag)">
                {{ tag }}
              </v-chip>
            </div>
            <v-text-field
                v-model="postForm.tags"
                row-height="10"
                counter="10"
                rows="1"
                dense
                no-resize
                placeholder=""
                :style="{'margin-top':'10px'}"
                @keyup.enter="addTags"
            >
            </v-text-field>
          </div>
        </v-col>

      </v-row>

      <label>正文</label>
      <div style="z-index:-10">
        <mavon-editor ref="md" v-model="postForm.body" :toolbars="tools" @imgAdd="imgAdd"
                      :style="{'min-height':'50hv'}"/>
      </div>
      <br/>

      <v-alert dense outlined type="error" v-show="this.postForm.errors">
        {{ postForm.titleError || postForm.summaryError || postForm.bodyError }}
      </v-alert>
      <v-card-actions>
        <router-link :to="{name: 'Home'}">
          <v-btn>返回</v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn @click="onCommitBlog" :style="{'background-color':'#00AEEC',color:'white'}">保存</v-btn>
        <v-btn @click="onSubmitAdd" :style="{'background-color':'#00AEEC',color:'white'}">发布</v-btn>
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
      loadingProfile: false,
      tags: [],
      postForm: {
        title: '',
        summary: '',
        body: '',
        tags: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false,
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
        // fullscreen: true, // 全屏编辑
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
      givenTags: [
        {'key': "后端", 'value': 0},
        {'key': "前端", 'value': 0},
        {'key': "移动开发", 'value': 0},
        {'key': "编程语言", 'value': 0},
        {'key': "Java", 'value': 0},
        {'key': "Python", 'value': 0},
        {'key': "人工智能", 'value': 0},
        {'key': "大数据", 'value': 0},
        {'key': "数据结构与算法", 'value': 0},
        {'key': "云平台", 'value': 0},
        {'key': "运维服务器", 'value': 0},
        {'key': "操作系统", 'value': 0},
        {'key': "数据库管理", 'value': 0},
      ],
    }
  },
  methods: {
    addExistTags(tag) {
      if (this.tags.length >= 4) {
        this.$toasted.error('最多只能添加4个标签')
        return false;
      }
      this.tags.push(tag.key);
      tag.value = 1;
      console.log(tag)
      console.log(this.tags)

    },
    addTags() {
      if (this.tags.length >= 4) {
        this.$toasted.error('最多只能添加4个标签')
        return false
      }
      if (this.postForm.tags.length > 10) {
        this.$toasted.error('标签太长啦')
        return false
      }
      this.postForm.tags = this.postForm.tags.trim();
      for (let i = 0; i < this.givenTags.length; i++) {
        if (this.postForm.tags == this.givenTags[i].key) {
          if (this.givenTags[i].value == 1) {
            this.$toasted.error('标签写过啦')
            return false
          } else {
            this.tags.push(this.postForm.tags);
            this.givenTags[i].value = 1;
            this.postForm.tags = '';
            return true
          }
        } else {
          for (let i = 0; i < this.tags.length; i++) {
            if (this.postForm.tags == this.tags[i]) {
              this.$toasted.error('标签写过啦')
              return false
            }
          }
        }
      }
      this.tags.push(this.postForm.tags);
      this.postForm.tags = '';
    },
    removetags(tag) {
      for (let i = 0; i < this.givenTags.length; i++) {
        if (tag == this.givenTags[i].key) {
          this.givenTags[i].value = 0;
        }
      }
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.tags = [...this.tags]
      console.log(this.tags)

    },
    removeExistTags(tag) {
      this.tags.splice(this.tags.indexOf(tag.key), 1)
      this.tags = [...this.tags]
      console.log(this.tags)
      tag.value = 0;
    },
    imgAdd(pos, file) {
      let formData = new FormData();
      formData.append("image", file);
      Post.postPicture(this.$route.params.id, formData)
          .then((res) => {
            console.log(res);
            this.$refs.md.$img2Url(pos, res.data)
          })
          .catch((error) => {
            console.log(error);
          })
    },
    onSubmitAdd() {
      this.postForm.errors = 0;
      this.postForm.title = this.postForm.title.trim()
      this.postForm.summary = this.postForm.summary.trim()
      this.postForm.body = this.postForm.body.trim()

      if (this.postForm.title == "") {
        this.postForm.errors++;
        console.log("aaa");
        this.postForm.titleError = "请输入标题"
      } else {
        this.postForm.titleError = null
      }
      if (this.postForm.summary == "") {
        this.postForm.errors++;
        this.postForm.summaryError = "请输入摘要"
      } else {
        this.postForm.summaryError = null
      }
      if (this.postForm.body == "") {
        this.postForm.errors++;
        this.postForm.bodyError = "正文不能为空捏"
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
      let len = this.tags.length;
      for (let i = 0; i < len; i++) {
        payload.append('tag' + (i + 1), this.tags[i]);
      }
      console.log("onSubmitAdd");
      Post.editBlog(this.$route.params.id, payload)
          .then((res) => {
            console.log(res);
            this.$toasted.success(`《${this.postForm.title}》成功提交`,
                {
                  icon: 'check',
                  fullWidth: true,
                  position: "bottom-center"
                })
            this.postForm.title = ''
            this.postForm.summary = ''
            this.postForm.body = ''
            this.tags = ''
            this.$router.push({name: 'Home'})
          })
          .catch((error) => {
            console.log(error);
          })
    },
    onCommitBlog() {
      this.postForm.errors = 0;
      this.postForm.title = this.postForm.title.trim()
      this.postForm.summary = this.postForm.summary.trim()
      this.postForm.body = this.postForm.body.trim()

      this.postForm.errors = 0;
      if (!this.postForm.title) {
        this.postForm.errors++
        this.postForm.titleError = '请输入标题'
      } else {
        this.postForm.titleError = null
      }
      if (!this.postForm.body) {
        this.postForm.errors++
        this.postForm.bodyError = '正文不能为空捏'
      } else {
        this.postForm.bodyError = null
      }
      if (!this.postForm.summary) {
        this.postForm.errors++
        this.postForm.summaryError = '请输入摘要'
      } else {
        this.postForm.summaryError = null
      }
      if (this.postForm.title.length > 20) {
        this.$toasted.error("标题长度不能超过20个字符");
        return false;
      } else if (this.postForm.summary.length > 100) {
        this.$toasted.error("摘要长度不能超过100个字符");
        return false;
      }
      if (this.postForm.errors > 0) {
        // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
        console.log("表单验证没通过")
        return false
      }
      const payload = new FormData();
      payload.append('title', this.postForm.title);
      payload.append('summary', this.postForm.summary);
      payload.append('body', this.postForm.body);
      let len = this.tags.length;
      for (let i = 0; i < len; i++) {
        payload.append('tag' + (i + 1), this.tags[i]);
      }
      console.log("onCommitBlog");
      Post.editDraft(this.$route.params.id, payload)
          .then((res) => {
            console.log(res);
            this.$toasted.success(`《${this.postForm.title}》成功保存！`,
                {
                  icon: 'check',
                  fullWidth: true,
                  position: "bottom-center"
                })
          })
          .catch((err) => {
            console.log(err);
            this.$toasted.error('不知道哪里出了问题呢。', {icon: 'check'});
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
        Post.postCover(this.$route.params.id, uploads)
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
  }
}
</script>

<style scoped>
.v-note-wrapper.markdown-body.fullscreen.shadow {
  margin-top: 64px;
}

</style>