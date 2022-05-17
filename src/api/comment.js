import service from '@/http/request.js'
const url={
    postComments:'/comment/post_comments',
    deleteComment:'/comment/delete_comments',
    replyComment:'/comment/reply_comments',
    updateComments:'/comment/update_comments',
    getComments:'/comment/get_comments'
}
export default class Comment{
    static async getPostComments(id, page, size) {
        return service(`${url.getComments}/${id}?page=${page}&size=${size}`, {
            method: 'get',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
}