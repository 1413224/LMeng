// 权限

const power = {
    getGroupList: '/datacenter/param/v1/account/getGroupList', // 权限组列表
    getGroupChildList: '/datacenter/param/v1/account/getGroupChildList', // 权限组下权限
    addPermsQuick: '/datacenter/body/v1/account/addPermsQuick', // 新增快捷权限组
    getPermsQuickList: '/datacenter/param/v1/account/getPermsQuickList', // 获取快捷权限组列表
    getPermsQuickDetail: '/datacenter/param/v1/account/getPermsQuickDetail', // 获取快捷权限组详情
    editPermsQuick: '/datacenter/body/v1/account/editPermsQuick', // 修改快捷权限组
    delPermsQuick: '/datacenter/body/v1/account/delPermsQuick', // 删除快捷权限组
    getMyChildren: '/datacenter/param/v1/account/getMyChildren', // 获取操作员列表
    addAccount: '/datacenter/body/v1/account/addAccount', // 新增操作员
    getChildrenInfo: '/datacenter/param/v1/account/getChildrenInfo', // 获取操作员详情
    getAccountRights: '/datacenter/param/v1/account/getAccountRights', // 获取操作员权限
    editChildrenInfo: '/datacenter/body/v1/account/editChildrenInfo', // 修改操作员信息
    changeAccountRights: '/datacenter/body/v1/account/changeAccountRights', // 修改操作员权限
    changeAccountStatus: '/datacenter/body/v1/account/changeAccountStatus', // 修改操作员可用状态
    delAccount: '/datacenter/body/v1/account/delAccount', // 删除操作员
    checkAccountIsset: '/datacenter/body/v1/common/setting/checkAccountIsset' // 验证手机、账号是否存在
}

export default power