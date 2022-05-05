import service from '@/http/request.js'
import store from '../store.js'
const url = {
    register:'/users/register',
    login:'/login',
    registercheck:'/users/register_check',
    getUser:`user/${store.state.user_id}`,
    editUser:`user/user_edit`,
    reset:`/user/reset/getcode`,
    resetcheck:'/user/reset/newpassword'
}
export class Account {
    static async Register(data) {
        return service(url.register,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data
        })
    }
    static async RegisterCheck(data) {
        return service(url.registercheck,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data
        })
    }
    static async ResetCheck(data) {
        return service(url.resetcheck,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data
        })
    }
    static async Reset(data) {
        return service(url.reset,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data
        })
    }
    static async Login(data){
        return service(url.login,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data
        },{
            auth:{
                username:data.get('username'),
                password:data.get('password')
            }
        })
    }
    static async getUser(){
        return service(url.getUser,{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json'
        })
    }
    static async editUser(data){
        return service(url.editUser,{
            method: 'put',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'json',
            data: data        
        })
    }
}