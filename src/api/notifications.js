import service from '@/http/request.js';

const url = {
    getMailList: '/mail/get_mail_list',
    history: '/history/history_list',
    getMail: '/mail/get_mail',
    postChat:'/chat/send_chat_by_user_id',
    getChatList:'/chat/get_chat_list'
};
export default class Notifications {
    static async getMailList(id) {
        return service(`${url.getMailList}/${id}`, {
            method: 'post',
            responseType: 'json'
        })
    }

    static async getHistoryList() {
        return service(url.history, {
            method: 'post',
            responseType: 'json'
        })
    }

    static async getMail(id) {
        return service(`${url.getMail}/${id}`, {
            method: 'post',
            responseType: 'json'
        })
    }

    static async postChat(id){
        return service(`${url.postChat}/${id}`, {
            method: 'post',
            responseType: 'json'
        })
    }

    static async getChatList(id){
        return service(`${url.getChatList}/${id}`,{
            method: 'get',
            responseType: 'json'
        })
    }
}