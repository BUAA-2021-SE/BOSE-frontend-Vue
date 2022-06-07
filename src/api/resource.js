import service from '@/http/request.js';

const url = {
    getResourcesList: '/resources/get_user_resources',
};
export default class Resource {
    static async getResourcesList(id,page,size) {
        return service(`${url.getResourcesList}/${id}/?page=${page}&size=${size}`, {
            method: 'post',
            responseType: 'json'
        })
    }
}