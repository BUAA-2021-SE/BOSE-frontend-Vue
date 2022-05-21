import service from '@/http/request.js'
import store from '../store.js'

const url = {
    getBlog: '/blog/return_posts',
    getAllBlog: '/blog/get_all_posts',
    editBlog: '/blog/posts',
    postBlog: '/blog/submit_posts',
    deletePost: '/blog/delete',
    getUserPosts: '/blog/get_user_posts',
    titleSearch:'/blog/search',
    thumbUp:'/thumb_up',
    unThumbUp:'/un_thumb_up',
    ifThumbUp:'/if_thumb_up'
};
export default class Post {
    static async getBlog(id,data) {
        return service(`${url.getBlog}/${id}`, {
            method: 'put',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:data
        })
    }

    static async editBlog(id, data) {
        return service(`${url.editBlog}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data
        })
    }

    static async postBlog(data) {
        return service(url.postBlog, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data
        })
    }

    static async deleteBlog(id) {
        return service(`${url.deletePost}/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }

    static async getAllBlog(page, size) {
        return service(`${url.getAllBlog}?page=${page}&size=${size}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }

    static async getUserPosts(id, page, size) {
        return service(`${url.getUserPosts}/${id}?page=${page}&size=${size}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async titleSearch(title_keyword) {
        return service(`${url.titleSearch}/${title_keyword}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async thumbUp(id){
        return service(`${url.thumbUp}/${id}`,{
            method: 'put',
            responseType: 'json'
        })
    }
    // static async unThumbUp(id){
    //     return service(`${url.unThumbUp}/${id}`,{
    //         method: 'put',
    //         responseType: 'json'
    //     })
    // }
    // static async ifThumbUp(id){
    //     return service(`${url.ifThumbUp}/${id}`,{
    //         method:'post',
    //         responseType: 'json'
    //     })
    // }
}