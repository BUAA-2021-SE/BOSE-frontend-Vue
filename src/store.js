export default {
    debug: true,
    state: {
        // 是否为新注册用户
        is_new: false,
        is_hover: false,
        // 是否更改密码
        is_reset: false,
        // 是否通过身份验证
        is_authenticated: window.localStorage.getItem('token') ? true : false,
        // 获取user对应的id，方便跳转到对应user_id的主页
        user_id: window.localStorage.getItem('token') ? JSON.parse(window.localStorage.getItem('token').split('$$$')[1]) : 0,
        is_admin:false
    },
    setNewAction() {
        if (this.debug) {
            console.log("setNewAction triggered");
        }
        this.state.is_new = true;
    },
    setResetAction() {
        if (this.debug) {
            console.log("setResetAction triggered");
        }
        this.state.is_reset = true;
    },
    resetNotNewAction() {
        if (this.debug) {
            console.log("resetNotNewAction triggered");
            this.state.is_new = false;
        }
    },
    loginAction() {
        if (this.debug) {
            console.log("loginAction triggered");
        }
        this.state.is_authenticated = true;
        let str = window.localStorage.getItem('token').split('$$$');
        this.state.user_id = str[1];
        if(str[2]==='$$admin'){
            this.is_admin = true;
            console.log("WELCOME ADMIN");
        }
    },
    logoutAction() {
        if (this.debug) {
            console.log("logoutAction triggered");
        }
        window.localStorage.removeItem('token')
        this.state.is_authenticated = false;
        this.state.user_id = 0;
        this.is_admin = false;
    },
}