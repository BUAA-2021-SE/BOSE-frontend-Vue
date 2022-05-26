import service from '@/http/request.js';
const url = {
    getMailList:'/mail/get_mail_list'
};
export default class Notifications{
    static async getMailList(id) {
        return service(`${url.getMailList}/${id}`, {
            method: 'post',
            responseType: 'json'
        })
    }
}