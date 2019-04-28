// 用户

const users = {
    login: '/datacenter/public/v1/account/login', // 登陆
    logout: '/datacenter/logout/v1', // 登出
    getPublicVerificationCode: '/datacenter/public/v1/accountSms/getVerificationCode', // 发送短信,获取短信验证码,通用
    getVerificationCode: '/datacenter/body/v1/accountSms/getVerificationCode', // 发送短信,获取短信验证码,需要登录
    getInfo: '/datacenter/param/v1/account/getInfo', // 获取账户信息
    changeInfo: '/datacenter/body/v1/account/changeInfo', // 修改账户信息
    changePassword: '/datacenter/body/v1/account/changeAccountPassword', // 修改账户密码
    changeMobile: '/datacenter/body/v1/account/changeMobile', // 修改用户手机
    forgetPassword: '/datacenter/public/v1/account/forgetPassword', // 重置密码
}

export default users