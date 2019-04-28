const order = {
    getOrderList: '/datacenter/param/v1/alliance/order/getOrderList', // 2.1     获取联盟企业订单列表信息
    expressCompany: '/datacenter/param/v1/common/expressCompany/getList', //2.1.	获取所有可用的快递公司列表
    getOrderDetail: '/datacenter/param/v1/alliance/order/getOrderDetail', // 2.2.	获取联盟企业订单详情接口
    getSellerMessage: '/datacenter/param/v1/alliance/order/getSellerMessage', //2.3.	联盟企业查看商家备注接口
    modifySellerMessage: '/datacenter/body/v1/alliance/order/modifySellerMessage', //2.4.	联盟企业修改商家备注接口
    modifyAddressInfo: '/datacenter/body/v1/alliance/order/modifyAddressInfo', //2.5.	联盟企业修改订单收货地址信息接口
    shipments: '/datacenter/body/v1/alliance/order/shipments', //2.6.	联盟企业订单发货接口
    modifyExpressInfo: '/datacenter/body/v1/alliance/order/modifyExpressInfo', // 2.7.	联盟企业修改订单物流信息接口
    cancelShipments: '/datacenter/body/v1/alliance/order/cancelShipments', //2.8.	联盟企业订单取消发货接口
    getOrderGoodsList: '/datacenter/param/v1/alliance/order/getOrderGoodsList', //2.9.	联盟企业获取订单商品列表接口
    modifyGoodsPrice: '/datacenter/body/v1/alliance/order/modifyGoodsPrice', //2.10.	联盟企业修改订单金额信息接口
    modifyFreight: '/datacenter/body/v1/alliance/order/modifyFreight', //2.11.	联盟企业修改订单运费信息接口
    closeOrder: '/datacenter/body/v1/alliance/order/closeOrder', //2.12.	联盟企业关闭订单信息接口
    deleteOrder: '/datacenter/body/v1/alliance/order/deleteOrder', //2.13.	联盟企业删除用户已永久删除订单接口
    getOrderExpressInfo: '/datacenter/param/v1/common/order/getOrderExpressInfo', //2.1.	获取订单物流信息
}

export default order