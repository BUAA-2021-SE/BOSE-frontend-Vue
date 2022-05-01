import service from '@/http/request.js'

const url = {
    register:'/users/register',
    login:'/users/tokens',
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
}