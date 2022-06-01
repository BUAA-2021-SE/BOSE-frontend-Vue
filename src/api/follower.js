import service from '@/http/request.js';

const url = {
    isFlow: '/user/isfollow',
    isBlock:'/blacklist/if_black',
    follow: '/follow',
    unfollow: '/unfollow',
    followings: '/user/followeds',
    followers: '/user/followers', 
    block:'/blacklist/black',
    unBlock:'/blacklist/unblack'
}
export default class Followers {
    static async isFollow(id) {
        return service(`${url.isFlow}/${id}`, {
            method: 'post',
            responseType: 'json',
        })
    }

    static async follow(id) {
        return service(`${url.follow}/${id}`, {
            method: 'put',
            responseType: 'json',
        })
    }

    static async unFollow(id) {
        return service(`${url.unfollow}/${id}`, {
            method: 'put',
            responseType: 'json',
        })
    }

    static async getUserFollowers(id) {
        return service(`${url.followers}/${id}`, {
            method: 'post',
            responseType: 'json',
        })
    }

    static async isBlock(id) {
        return service(`${url.isBlock}/${id}`, {
            method: 'post',
            responseType: 'json',
        })
    }

    static async block(id) {
        return service(`${url.block}/${id}`, {
            method: 'put',
            responseType: 'json',
        })
    }

    static async unBlock(id) {
        return service(`${url.unBlock}/${id}`, {
            method: 'put',
            responseType: 'json',
        })
    }

    static async getUserFollowers(id) {
        return service(`${url.followers}/${id}`, {
            method: 'post',
            responseType: 'json',
        })
    }

    static async getUserFollowings(id) {
        return service(`${url.followings}/${id}`, {
            method: 'post',
            responseType: 'json',
        })
    }
}