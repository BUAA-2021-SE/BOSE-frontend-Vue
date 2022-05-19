import service from '@/http/request.js';

const url = {
    isFlow: '/user/isfollow',
    follow: '/follow',
    unfollow: '/unfollow',
    followings: '/user/followeds',
    followers: '/user/followers'
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

    static async getUserFollowings(id) {
        return service(`${url.followings}/${id}`, {
            method: 'post',
            responseType: 'json',
        })
    }
}