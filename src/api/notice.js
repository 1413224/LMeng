const notice = {
    getTemplateList: '/datacenter/param/v1/common/noticeManage/getTemplateList', // 获取角色可用的通知模板类型
    getNotificationList: '/datacenter/param/v1/common/noticeManage/getNotificationList', // 获取角色通知人列表
    addNotification: '/datacenter/body/v1/common/noticeManage/addNotification', // 新增角色通知人
    getNotificationInfo: '/datacenter/param/v1/common/noticeManage/getNotificationInfo', // 获取角色通知人详情
    updateNotification: '/datacenter/body/v1/common/noticeManage/updateNotification', // 修改角色通知人信息
    deleteNotification: '/datacenter/body/v1/common/noticeManage/deleteNotification', // 删除角色通知人
    getUserBasicInfoByMobile: '/datacenter/param/v1/common/getUserBasicInfoByMobile', // 由手机号获取会员信息
}

export default notice