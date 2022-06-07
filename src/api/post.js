import service from '@/http/request.js'
import store from '../store.js'

const url = {
    getBlog: '/blog/return_posts',
    getDraft: '/blog/return_drafts',
    getAllBlog: '/blog/get_all_posts',
    editBlog: '/blog/posts',
    editDraft: '/blog/edit_draft',
    postBlog: '/blog/submit_posts',
    deletePost: '/blog/delete',
    getUserPosts: '/blog/get_user_posts',
    getUserDrafts: '/blog/get_user_drafts',
    titleSearch: '/blog/search',
    thumbUp: '/thumb_up',
    unThumbUp: '/un_thumb_up',
    ifThumbUp: '/if_thumb_up',
    commitBlog: '/blog/commit_posts',
    commitDraft: '/blog/commit_draft',
    postCover: '/blog/post_cover',
    getAllDrafts: '/blog/get_all_drafts',
    deleteDraft: '/blog/delete_draft',
    uploadDraft: '/blog/upload_draft',
    createBlog: '/blog/create_new_blog',
    postPicture: '/blog/upload_blog_images',
    postResource: '/blog/upload_blog_resources',
    editResource: '/resources/edit_resource',
    getResource: '/resources/all_resources',
    deleteResource: '/resources/delete_resource',
    rank: '/blog/rank',
};
export default class Post {
    static async getBlog(id, data) {
        return service(`${url.getBlog}/${id}`, {
            method: 'put',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        })
    }

    static async getDraft(id, data) {
        return service(`${url.getDraft}/${id}`, {
            method: 'post',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
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

    static async search_total(keyword, page, size) {
        return service(`${url.titleSearch}/${keyword}/total?page=${page}&size=${size}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }

    static async search_blog(keyword, page, size) {
        return service(`${url.titleSearch}/${keyword}/blog?page=${page}&size=${size}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }

    static async search_resource(keyword, page, size) {
        return service(`${url.titleSearch}/${keyword}/resource`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }

    static async tagAll(tag, page, size) {
        return service(`${url.rank}/${tag}/0?page=${page}&size=${size}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }

    static async thumbUp(id) {
        return service(`${url.thumbUp}/${id}`, {
            method: 'put',
            responseType: 'json'
        })
    }

    static async createBlog() {
        return service(`${url.createBlog}`, {
            method: 'post',
            responseType: 'json'
        })
    }

    static async postCover(blog_id, data) {
        return service(`${url.postCover}/${blog_id}`, {
            method: 'post',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        })
    }

    static async postPicture(blog_id, data) {
        return service(`${url.postPicture}/${blog_id}`, {
            method: 'post',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        })
    }

    static async postResource(id, data) {
        return service(`${url.postResource}/${id}`, {
            method: 'post',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        })
    }

    static async editResource(id, data) {
        return service(`${url.editResource}/${id}`, {
            method: 'put',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        })
    }


    static async getResource(id) {
        return service(`${url.getResource}/${id}`, {
            method: 'post',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    }

    static async deleteResource(id) {
        return service(`${url.deleteResource}/${id}`, {
            method: 'delete',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    }
}