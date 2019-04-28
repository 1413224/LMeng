const restaurant = {
  getCategoryList: '/datacenter/param/v1/alliance/dish/getCategoryList', // 2.1.	获取餐品分类列表信息接口
  getTableList: '/datacenter/param/v1/alliance/dish/getTableList', // 2.2.	获取桌台列表信息接口
  getDishList: '/datacenter/param/v1/alliance/dish/getDishList', // 2.3.	获取餐品列表信息接口
  getDishDetail: '/datacenter/param/v1/alliance/dish/getDishDetail', // 2.4.	获取餐品详情接口
  editDishInfo: '/datacenter/body/v1/alliance/dish/editDishInfo', // 2.5.	修改餐品详情接口
  getCheckDishList: '/datacenter/param/v1/alliance/dish/getCheckDishList', // 2.6.	获取餐品审核列表信息接口
  getCheckDishInfoById: '/datacenter/param/v1/alliance/dish/getCheckDishInfoById', // 2.7.	获取餐品审核详情接口
  modifyCheckDishInfoById: '/datacenter/body/v1/alliance/dish/modifyCheckDishInfoById', // 2.8.	修改餐品审核详情接口
}

export default restaurant