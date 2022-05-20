import service from '@/http/request.js'
const url={
    postComment:'/comment/post_comments',
    deleteComment:'/comment/delete_comments',
    replyComment:'/comment/reply_comments',
    updateComments:'/comment/update_comments',
    getComments:'/comment/get_comments'
}
export default class Comment{
    // Blog id
    static async getComments(id) {
        return service(`${url.getComments}/${id}`, {
            method: 'post',
            responseType: 'json'
        })
    }
    // Blog id
    static async postComments(id,data) {
        return service(`${url.postComment}/${id}`, {
            method: 'put',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:data
        })
    }
    // Comment id
    static async replyComment(id,data) {
        return service(`${url.replyComment}/${id}`, {
            method: 'put',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:data
        })
    }
    // Comment id
    static async deleteComment(id) {
        return service(`${url.deleteComment}/${id}`, {
            method: 'delete',
            responseType: 'json'
        })
    }
}