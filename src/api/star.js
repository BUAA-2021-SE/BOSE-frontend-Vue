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
    static async getStarList() {
        return service(url.getStarList, {
            method: 'post',
            responseType: 'json'
        })
    }
    static async ifStar(id) {
        return service(`${url.ifStar}/${id}`, {
            method: 'post',
            responseType: 'json'
        })
    }
}