import service from '@/http/request.js'
import store from '../store.js'

const url = {
    getBlog: '/blog/return_posts',
    getDraft: '/blog/return_drafts',
    getAllBlog: '/blog/get_all_posts',
    editBlog: '/blog/posts',
    editDraft:'/blog/edit_draft',
    postBlog: '/blog/submit_posts',
    deletePost: '/blog/delete',
    getUserPosts: '/blog/get_user_posts',
    getUserDrafts: '/blog/get_user_drafts',
    titleSearch:'/blog/search',
    thumbUp:'/thumb_up',
    unThumbUp:'/un_thumb_up',
    ifThumbUp:'/if_thumb_up',
    commitBlog:'/blog/commit_posts',
    commitDraft:'/blog/commit_draft',
    getAllDrafts:'/blog/get_all_drafts',
    deleteDraft:'/blog/delete_draft',
    uploadDraft:'/blog/upload_draft',
    createBlog:'/blog/create_new_blog'
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

    static async getDraft(id,data) {
        return service(`${url.getDraft}/${id}`, {
            method: 'post',
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

    static async editDraft(id, data) {
        return service(`${url.editDraft}/${id}`, {
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

    static async deleteDraft(id) {
        return service(`${url.deleteDraft}/${id}`, {
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

    static async getUserDrafts(id, page, size) {
        return service(`${url.getUserDrafts}/${id}?page=${page}&size=${size}`, {
            method: 'post',
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

    static async createBlog(){
        return service(`${url.createBlog}`,{
            method: 'post',
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