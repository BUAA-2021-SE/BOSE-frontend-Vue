import service from '@/http/request.js'
import store from '../store.js'

const url = {
    getBlog: '/blog/return_posts',
    getAllBlog: '/blog/get_all_posts',
    editBlog: '/blog/posts',
    postBlog: '/blog/submit_posts',
    deletePost: '/blog/delete',
    getUserPosts: '/blog/get_user_posts',
};
export default class Post {
    static async getBlog(id) {
        return service(`${url.getBlog}/${id}`, {
            method: 'get',
            responseType: 'json',
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

}