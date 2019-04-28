const buy = {
  getGoodsList: '/datacenter/param/v1/alliance/instantConsumptionGoods/getGoodsList', // 2.1 获取即时消费商品列表信息接口
  delGoodsByIds: '/datacenter/body/v1/alliance/instantConsumptionGoods/delGoodsByIds', // 2.2.	删除即时消费商品信息接口
  changeGoodsStatusById: '/datacenter/body/v1/alliance/instantConsumptionGoods/changeGoodsStatusById', // 2.3.	为企业云商城商品快速修改上下架信息接口
  getGoodsInfoById: '/datacenter/param/v1/alliance/instantConsumptionGoods/getGoodsInfoById', // 2.4.	获取企业云商城商品详情信息接口
  addGoodsInfo: '/datacenter/body/v1/alliance/instantConsumptionGoods/addGoodsInfo', // 2.5.	新增商品信息接口
  editGoodsInfoById: '/datacenter/body/v1/alliance/instantConsumptionGoods/editGoodsInfoById', // 2.6.	统一修改商品信息接口
  recoveryGoodsByIds: '/datacenter/body/v1/alliance/instantConsumptionGoods/recoveryGoodsByIds', // 2.7.	恢复自助购商品回收站商品信息接口
  physicalDelGoodsByIds: '/datacenter/body/v1/alliance/instantConsumptionGoods/physicalDelGoodsByIds', // 2.8.	彻底删除自助购回收站商品信息接口
  getGoodsCheckList: '/datacenter/param/v1/alliance/instantConsumptionGoods/getGoodsCheckList', // 2.9.	获取自助购商品审核列表信息接口
  getCheckGoodsInfoById: '/datacenter/param/v1/alliance/instantConsumptionGoods/getCheckGoodsInfoById', // 2.10.	获取自助购商品审核详情信息接口
  delCheckGoodsById: '/datacenter/body/v1/alliance/instantConsumptionGoods/delCheckGoodsById', // 2.11.	删除自助购商品审核审核信息接口
  editCheckGoodsInfo: '/datacenter/body/v1/alliance/instantConsumptionGoods/editCheckGoodsInfo', // 2.12.	修改商品审核信息接口

  addCategory: '/datacenter/body/v1/alliance/goodsCategory/addCategory', // 新增分类信息接口
  getCategoryInfoById: '/datacenter/param/v1/alliance/goodsCategory/getCategoryInfoById', // 获取分类信息详情接口
  editCategoryInfoById: '/datacenter/body/v1/alliance/goodsCategory/editCategoryInfoById', // 修改分类信息接口
  getCategoryList: '/datacenter/param/v1/alliance/goodsCategory/getCategoryList', // 获取分类列表接口
  changeCategoryStatusById: '/datacenter/body/v1/alliance/goodsCategory/changeCategoryStatusById', // 修改分类信息状态接口
  delCategory: '/datacenter/body/v1/alliance/goodsCategory/delCategory', // 删除信息接口
  getPayCode: '/datacenter/param/v1/alliance/instantConsumptionGoods/getPayCode', // 2.13.	获取商家收钱码唯一code接口
}

export default buy
