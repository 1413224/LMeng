const shop = {
    getGoodsList: '/datacenter/param/v1/alliance/onlineShop/getGoodsList', // 获取企业云商城商品列表信息
    delGoodsByIds: '/datacenter/body/v1/alliance/onlineShop/delGoodsByIds', // 删除企业云商城商品信息
    recoveryGoodsByIds: '/datacenter/body/v1/alliance/onlineShop/recoveryGoodsByIds', // 恢复企业云商城回收站商品信息
    physicalDelGoodsByIds: '/datacenter/body/v1/alliance/onlineShop/physicalDelGoodsByIds', // 彻底删除企业云商城回收站商品信息
    changeGoodsNameById: '/datacenter/body/v1/alliance/onlineShop/changeGoodsNameById', // 为企业云商城商品修改名称信息
    changeGoodsStatusById: '/datacenter/body/v1/alliance/onlineShop/changeGoodsStatusById', // 企业云商城商品修改上下架信息
    changeGoodsDisplayOrderById: '/datacenter/body/v1/alliance/onlineShop/changeGoodsDisplayOrderById', // 企业云商城商品修改排序信息
    getGoodsInfoById: '/datacenter/param/v1/alliance/onlineShop/getGoodsInfoById', // 获取商品详情
    editGoodsBasicInfoById: '/datacenter/body/v1/alliance/onlineShop/editGoodsBasicInfoById', // 修改商品基础信息
    editGoodsParamsInfoById: '/datacenter/body/v1/alliance/onlineShop/editGoodsParamsInfoById', // 修改商品参数
    editGoodsDetailInfoById: '/datacenter/body/v1/alliance/onlineShop/editGoodsDetailInfoById', // 修改商品详情
    editGoodsAllianceInfoById: '/datacenter/body/v1/alliance/onlineShop/editGoodsAllianceInfoById', // 修改商品产业联盟
    editGoodsSkuInfoById: '/datacenter/body/v1/alliance/onlineShop/editGoodsSkuInfoById', // 修改商品规格
    editGoodsInfoById: '/datacenter/body/v1/alliance/onlineShop/editGoodsInfoById', // 统一修改企业云商品
    addGoodsInfo: '/datacenter/body/v1/alliance/onlineShop/addGoodsInfo', // 新增企业云商品
    
    getGroupList: '/datacenter/param/v1/alliance/onlineShop/getGroupList', // 获取商品组列表
    addGroup: '/datacenter/body/v1/alliance/onlineShop/addGroup', // 新增商品组
    getGroupDetail: '/datacenter/param/v1/alliance/onlineShop/getGroupDetail', // 获取商品组信息
    getGroupGoodsInfo: '/datacenter/param/v1/alliance/onlineShop/getGroupGoodsInfo', // 获取商品组内商品信息
    modifyGroupInfo: '/datacenter/body/v1/alliance/onlineShop/modifyGroupInfo', // 修改商品组
    modifyGroupStatus: '/datacenter/body/v1/alliance/onlineShop/modifyGroupStatus', // 修改商品组状态
    delGroup: '/datacenter/body/v1/alliance/onlineShop/delGroup', // 删除商品组
    addGroupGoods: '/datacenter/body/v1/alliance/onlineShop/addGroupGoods', // 往商品组添加商品
    delGroupGoods: '/datacenter/body/v1/alliance/onlineShop/delGroupGoods', // 删除商品组的商品
    
    getGoodsCheckList: '/datacenter/param/v1/alliance/onlineShop/getGoodsCheckList', // 获取审核商品列表
    getCheckGoodsInfoById: '/datacenter/param/v1/alliance/onlineShop/getCheckGoodsInfoById', // 获取审核商品详情
    delCheckGoodsById: '/datacenter/body/v1/alliance/onlineShop/delCheckGoodsById', // 删除审核商品
    editCheckGoodsInfo: '/datacenter/body/v1/alliance/onlineShop/editCheckGoodsInfo', // 修改审核商品
    findGoodsChanges: '/datacenter/param/v1/alliance/onlineShop/findGoodsChanges', // 企业云商城商品修改信息对比
    
    getStdGoodsBasicInfoByBarcode: '/datacenter/param/v1/stdGoods/getStdGoodsBasicInfoByBarcode', // 条形码获取标准库商品
    getStdGoodsBasicInfoByKeyword: '/datacenter/param/v1/stdGoods/getStdGoodsBasicInfoByKeyword', // 关键字获取标准库商品
}

export default shop