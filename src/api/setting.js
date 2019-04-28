const setting = {
    getCommonSetting: '/datacenter/param/v1/alliance/setting/getCommonSetting', // 获取联盟企业通用设置信息
    changeTaxRate: '/datacenter/body/v1/common/setting/changeTaxRate', // 修改联盟企业通用税率信息
    changeReturnDeadline: '/datacenter/body/v1/alliance/setting/changeReturnDeadline', // 修改联盟企业通用退货时间信息
    getEspecialChain: '/datacenter/param/v1/alliance/setting/getEspecialChain', // 获取联盟企业特有的分润设置信息
    getAllianceRoleInfo: '/datacenter/param/v1/alliance/setting/getAllianceRoleInfo', // 获取产业联盟角色信息
    changeAllianceDisplayStatus: '/datacenter/body/v1/alliance/setting/changeAllianceDisplayStatus', // 修改联盟企业是否显示于联盟企业列表信息
    changeAllianceChainsDisplayStatus: '/datacenter/body/v1/alliance/setting/changeAllianceChainsDisplayStatus', // 修改联盟企业是否显示于联营企业列表信息
    getAllianceRoleInfo: '/datacenter/param/v1/alliance/setting/getAllianceRoleInfo', // 获取产业联盟角色
    getShopUrl: '/datacenter/param/v1/alliance/setting/getShopUrl', // 获取联盟企业线上店铺链接信息
    getContactInfo: '/datacenter/param/v1/common/platform/getContactInfo', // 获取签约平台联系方式
    changeBarterDeadline: '/datacenter/body/v1/alliance/setting/changeBarterDeadline', // 2.9.	修改联盟企业通用换货时间信息接口
    changeWarrantyDeadline: '/datacenter/body/v1/alliance/setting/changeWarrantyDeadline', // 2.10.	修改联盟企业通用保修时间信息接口
}

export default setting