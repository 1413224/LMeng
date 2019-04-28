const freight = {
    getTemplateList: '/datacenter/param/v1/common/freightTemplate/getTemplateList', // 2.1.获取运费模板列表
    addTemplate: '/datacenter/body/v1/common/freightTemplate/addTemplate', // 2.2.新增运费模板
    modifyTemplate: '/datacenter/body/v1/common/freightTemplate/modifyTemplate', // 2.3.修改运费模板
    modifyTemplateStatus: '/datacenter/body/v1/common/freightTemplate/modifyTemplateStatus', // 2.4.修改运费模板状态
    getTemplateInfo: '/datacenter/param/v1/common/freightTemplate/getTemplateInfo', // 2.5.运费模板详情
    delTemplate: '/datacenter/body/v1/common/freightTemplate/delTemplate', // 2.6.删除运费模板
    getOrderExpressInfo: '/datacenter/param/v1/common/order/getOrderExpressInfo', //2.1.	获取所有可用的快递公司列表
}

export default freight