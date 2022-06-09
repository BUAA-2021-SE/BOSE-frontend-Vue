<template>
  <div class="container">
    <div v-if="sharedState.is_authenticated" class="mx-auto" width="80vw">
      <v-row>
        <v-col cols="12" md="7">
          <label>标题</label>
          <br/>
          <v-text-field
              v-model="postForm.title"
              outlined
              dense
              counter="20"
              placeholder=""
              :class="{'is-invalid': postForm.titleError}"
              :style="{width:'50vw' ,'margin-top':'10px'}"
          ></v-text-field>

          <label>摘要</label>
          <v-textarea
              v-model="postForm.summary"
              outlined
              row-height="15"
              counter="100"
              rows="3"
              no-resize
              placeholder=""
              :class="{'is-invalid': postForm.summaryError}"
              :style="{width:'50vw' ,'margin-top':'10px',}"
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
            <span>{{ item.name }}</span>
            <v-btn text @click="deleteFile(item.id)"> 删除资源</v-btn>
          </div>
        </v-col>
        <v-col md="5" class="my-auto">
          <v-card>
          <v-card-title>
           封面预览
          </v-card-title>
          <v-card-content>
          <img v-if="postForm.cover" :src="postForm.cover" :style="{'margin-left':'20px','border-radius':'20px','max-width':'250px','min-height':'100%','max-height':'150px'}">
          <div v-else>
          <br><br><br><br><br><br>
          </div>
          </v-card-content>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="addFile" text>修改封面</v-btn>
          <input type="file" ref="upload_input" style="display: none;" @change="select_file" accept=".png,.jpg,.jpeg,.webp">
          </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-alert dense outlined type="error" v-show="this.postForm.errors">
        {{ postForm.titleError || postForm.summaryError || postForm.resourceError }}
      </v-alert>
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
      loadingProfile: false,
      tags: [],
      postForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        resourceError: false,
        summaryError: false,
        tags: '',
        fileError: false,
        cover: ''
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
      uploadResource: [],
      totalResource: [],
      select_file_data: ''
    }
  },
  methods: {
    addFile() {
      this.$refs.upload_input.click() // 通过 ref 模拟点击
    },
    select_file(file) {
      this.select_file_data = file.target.files[0]
      console.log(file.target.files[0]);
      let uploads = new FormData()
      if (this.select_file_data != "") {
        uploads.append("image", this.select_file_data)
        Post.postCover(this.$route.params.id, uploads)
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
    showFiles() {
      console.log("showFiles");
      Post.getResource(this.$route.params.id)
          .then((res) => {
            console.log(res);
            this.totalResource = res.data;
          })
          .catch((err) => {
            console.error(err);
          })
    },
    getFiles() {
      console.log("getFiles", this.uploadResource);
      const formData = new FormData();
      formData.append('resources', this.uploadResource[0]);
      Post.postResource(this.$route.params.id, formData)
          .then((res) => {
            console.log(res);
            this.showFiles();
            this.$toasted.success('已成功上传');
            this.uploadResource.splice(1);
          })
          .catch((err) => {
            console.error(err);
          })
    },
    deleteFile(id) {
      Post.deleteResource(id)
          .then((res) => {
            console.log(res);
            this.showFiles();
            this.$toasted.success('已成功删除');
          })
          .catch((err) => {
            console.error(err);
          })
    },
    getBlog(id) {
      const formData = new FormData();
      formData.append('view_id', 0);
      Post.getBlog(id, formData)
          .then((res) => {
            this.postForm = res.data;
            if (res.data.tag1 != 'none') {
              this.tags.push(res.data.tag1)
            }
            if (res.data.tag2 != 'none') {
              this.tags.push(res.data.tag2)
            }
            if (res.data.tag3 != 'none') {
              this.tags.push(res.data.tag3)
            }
            if (res.data.tag4 != 'none') {
              this.tags.push(res.data.tag4)
            }
            console.log(res.data, "res");
          })
          .catch((err) => {
            console.error(err);
          })
    },
    postResource() {
      this.postForm.errors = 0;
      if (!this.postForm.title) {
        this.postForm.errors++
        this.postForm.titleError = '请输入标题'
      } else {
        this.postForm.titleError = null
      }
      if (this.totalResource.length == 0) {
        this.postForm.errors++
        this.postForm.resourceError = '资源内容不能为空捏'
      } else {
        this.postForm.resourceError = null
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
      } else if (this.totalResource.length == 0) {
        this.$toasted.error("上传的资源列表为空");
        return false;
      } else if (this.postForm.summary.length > 100) {
        this.$toasted.error("摘要长度不能超过100个字符");
        return false;
      }
      if (this.postForm.errors > 0) {
        console.log("表单验证失败");
        return false
      }
      const formData = new FormData();
      formData.append('title', this.postForm.title);
      formData.append('summary', this.postForm.summary);
      Post.editResource(this.$route.params.id, formData)
          .then((res) => {
            console.log(res);
            this.postForm.title = ''
            this.postForm.summary = ''
            this.addFile.errors = 0;
            this.$toasted.success('成功上传资源');
            this.$router.push({name: 'Home'});
          })
          .catch((err) => {
            console.error(err);
          })
    }
  },
  created() {
    this.showFiles();
    this.getBlog(this.$route.params.id);
  }
}
</script>

<style scoped>
.v-note-wrapper.markdown-body.fullscreen.shadow {
  margin-top: 64px;
}

</style>