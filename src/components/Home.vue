<template>
	<div class="container" width="80vw" min-width="1000px">
		<div class=" mx-auto" width="80vw" min-width="1000px">
			<v-row>
				<v-col cols="12" sm="12" md="9">
					<v-card :style="{'border-radius':'20px'}">
						<v-carousel  hide-delimiter-background show-arrows-on-hover>
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
				<v-col cols="12" sm="12" md="3">
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
						<v-col cols="12" md="12">
							<v-card :style="{'border-radius':'20px',height:'225px'}">
								<v-card-title>公告</v-card-title>
								<v-card-subtitle :style="{'margin-left':'20px'}">{{HomeMessage}}</v-card-subtitle>
							</v-card>
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
					</v-row>
				</v-col>
				<v-col cols="12" md="9">
					<v-card outlined>
			<v-col  cols="12" sm="6" md="12" class="d-flex justify-space-between">
			<div v-for="(tag,index) in givenTags1" :key="index"   >
          	<v-btn depressed outlined v-if="!tag.value" @click="searchTag(tag)"
          	:style="{'border-radius':'20px','margin-right':'5px','background-color':'#00AEEC','color':'white'}">{{tag.key}}</v-btn>
       			</div>
			</v-col>
			<v-col  cols="12" sm="6" md="12" class="d-flex justify-space-between">
			<div v-for="(tag,index) in givenTags2" :key="index"   >
          	<v-btn depressed outlined v-if="!tag.value" @click="searchTag(tag)"
          :style="{'border-radius':'20px','margin-right':'5px','min-width':'80px','background-color':'#00AEEC','color':'white'}">{{tag.key}}</v-btn>
       			</div>
			</v-col>
					</v-card>
					<v-col cols="12" sm="6" md="12" v-for="(post,index) in posts" :key="index">
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
					<v-card :style="{'border-radius':'20px',}">
						<v-card-title>通知</v-card-title>
						<v-card-subtitle :style="{'margin-left':'20px'}">{{HomeMessage}}</v-card-subtitle>
					</v-card>
					<br/>
					<v-card :style="{'border-radius':'20px',}">
						<v-card-title>通知</v-card-title>
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
		givenTags1: [
        {'key':"后端",'value':0},
        {'key':"前端",'value':0},
        {'key':"移动开发",'value':0},
        {'key':"编程语言",'value':0},
        {'key':"Java",'value':0},
		{'key':"Python",'value':0},
        {'key':"人工智能",'value':0},
		{'key':"软件工程",'value':0},
		{'key':"小程序",'value':0},
		{'key':"网络",'value':0},
        
		],
		givenTags2:[
        {'key':"大数据",'value':0},
        {'key':"数据结构与算法",'value':0},
        {'key':"云平台",'value':0},
		{'key':"运维服务器",'value':0},
        {'key':"操作系统",'value':0},
        {'key':"数据库管理",'value':0},
		{'key':"硬件开发",'value':0},
		{'key':"区块链",'value':0},
        
      ],
				sharedState: store.state,
				HomeMessage: '主页一期完成',
				templatePosts:[],
				posts: '',
				selectPost:{},
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
			}
		},
		created() {
			this.getPosts(1);
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
</style>
