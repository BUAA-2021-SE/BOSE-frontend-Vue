import service from '@/http/request.js'
import store from '../store.js'
const url = {
    getPost:'blog/posts',
    editPost:'blog/posts'
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
}