const pos = {
    getAppidList: '/datacenter/param/v1/alliance/pos/getAppidList', // 获取收银系统端口列表信息
    getAppidConfig: '/datacenter/v1/alliance/pos/getAppidConfig', // 获取收银系统端口号配置文件
    getEmployeeList: '/datacenter/param/v1/alliance/pos/getEmployeeList', // 获取收银员列表信息
    updateDisplayOrderByid: '/datacenter/body/v1/alliance/pos/updateDisplayOrderByid', // 修改收银系统商品排序信息
    updateDetailByid: '/datacenter/body/v1/alliance/pos/updateDetailByid', // 修改收银系统商品详情信息
    updateThumbByid: '/datacenter/body/v1/alliance/pos/updateThumbByid', // 修改收银系统商品图片信息
    updateAllianceByid: '/datacenter/body/v1/alliance/pos/updateAllianceByid', // 修改收银系统商品产业联盟信息
    updateCateIdByid: '/datacenter/body/v1/alliance/pos/updateCateIdByid', // 修改收银系统商品所属分类信息
    updateBrandIdByid: '/datacenter/body/v1/alliance/pos/updateBrandIdByid', // 修改收银系统商品所属品牌信息
    getGoodsList: '/datacenter/param/v1/alliance/pos/getGoodsList', // 获取收银系统商品列表信息
    getGoodsDetail: '/datacenter/param/v1/alliance/pos/getGoodsDetail', // 获取收银系统商品详情信息
    getGoodsCategory: '/datacenter/param/v1/alliance/pos/getGoodsCategory', // 获取收银系统商品分类信息
    getGoodsBrand: '/datacenter/param/v1/alliance/pos/getGoodsBrand', // 获取收银系统商品品牌信息
    getAppidEndList: '/datacenter/param/v1/alliance/pos/getAppidEndList', // 获取联盟企业pos终端列表
    addAppidEnd: '/datacenter/body/v1/alliance/pos/addAppidEnd', // 新增联盟企业pos终端序号
    updateAppidEndstatus: '/datacenter/body/v1/alliance/pos/updateAppidEndstatus', // 修改联盟企业pos终端序号状态
}

export default pos