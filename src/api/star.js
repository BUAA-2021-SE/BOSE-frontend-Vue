import service from '@/http/request.js';
const url = {
    postStar:'/collection/collect',
    takeoffStar:'/collection/take_off_collect',
    getStarList:'/collection/user/collection_list',
    ifStar:'/collection/if_collected'
}
export default class Star{
    static async postStar(id) {
        return service(`${url.postStar}/${id}`, {
            method: 'put',
            responseType: 'json'
        })
    }
    static async takeoffStar(id) {
        return service(`${url.takeoffStar}/${id}`, {
            method: 'put',
            responseType: 'json'
        })
    }
    static async getStarList(page,size) {
        return service(`${url.getStarList}/?page=${page}&size=${size}`, {
            method: 'post',
            responseType: 'json'
        })
    }
}