import service from '@/http/request.js'
const url = {
    getExaminedResources:'controller/examined_list_resources',
    getExaminingResources:'controller/examining_list_resources',
    getExaminedBlogs:'controller/examined_list_blog',
    getExaminingBlogs:'controller/examining_list_blog',
    failExamination:'controller/fail_examination',
    passExamination:'controller/pass_examination',
    selectBlog:'controller/select_blog',
    getSelectedBlog:'controller/get_select_blog'
}
export default class Admin{
    static async getExaminedResources() {
        return service(`${url.getExaminedResources}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async getExaminingResources() {
        return service(`${url.getExaminingResources}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async getExaminedBlogs() {
        return service(`${url.getExaminedBlogs}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async getExaminingBlogs() {
        return service(`${url.getExaminingBlogs}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async failExamination(id) {
        return service(`${url.failExamination}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async passExamination(id) {
        return service(`${url.passExamination}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async selectBlog(id) {
        return service(`${url.selectBlog}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async getSelectedBlog() {
        return service(url.getSelectedBlog,{
            method:'get',
            responseType: 'json'
        })
    }
}