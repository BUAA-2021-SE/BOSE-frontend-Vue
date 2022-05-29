import service from '@/http/request.js';

const url = {
    getMailList: '/mail/get_mail_list',
    history: '/history/history_list',
    getMail: '/mail/get_mail',
    postChat:'/chat/send_chat_by_user_id',
    getChatList:'/chat/get_chat_list',
    getRoomList:'/chat/chat_room_list',
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

    static async postChat(id,data){
        return service(`${url.postChat}/${id}`, {
            method: 'post',
            responseType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:data
        })
    }

    static async getChatList(id){
        return service(`${url.getChatList}/${id}`,{
            method: 'get',
            responseType: 'json'
        })
    }

    static async getRoomList(){
        return service(url.getRoomList,{
            method: 'get',
            responseType: 'json'
        })
    }
}