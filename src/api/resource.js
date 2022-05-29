import service from '@/http/request.js';

const url = {
    getResourcesList: '/resources/get_user_resources',
};
export default class Resource {
    static async getResourcesList(id) {
        return service(`${url.getResourcesList}/${id}`, {
            method: 'post',
            responseType: 'json'
        })
    }
}