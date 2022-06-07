<template>
	<div class="container" width="80vw" min-width="1000px">
		<div class=" mx-auto" width="80vw" min-width="1000px">
			<v-row>
				<v-col cols="12" sm="12" md="7">
					<v-card :style="{'border-radius':'20px'}">
						<v-carousel  cycle="4" hide-delimiter-background show-arrows-on-hover>
							<v-carousel-item v-for="(post,index) in templatePosts" :key="index">
								<v-sheet height="100%">
									<v-img :src="post.cover" :style="{'min-width':'100%','min-height':'80%',}" />
									<router-link :to="{ name: 'Post', params: { id: post.id } }">
										<div class="mask white--text align-end">
											<router-link :to="{ name: 'Post', params: { id: post.id } }">
												<h2
													:style="{'margin-bottom':'30px','margin-left':'15px',color:'white'}">
													{{post.title}}
												</h2>
											</router-link>
										</div>
									</router-link>

								</v-sheet>
							</v-carousel-item>
						</v-carousel>
					</v-card>
					
				</v-col>
				<v-col cols="12" sm="12" md="5">
					<v-row>
						<v-col cols="12" sm="12" md="12">
							<v-row>
								<v-col cols="12" sm="12" md="6">
									<v-card v-if="posts[1]" :style="{'border-radius':'20px','height':'200px',}">
										<v-img :src="posts[1].cover"
											:style="{'min-width':'100%','min-height':'100%','max-height':'200px','border-radius':'20px'}" />
										<router-link :to="{ name: 'Post', params: { id: posts[1].id } }">
											<div class="mask2 white--text align-end">
												<h4
													:style="{'margin-bottom':'20px','margin-left':'15px','max-height':'200px',color:'white'}">
													{{posts[1].title}}
												</h4>
											</div>
										</router-link>

									</v-card>
								</v-col>
								<v-col cols="12" sm="12" md="6">
									<v-card v-if="posts[2]" :style="{'border-radius':'20px','height':'200px',}">
										<v-img  :src="posts[2].cover"
											:style="{'min-width':'100%','min-height':'100%','border-radius':'20px'}" />
										<router-link :to="{ name: 'Post', params: { id: posts[2].id } }">
											<div class="mask2 white--text align-end">
												<h4
													:style="{'margin-bottom':'20px','margin-left':'15px',color:'white'}">
													{{posts[2].title}}
												</h4>
											</div>
										</router-link>

									</v-card>

								</v-col>
							</v-row>
						</v-col>
						<v-col cols="12" sm="6" md="12"  ref="tagbtn">
			<v-card outlined :style="{'margin-top':'20px','border-radius':'20px','border-color':'#00AEEC','border-width':'3px'}" >
						
			<v-col  cols="12" sm="6" md="12" class="d-flex justify-space-between" v-for="(gTags,index) in givenTags" :key="index" :style="{padding:'5px 10px 5px 10px'}">
			<div  v-for="(tag,index) in gTags" :key="index"  >
          	<v-btn depressed outlined v-if="!tag.value" @click="searchTag(tag)"
          	:style="{'border-radius':'20px','margin-right':'5px','background-color':'#00AEEC','color':'white'}">{{tag.key}}</v-btn>
       			</div>
			</v-col>
			<!-- <v-col  cols="12" sm="6" md="12" class="d-flex justify-space-between">
			<div   class="tagbtn" v-for="(tag,index) in givenTags2" :key="index"   >
          	<v-btn depressed outlined v-if="!tag.value" @click="searchTag(tag)"
          :style="{'border-radius':'20px','margin-right':'5px','min-width':'80px','background-color':'#00AEEC','color':'white'}">{{tag.key}}</v-btn>
       			</div>
			</v-col> -->
					</v-card>
						</v-col>
					</v-row>
				</v-col>
				<v-col cols="12" md="9">
					
					<v-col cols="12" sm="6" md="12" v-for="(post,index) in posts" :key="index" :style="{padding:'0px'}">
						<blog :post="post" @delete="getPosts(1)">
						</blog>
					</v-col>
					<span>共有博文{{ total }}篇</span>
							<v-pagination
								v-model="page"
								:length="pageTotal"
								:total-visible="7"
								circle
							></v-pagination>
				</v-col>
				<v-col cols="12" md="3">
					<v-col cols="12" md="12">
							<!-- <v-card  :style="{'border-radius':'20px',height:'225px'}">
								<v-card-title>公告</v-card-title>
								<v-card-subtitle :style="{'margin-left':'20px'}">{{HomeMessage}}</v-card-subtitle>
							</v-card> -->
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-card v-if="selectPost" :style="{'border-radius':'20px','height':'225px',}">
								<v-img :src="selectPost.cover"
									:style="{'min-width':'100%','min-height':'100%','border-radius':'20px'}" />
								<router-link :to="{ name: 'Post', params: { id: selectPost.id } }">
									<div class="mask2 white--text align-end">
										<h4
											:style="{'margin-bottom':'20px','margin-left':'15px',color:'white'}">
											编辑推荐
										</h4>
									</div>
								</router-link>

							</v-card>
						</v-col>
					<v-card :style="{'border-radius':'20px',}">
						<v-card-title>全站热门</v-card-title>
							<v-row >
								<v-row  :style="{'margin-left':'0px','margin-bottom':'10px'}">
									<v-col cols="12" md="5" :style="{ position:'relative'}">
										<router-link :to="{name: 'Post', params: {id: topHotPost.id} }">
									<v-img :src="topHotPost.cover"  :style="{'max-height':'90px','max-width':'160px','margin-left':'5px','border-radius':'10px'}"/> 
										</router-link>
									<div class="sign" :style="{'background-color':'#fe2d46','position':'absolute','z-index':'1','width':'24px','height':'24px','top':'0px','border-radius': '10px 1px 10px 1px',
								    'font-size': '14px','line-height': '24px','text-align':' center','color': '#fff'}">1</div>
									</v-col>
									<v-col cols="12" md="7" :style="{'padding':'5px 12px 5px 12px'}">
									<router-link :to="{name: 'Post', params: {id: topHotPost.id} }">
									<v-card-subtitle  :style="{'margin-left':'20px','padding':'3px','font-size':'18px'}">{{topHotPost.title}}</v-card-subtitle></router-link>
									</v-col>
									<v-col cols="12" md="12" v-for="(post,index) in hotPosts" :key="index"  class="d-flex justify-start" :style="{'padding':'5px 2px 5px 12px'}">
									<div :style="{'color':'#FF9900','margin-left':'10px','width':'20px','font-size':'18px'}" v-show="index==0">{{index+2}}</div>
									<div :style="{'color':'#FFCC00','margin-left':'10px','width':'20px','font-size':'18px'}" v-show="index==1">{{index+2}}</div>
									<div :style="{'color':'grey','margin-left':'10px','width':'20px','font-size':'18px'}" v-show="index!=0&&index!=1">{{index+2}}</div>
										<router-link :to="{name: 'Post', params: {id: post.id} }">
										<v-card-subtitle :style="{'margin-left':'20px','padding':'3px','font-size':'16px'}">{{post.title}}</v-card-subtitle>
										</router-link>
										</v-col>

							</v-row>
							</v-row>
					</v-card>
					<br/>
					<v-card :style="{'border-radius':'20px',}">
						<v-card-title>近期热门</v-card-title>
						<v-card-subtitle :style="{'margin-left':'20px'}">{{HomeMessage}}</v-card-subtitle>
					</v-card>
				</v-col>

			</v-row>
		</div>
	</div>
</template>


<script>
	import Alert from './base/Alert.vue'
	import store from '../store.js'
	import VueMarkdown from 'vue-markdown'
	import Post from '@/api/post'
	import BlogItem from '@/components/base/BlogItem.vue'
	export default {
		name: 'Home',
		components: {
			alert: Alert,
			VueMarkdown,
			blog: BlogItem
		},
		data() {
			return {
		givenTags:[],
		givenTags2:[],
		givenTags1: [
        {'key':"后端",'value':0,'length':71},
        {'key':"前端",'value':0,'length':71},
        {'key':"移动开发",'value':0,'length':101},
        {'key':"编程语言",'value':0,'length':101},
        {'key':"Java",'value':0,'length':76},
		{'key':"Python",'value':0,'length':94},
        {'key':"人工智能",'value':0,'length':101},
		{'key':"软件工程",'value':0,'length':101},
		{'key':"小程序",'value':0,'length':86},
		{'key':"网络",'value':0,'length':71},
		{'key':"大数据",'value':0,'length':86},
        {'key':"数据结构与算法",'value':0,'length':147},
        {'key':"云平台",'value':0,'length':86},
		{'key':"运维服务器",'value':0,'length':117},
        {'key':"操作系统",'value':0,'length':101},
        {'key':"数据库管理",'value':0,'length':117},
		{'key':"硬件开发",'value':0,'length':101},
		{'key':"区块链",'value':0,'length':86},
		],
			sharedState: store.state,
			HomeMessage: '主页一期完成',
			templatePosts:[],
			posts: '',
			hotPosts:[],
			topHotPost:{},
			
			selectPost:{},
			clientWidth: '',
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
				total: 0, //总博文数
				page: 1, //第几页
				size: 5, //每页总数
				pageTotal: 1 //总页数
			}
		},
		
		watch: {
			page: function(newPage, oldPage) {
				this.getPosts(newPage)
			},
			clientWidth(val) {
    if(!this.timer) {
      this.clientWidth= val
      this.timer = true
      let _this = this
      setTimeout(function () {
        _this.timer = false
      }, 500)
    }
    // 这里可以添加修改时的方法
	this.computeTags();
    this.windowWidth(val);
  }
		},
		computed: {
			alertsFilter: function() {
				return this.alerts.filter((alert) => {
					return alert.showAlert;
				})
				this.getPosts(newPage);
			}
		},
		methods: {
			getPosts(page) {
				Post.getAllBlog(page, this.size)
					.then((res) => {
						console.log(res.data, "getPosts");
						for(let i = 0; i < res.data.items.length; i++){
							if(i>3) break;
							this.templatePosts.push(res.data.items[i]);
						}
						this.posts = res.data.items;
						this.total = res.data.total;
						this.page = res.data.page;
						this.size = res.data.size;
						this.pageTotal = Math.ceil(this.total / this.size);
						if(this.pageTotal===0) this.pageTotal = 1;
					})
			},
			searchTag(tag){
				console.log(tag.key)
				this.$router.push({
				name: "TagAll",
				params: {tag: tag.key},
			});
			},
			windowWidth(value) {
           this.clientWidth = value;
      		},
			computeTags(){
				// const el = document.getElementById("tagbtn");
				// let width=  this.$refs['tagbtn'].style.width;
				let width=(this.clientWidth>1400?1400:this.clientWidth)/3;
				// console.log(width);
				let h=[];
				this.givenTags2=[];
				let len=0;
				// console.log(this.givenTags1.length);
				for(let i = 0; i < this.givenTags1.length; i++){
					// console.log(width,len,h,i)
					if(len+this.givenTags1[i].length>=width){
						// console.log(h);
						this.givenTags2.push(h);
						h=[];
						len=0;
						// console.log("yyy");
						len+=this.givenTags1[i].length;
						h.push(this.givenTags1[i]);
					}
					else{
						len+=this.givenTags1[i].length;
						h.push(this.givenTags1[i]);
					}
			}
			this.givenTags2.push(h);
			this.givenTags=[];
			this.givenTags=this.givenTags2;
			// console.log(this.givenTags2);
			},
		getHotPosts(page) {
      		Post.tagAll("allallallall", page, 10)
          	.then((res) => {
            console.log(res.data, "getTagPosts");
			this.topHotPost = res.data.items[0];
            for (let i=1; i<10;i++){
				this.hotPosts.push(res.data.items[i]);
			}
          })
          .catch((err) => {
            console.log(err, "getTagPostsError");
            this.loadingProfile = false;
          });
    },
		},
		created() {
			this.getPosts(1);
			this.windowWidth(document.documentElement.clientWidth);
			this.computeTags();
			this.getHotPosts(1);
			
		},
		mounted() {
			this.computeTags();
			 window.onresize = () => {
    return (() => {
      this.clientWidth= `${document.documentElement.clientWidth}`;
    })();
  };
		},
		
  

		beforeRouteUpdate(to, from, next) {
			//要先执行 next() 不然 this.$route.query 还是之前的
			next()
			this.getPosts(1);
		}
	}
</script>
<style scoped>
	.mask {
		display: flex;
		position: absolute;
		inset: 0px;
		background-image: var(--mask-gradient, linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 176px));
	}
	.mask2 {
		display: flex;
		position: absolute;
		inset: 0px;
		background-image: var(--mask-gradient, linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 76px));
		border-radius: 20px;
	}
.router-link-active {
  text-decoration: none;
}
.v-application a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}
.v-application a:hover {
  text-decoration: none;
  color: rgb(120, 184, 241);
}
 
</style>
