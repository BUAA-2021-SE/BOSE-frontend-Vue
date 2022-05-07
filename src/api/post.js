import service from '@/http/request.js'
import store from '../store.js'
const url = {
    getPost:'/blog/return_posts',
    editPost:'blog/posts',
    postBlog:'/blog/submit_posts'
};
export default class Post {
    static async getPost(id){
        return service(`${url.getPost}/${id}`,{
            method: 'get',
            responseType: 'json',
        })
    }
    static async editPost(id,data){
        return service(`${url.editPost}/${id}`,{
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data  
        })
    }
    static async postBlog(data){
        return service(url.postBlog,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data
        })
    }
}