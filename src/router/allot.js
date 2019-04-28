// 动态路由

const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const Power = r => require.ensure([], () => r(require('@/page/power/index')), 'power')
const Quick = r => require.ensure([], () => r(require('@/page/power/quick')), 'quick')
const EditQuick = r => require.ensure([], () => r(require('@/page/power/editQuick')), 'edit-quick')
const EditPower = r => require.ensure([], () => r(require('@/page/power/editPower')), 'edit-power')
const Member = r => require.ensure([], () => r(require('@/page/member/index')), 'member')
const Equipment = r => require.ensure([], () => r(require('@/page/equipment/index')), 'equipment')
const Port = r => require.ensure([], () => r(require('@/page/pos/port')), 'Port')
const Cashier = r => require.ensure([], () => r(require('@/page/pos/cashier')), 'Cashier')
const Goods = r => require.ensure([], () => r(require('@/page/pos/goods')), 'Goods')
const GoodsDetail = r => require.ensure([], () => r(require('@/page/pos/goodsDetail')), 'GoodsDetail')
const Income = r => require.ensure([], () => r(require('@/page/income/index')), 'Income')
const IncomeDetail = r => require.ensure([], () => r(require('@/page/income/detail')), 'Income')

const CardMember = r => require.ensure([], () => r(require('@/page/card/member')), 'Card')
const Card = r => require.ensure([], () => r(require('@/page/card')), 'Card')
const Recharge = r => require.ensure([], () => r(require('@/page/card/recharge')), 'Recharge')
const cardStore = r => require.ensure([], () => r(require('@/page/card/store')), 'Card')
const CardLog = r => require.ensure([], () => r(require('@/page/card/cardLog')), 'Card')
const CardMemberLog = r => require.ensure([], () => r(require('@/page/card/memberLog')), 'Card')

const cgcPay = r => require.ensure([], () => r(require('@/page/pay')), 'Pay')
const PayCode = r => require.ensure([], () => r(require('@/page/pay/payCode')), 'Pay')
const Apply = r => require.ensure([], () => r(require('@/page/apply')), 'Apply')

const Feedback = r => require.ensure([], () => r(require('@/page/feedback')), 'Feedback')
const FeedbackAdd = r => require.ensure([], () => r(require('@/page/feedback/add')), 'Feedback')
const FeedbackDetail = r => require.ensure([], () => r(require('@/page/feedback/detail')), 'Feedback')

const notice = r => require.ensure([], () => r(require('@/page/notice/index')), 'notice')
const EditNotice = r => require.ensure([], () => r(require('@/page/notice/editNotice')), 'edit-notice')

const Shop = r => require.ensure([], () => r(require('@/page/shop/index')), 'shop')
const ShopDetail = r => require.ensure([], () => r(require('@/page/shop/detail')), 'shop')
const SellOut = r => require.ensure([], () => r(require('@/page/shop/sellOut')), 'shop')
const Warehouse = r => require.ensure([], () => r(require('@/page/shop/warehouse')), 'shop')
const Recycle = r => require.ensure([], () => r(require('@/page/shop/recycle')), 'shop')
const Auditing = r => require.ensure([], () => r(require('@/page/shop/auditing')), 'shop')
const ShopGroup = r => require.ensure([], () => r(require('@/page/shop/group')), 'shop')
const ShopGroupEdit = r => require.ensure([], () => r(require('@/page/shop/group/edit')), 'shop')
const ShopUpload = r => require.ensure([], () => r(require('@/page/shop/upload')), 'shop')
const ShopAuditingEdit = r => require.ensure([], () => r(require('@/page/shop/auditing/edit')), 'shop')
const ShopAdd = r => require.ensure([], () => r(require('@/page/shop/add')), 'shop')
const ShopAuditingContrast = r => require.ensure([], () => r(require('@/page/shop/auditing/contrast')), 'shop')
const AuditingFail = r => require.ensure([], () => r(require('@/page/shop/auditing/fail')), 'shop')

const BaseSeparate = r => require.ensure([], () => r(require('@/page/base/separate')), 'base')

const Order = r => require.ensure([], () => r(require('@/page/order/index')), 'order')
const OrderDetail = r => require.ensure([], () => r(require('@/page/order/detail')), 'order')

const Settlement = r => require.ensure([], () => r(require('@/page/settlement/index')), 'settlement')
const SettlementDetail = r => require.ensure([], () => r(require('@/page/settlement/detail')), 'settlement')
const History = r => require.ensure([], () => r(require('@/page/settlement/history')), 'history')

const customIndex = r => require.ensure([], () => r(require('@/page/custom/index')), 'custom-index')
const customList = r => require.ensure([], () => r(require('@/page/custom/list')), 'custom-list')

const menuIndex = r => require.ensure([], () => r(require('@/page/menu/index')), 'menu-index')
const templateList = r => require.ensure([], () => r(require('@/page/template/list')), 'template-list')

const menuList = r => require.ensure([], () => r(require('@/page/menu/list')), 'menu-list')

const Operate = r => require.ensure([], () => r(require('@/page/business/operate')), 'business')
const Iac = r => require.ensure([], () => r(require('@/page/business/iac')), 'business')
const Tax = r => require.ensure([], () => r(require('@/page/business/tax')), 'business')
const Base = r => require.ensure([], () => r(require('@/page/business/base')), 'business')

const PortDetail = r => require.ensure([], () => r(require('@/page/pos/portDetail')), 'portDetail')

const Supply = r => require.ensure([], () => r(require('@/page/supply/index')), 'supply')
const SupplyDetail = r => require.ensure([], () => r(require('@/page/supply/detail')), 'supply')

const BuyNow = r => require.ensure([], () => r(require('@/page/buyNow/index')), 'buyNow')
const BuyNowDetail = r => require.ensure([], () => r(require('@/page/buyNow/detail')), 'buyNow')
const BuyNowAdd = r => require.ensure([], () => r(require('@/page/buyNow/add')), 'buyNow')
const Administration = r => require.ensure([], () => r(require('@/page/buyNow/administration')), 'buyNow')
const BuyNowAuditing = r => require.ensure([], () => r(require('@/page/buyNow/auditing')), 'buyNow')
const BuyNowContrast = r => require.ensure([], () => r(require('@/page/buyNow/auditing/contrast')), 'buyNow')
const BuyNowAuditingEdit = r => require.ensure([], () => r(require('@/page/buyNow/auditing/edit')), 'buyNow')
const BuyCode = r => require.ensure([], () => r(require('@/page/buyNow/buyCode')), 'buyNow')

const PurchaseBrand = r => require.ensure([], () => r(require('@/page/purchase/brand')), 'purchase')
const PurchaseHome = r => require.ensure([], () => r(require('@/page/purchase/home')), 'purchase')
const PurchaseDetail = r => require.ensure([], () => r(require('@/page/purchase/detail')), 'purchase')
const PurchaseCart = r => require.ensure([], () => r(require('@/page/purchase/cart')), 'purchase')
const PurchaseSettlement = r => require.ensure([], () => r(require('@/page/purchase/settlement')), 'purchase')

const Freight = r => require.ensure([], () => r(require('@/page/freight/index')), 'freight')
const FreightDetail = r => require.ensure([], () => r(require('@/page/freight/detail')), 'freight')
const FreightAdd = r => require.ensure([], () => r(require('@/page/freight/add')), 'freight')

const userSeller = r => require.ensure([], () => r(require('@/page/clerk/index')), 'clerk')

const Restaurant = r => require.ensure([], () => r(require('@/page/restaurant/index')), 'restaurant')
const restaurantClass = r => require.ensure([], () => r(require('@/page/restaurant/class')), 'restaurant')
const restaurantTable = r => require.ensure([], () => r(require('@/page/restaurant/table')), 'restaurant')
const restaurantDetail = r => require.ensure([], () => r(require('@/page/restaurant/detail')), 'restaurant')
const Look = r => require.ensure([], () => r(require('@/page/restaurant/look')), 'look')
const Audit = r => require.ensure([], () => r(require('@/page/restaurant/look/audit')), 'look')
const lookFail = r => require.ensure([], () => r(require('@/page/restaurant/look/fail')), 'look')

const Lower = r => require.ensure([], () => r(require('@/page/money/lower/index')), 'lower')
const Upper = r => require.ensure([], () => r(require('@/page/money/upper/index')), 'upper')
const Service = r => require.ensure([], () => r(require('@/page/money/service/index')), 'service')
const Commodity = r => require.ensure([], () => r(require('@/page/money/commodity/index')), 'commodity')
const LowerDetails = r => require.ensure([], () => r(require('@/page/money/lower/details')), 'lower')
const UpperDetails = r => require.ensure([], () => r(require('@/page/money/upper/details')), 'upper')
const ServiceDetails = r => require.ensure([], () => r(require('@/page/money/service/details')), 'service')
const CommodityDetails = r => require.ensure([], () => r(require('@/page/money/commodity/details')), 'commodity')

const lookDetail = r => require.ensure([], () => r(require('@/page/restaurant/look/detail')), 'look')

const Result = r => require.ensure([], () => r(require('@/page/result/index')), 'result')
const ResultDetail = r => require.ensure([], () => r(require('@/page/result/detail')), 'result')

const dataScreen = r => require.ensure([], () => r(require('@/page/data/index')), 'data')
const screenData = r => require.ensure([], () => r(require('@/page/data/screen')), 'data')

const Combined = r => require.ensure([], () => r(require('@/page/business/combined')), 'business')

const router = {
    'home': {
        path: '/home',
        name: 'home',
        component: home
    },
    'power': {
        path: '/power',
        name: 'Power',
        component: Power,
        meta: {
            crumbs: [{
                label: '权限管理'
            }, {
                label: '操作员'
            }],
            keepAlive: true
        }
    },
    'quick': {
        path: '/quick',
        name: 'Quick',
        component: Quick,
        meta: {
            crumbs: [{
                label: '权限管理'
            }, {
                label: '快捷权限组'
            }],
            keepAlive: true
        }
    },
    'edit-quick': {
        path: '/edit-quick',
        name: 'EditQuick',
        component: EditQuick,
        meta: [{
            label: '权限管理',
            path: '/quick'
        }, {
            label: '快捷权限组',
            path: '/quick'
        }, {
            label: '编辑快捷权限组'
        }]
    },
    'edit-power': {
        path: '/edit-power',
        name: 'EditPower',
        component: EditPower,
        meta: [{
            label: '权限管理',
            path: '/power'
        }, {
            label: '操作员管理',
            path: '/power'
        }, {
            label: '编辑操作员'
        }]
    },
    'member': {
        path: '/member',
        name: 'Member',
        component: Member,
        meta: {
            crumbs: [{
                label: '会员管理'
            }],
            keepAlive: true
        }
    },
    'port': {
        path: '/port',
        name: 'Port',
        component: Port,
        meta: [{
            label: '收银系统端口'
        }]
    },
    'cashier': {
        path: '/cashier',
        name: 'Cashier',
        component: Cashier,
        meta: {
            crumbs: [{
                label: '收银员管理'
            }],
            keepAlive: true
        }
    },
    'goods': {
        path: '/goods',
        name: 'Goods',
        component: Goods,
        meta: {
            crumbs: [{
                label: '商品管理'
            }],
            keepAlive: true
        }
    },
    'goods-detail': {
        path: '/goods-detail',
        name: 'GoodsDetail',
        component: GoodsDetail,
        meta: [{
            label: '商品管理',
            path: '/goods'
        }, {
            label: '商品详情'
        }]
    },
    'income': {
        path: '/income',
        name: 'Income',
        component: Income,
        meta: {
            crumbs: [{
                label: '收益管理'
            }],
            keepAlive: true
        }
    },
    'income-detail': {
        path: '/income-detail',
        name: 'IncomeDetail',
        component: IncomeDetail,
        meta: [{
            label: '收益管理',
            path: '/income'
        }, {
            label: '收益详情'
        }]
    },
    'card-member': {
        path: '/card-member',
        name: 'CardMember',
        component: CardMember,
        meta: {
            crumbs: [{
                label: '会员通用卡'
            }],
            keepAlive: true
        }
    },
    'card': {
        path: '/card',
        name: 'Crad',
        component: Card,
        meta: [{
            label: '通用卡'
        }]
    },
    'card-store': {
        path: '/card-store',
        name: 'cardStore',
        component: cardStore,
        meta: [{
            label: '通用卡',
            path: '/card'
        }, {
            label: '可用联盟企业'
        }]
    },
    'recharge': {
        path: '/recharge',
        name: 'Recharge',
        component: Recharge,
        meta: [{
            label: '会员充值'
        }]
    },
    'cgc_pay': {
        path: '/cgc_pay',
        name: 'cgcPay',
        component: cgcPay,
        meta: [{
            label: '收钱码'
        }]
    },
    'pay-code': {
        path: '/pay-code',
        name: 'PayCode',
        component: PayCode,
        meta: [{
            label: '收钱码入口'
        }]
    },
    'apply': {
        path: '/apply',
        name: 'Apply',
        component: Apply,
        meta: [{
            label: '基本应用'
        }]
    },
    'feedback': {
        path: '/feedback',
        name: 'Feedback',
        component: Feedback,
        meta: {
            crumbs: [{
                label: '反馈中心'
            }],
            keepAlive: true
        }
    },
    'feedback-add': {
        path: '/feedback-add',
        name: 'FeedbackAdd',
        component: FeedbackAdd,
        meta: [{
            label: '反馈中心',
            path: '/feedback'
        }, {
            label: '新增反馈信息'
        }]
    },
    'feedback-detail': {
        path: '/feedback-detail',
        name: 'FeedbackDetail',
        component: FeedbackDetail,
        meta: [{
            label: '反馈中心',
            path: '/feedback'
        }, {
            label: '反馈详情'
        }]
    },
    'notice': {
        path: '/notice',
        name: 'notice',
        component: notice,
        meta: {
            crumbs: [{
                label: '基本设置'
            }, {
                label: '通知管理'
            }],
            keepAlive: true
        }
    },
    'edit-notice': {
        path: '/edit-notice',
        name: 'EditNotice',
        component: EditNotice,
        meta: [{
            label: '基本设置'
        }, {
            label: '通知管理',
            path: '/notice'
        }, {
            label: '编辑角色通知人'
        }]
    },
    'shop': {
        path: '/shop',
        name: 'Shop',
        component: Shop,
        meta: {
            crumbs: [{
                label: '企业云商城'
            }, {
                label: '商品管理'
            }, {
                label: '出售中'
            }],
            keepAlive: true
        }
    },
    'shop-detail': {
        path: '/shop-detail',
        name: 'ShopDetail',
        component: ShopDetail,
        meta: [{
            label: '企业云商城',
            path: '/shop'
        }, {
            label: '商品管理',
            path: '/shop'
        }, {
            label: '出售中',
            path: '/shop'
        }, {
            label: '商品详情'
        }]
    },
    'sell-out-detail': {
        path: '/sell-out-detail',
        name: 'ShopDetail',
        component: ShopDetail,
        meta: [{
            label: '企业云商城',
            path: '/shop'
        }, {
            label: '商品管理',
            path: '/shop'
        }, {
            label: '已售馨',
            path: '/sell-out'
        }, {
            label: '商品详情'
        }]
    },
    'warehouse-detail': {
        path: '/warehouse-detail',
        name: 'ShopDetail',
        component: ShopDetail,
        meta: [{
            label: '企业云商城',
            path: '/shop'
        }, {
            label: '商品管理',
            path: '/shop'
        }, {
            label: '仓库中',
            path: '/warehouse'
        }, {
            label: '商品详情'
        }]
    },
    'recycle-detail': {
        path: '/recycle-detail',
        name: 'ShopDetail',
        component: ShopDetail,
        meta: [{
            label: '企业云商城',
            path: '/shop'
        }, {
            label: '商品管理',
            path: '/shop'
        }, {
            label: '回收站',
            path: '/recycle'
        }, {
            label: '商品详情'
        }]
    },
    'sell-out': {
        path: '/sell-out',
        name: 'SellOut',
        component: SellOut,
        meta: {
            crumbs: [{
                label: '企业云商城'
            }, {
                label: '商品管理'
            }, {
                label: '已售馨'
            }],
            keepAlive: true
        }
    },
    'warehouse': {
        path: '/warehouse',
        name: 'Warehouse',
        component: Warehouse,
        meta: {
            crumbs: [{
                label: '企业云商城'
            }, {
                label: '商品管理'
            }, {
                label: '仓库中'
            }],
            keepAlive: true
        }
    },
    'recycle': {
        path: '/recycle',
        name: 'Recycle',
        component: Recycle,
        meta: {
            crumbs: [{
                label: '企业云商城'
            }, {
                label: '商品管理'
            }, {
                label: '回收站'
            }],
            keepAlive: true
        }
    },
    'auditing': {
        path: '/auditing',
        name: 'Auditing',
        component: Auditing,
        meta: {
            crumbs: [{
                label: '企业云商城'
            }, {
                label: '审核列表'
            }, {
                label: '待审核'
            }],
            keepAlive: true
        }
    },
    'base-separate': {
        path: '/base-separate',
        name: 'BaseSeparate',
        component: BaseSeparate,
        meta: [{
            label: '通用设置',
            path: '/setting'
        }, {
            label: '分润详情'
        }]
    },
    'shop-group': {
        path: '/shop-group',
        name: 'ShopGroup',
        component: ShopGroup,
        meta: {
            crumbs: [{
                label: '企业云商城'
            }, {
                label: '商品组管理'
            }],
            keepAlive: true
        }
    },
    'shop-group-edit': {
        path: '/shop-group-edit',
        name: 'ShopGroupEdit',
        component: ShopGroupEdit,
        meta: [{
            label: '企业云商城',
            path: '/shop-group'
        }, {
            label: '商品组管理',
            path: '/shop-group'
        }, {
            label: '商品组编辑'
        }]
    },
    'order': {
        path: '/order',
        name: 'Order',
        component: Order,
        meta: {
            crumbs: [{
                label: '订单管理'
            }],
            keepAlive: true
        }
    },
    'order-detail': {
        path: '/order-detail',
        name: 'OrderDetail',
        component: OrderDetail,
        meta: [{
            label: '订单管理',
            path: '/order'
        }, {
            label: '订单详情'
        }]
    },
    'settlement': {
        path: '/settlement',
        name: 'Settlement',
        component: Settlement,
        meta: {
            crumbs: [{
                label: '结算明细'
            }],
            keepAlive: true
        }
    },
    'settlement-detail': {
        path: '/settlement-detail',
        name: 'SettlementDetail',
        component: SettlementDetail,
        meta: [{
            label: '结算明细',
            path: '/settlement'
        }, {
            label: '结算详情'
        }]
    },
    'shop-upload': {
        path: '/shop-upload',
        name: 'ShopUpload',
        component: ShopUpload,
        meta: [{
            label: '企业云商城',
            path: '/shop'
        }, {
            label: '商品管理',
            path: '/shop'
        }, {
            label: '商品上传'
        }]
    },
    'shop-auditing-edit': {
        path: '/shop-auditing-edit',
        name: 'ShopAuditingEdit',
        component: ShopAuditingEdit,
        meta: [{
            label: '企业云商城',
            path: '/shop'
        }, {
            label: '审核列表',
            path: '/auditing'
        }, {
            label: '商品编辑'
        }]
    },
    'shop-auditing-contrast': {
        path: '/shop-auditing-contrast',
        name: 'ShopAuditingContrast',
        component: ShopAuditingContrast,
        meta: [{
            label: '企业云商城',
            path: '/shop'
        }, {
            label: '审核列表',
            path: '/auditing'
        }, {
            label: '审核信息'
        }]
    },
    'history': {
        path: '/history',
        name: 'History',
        component: History,
        meta: {
            crumbs: [{
                label: '历史结算'
            }],
            keepAlive: true
        }
    },
    'shop-add': {
        path: '/shop-add',
        name: 'ShopAdd',
        component: ShopAdd,
        meta: [{
            label: '企业云商城',
            path: '/shop'
        }, {
            label: '商品管理',
            path: '/shop'
        }, {
            label: '新增商品'
        }]
    },
    'custom-index': {
        path: '/custom',
        name: 'customIndex',
        component: customIndex,
        meta: {
            crumbs: [{
                label: '店铺装修',
                path: '/custom-list'
            }],
            keepAlive: false
        }
    },
    'custom-index2': {
        path: '/custom2',
        name: 'customIndex2',
        component: customIndex,
        meta: {
            crumbs: [{
                label: '店铺装修',
                path: '/custom-list2'
            }],
            keepAlive: false
        }
    },
    'custom-list': {
        path: '/custom-list',
        name: 'customList',
        component: customList,
        meta: {
            crumbs: [{
                label: '店铺首页',
                'type': 1
            }],
            keepAlive: true
        }
    },
    'custom-list2': {
        path: '/custom-list2',
        name: 'customList',
        component: customList,
        meta: {
            crumbs: [{
                label: '专题页',
                'type': 2
            }],
            keepAlive: true
        }
    },
    'equipment': {
        path: '/equipment',
        name: 'Equipment',
        component: Equipment,
        meta: {
            crumbs: [{
                label: '设备管理'
            }],
            keepAlive: true
        }
    },
    'auditing-fail': {
        path: '/auditing-fail',
        name: 'AuditingFail',
        component: AuditingFail,
        meta: {
            crumbs: [{
                label: '企业云商城'
            }, {
                label: '审核列表'
            }, {
                label: '审核失败'
            }],
            keepAlive: true
        }
    },
    'menu-index': {
        path: '/menu',
        name: 'menuIndex',
        component: menuIndex,
        meta: [{
            label: '自定义菜单详情'
        }]
    },
    'menu-list': {
        path: '/menu-list',
        name: 'menuList',
        component: menuList,
        meta: {
            crumbs: [{
                label: '自定义菜单列表'
            }],
            keepAlive: true
        }
    },
    'template-list': {
        path: '/template-list',
        name: 'templateList',
        component: templateList,
        meta: {
            crumbs: [{
                label: '模板列表'
            }],
            keepAlive: true
        }
    },
    'operate': {
        path: '/operate',
        name: 'Operate',
        component: Operate,
        meta: [{
            label: '运营商信息'
        }]
    },
    'iac': {
        path: '/iac',
        name: 'Iac',
        component: Iac,
        meta: [{
            label: '工商信息'
        }]
    },
    'tax': {
        path: '/tax',
        name: 'Tax',
        component: Tax,
        meta: [{
            label: '税务信息'
        }]
    },
    'base': {
        path: '/base',
        name: 'Base',
        component: Base,
        meta: [{
            label: '基本信息'
        }]
    },
    'port-detail': {
        path: '/port-detail',
        name: 'PortDetail',
        component: PortDetail,
        meta: [{
            label: '收银系统端口',
            path: '/port'
        }, {
            label: '收银系统端口详情'
        }]
    },
    'card-log': {
        path: '/card-log',
        name: 'CardLog',
        component: CardLog,
        meta: [{
            label: '会员通用卡消费日志'
        }]
    },
    'card-member-log': {
        path: '/card-member-log',
        name: 'CardMemberLog',
        component: CardMemberLog,
        meta: [{
            label: '会员通用卡',
            path: '/card-member'
        }, {
            label: '会员通用卡消费日志'
        }]
    },
    'supply': {
        path: '/supply',
        name: 'Supply',
        component: Supply,
        meta: {
            crumbs: [{
                label: '供应链云商城'
            }],
            keepAlive: true
        }
    },
    'supply-detail': {
        path: '/supply-detail',
        name: 'SupplyDetail',
        component: SupplyDetail,
        meta: [{
            label: '供应链云商城',
            path: '/supply'
        }, {
            label: '商品详情'
        }]
    },
    'buy_now1': {
        path: '/buy_now1',
        name: 'BuyNow',
        component: BuyNow,
        meta: {
            crumbs: [{
                label: '自助购物'
            }, {
                label: '出售中'
            }],
            type: 1,
            keepAlive: true
        }
    },
    'buy_now2': {
        path: '/buy_now2',
        name: 'BuyNow',
        component: BuyNow,
        meta: {
            crumbs: [{
                label: '自助购物'
            }, {
                label: '仓库中'
            }],
            type: 2,
            keepAlive: true
        }
    },
    'buy_now3': {
        path: '/buy_now3',
        name: 'BuyNow',
        component: BuyNow,
        meta: {
            crumbs: [{
                label: '自助购物'
            }, {
                label: '已售罄'
            }],
            type: 3,
            keepAlive: true
        }
    },
    'buy_now4': {
        path: '/buy_now4',
        name: 'BuyNow',
        component: BuyNow,
        meta: {
            crumbs: [{
                label: '自助购物'
            }, {
                label: '回收站'
            }],
            type: 4,
            keepAlive: true
        }
    },
    'buy-now-detail1': {
        path: '/buy-now-detail1',
        name: 'BuyNowDetail',
        component: BuyNowDetail,
        meta: [{
            path: '/buy_now1',
            label: '自助购物'
        }, {
            path: '/buy_now1',
            label: '出售中'
        }, {
            label: '商品详情'
        }]
    },
    'buy-now-detail2': {
        path: '/buy-now-detail2',
        name: 'BuyNowDetail',
        component: BuyNowDetail,
        meta: [{
            path: '/buy_now2',
            label: '自助购物'
        }, {
            path: '/buy_now2',
            label: '仓库中'
        }, {
            label: '商品详情'
        }]
    },
    'buy-now-detail3': {
        path: '/buy-now-detail3',
        name: 'BuyNowDetail',
        component: BuyNowDetail,
        meta: [{
            path: '/buy_now3',
            label: '自助购物'
        }, {
            path: '/buy_now3',
            label: '已售罄'
        }, {
            label: '商品详情'
        }]
    },
    'buy-now-detail4': {
        path: '/buy-now-detail4',
        name: 'BuyNowDetail',
        component: BuyNowDetail,
        meta: [{
            path: '/buy_now4',
            label: '自助购物'
        }, {
            path: '/buy_now4',
            label: '回收站'
        }, {
            label: '商品详情'
        }]
    },
    'buy-now-add': {
        path: '/buy-now-add',
        name: 'BuyNowAdd',
        component: BuyNowAdd,
        meta: [{
            path: '/buy_now',
            label: '自助购物'
        }, {
            label: '新增商品'
        }]
    },
    'buy-now-auditing5': {
        path: '/buy-now-auditing5',
        name: 'BuyNowAuditing',
        component: BuyNowAuditing,
        meta: {
            crumbs: [{
                label: '自助购物'
            }, {
                label: '审核中'
            }],
            type: 5,
            keepAlive: true
        }
    },
    'buy-now-auditing6': {
        path: '/buy-now-auditing6',
        name: 'BuyNowAuditing',
        component: BuyNowAuditing,
        meta: {
            crumbs: [{
                label: '自助购物'
            }, {
                label: '审核失败'
            }],
            type: 6,
            keepAlive: true
        }
    },
    'buy-now-contrast': {
        path: '/buy-now-contrast',
        name: 'BuyNowContrast',
        component: BuyNowContrast,
        meta: {
            crumbs: [{
                label: '自助购物',
                path: '/buy-now-auditing5'
            }, {
                label: '审核对比'
            }],
            keepAlive: false
        }
    },
    'buy-now-auditing-edit5': {
        path: '/buy-now-auditing-edit5',
        name: 'BuyNowAuditingEdit',
        component: BuyNowAuditingEdit,
        meta: {
            crumbs: [{
                path: '/buy-now-auditing5',
                label: '自助购物'
            }, {
                path: '/buy-now-auditing5',
                label: '审核中'
            }, {
                label: '审核详情'
            }],
            keepAlive: false
        }
    },
    'buy-now-auditing-edit6': {
        path: '/buy-now-auditing-edit6',
        name: 'BuyNowAuditingEdit',
        component: BuyNowAuditingEdit,
        meta: {
            crumbs: [{
                path: '/buy-now-auditing6',
                label: '自助购物'
            }, {
                path: '/buy-now-auditing6',
                label: '审核失败'
            }, {
                label: '审核详情'
            }],
            keepAlive: false
        }
    },
    'purchase-brand': {
        path: '/purchase-brand',
        name: 'PurchaseBrand',
        component: PurchaseBrand,
        meta: [{
            label: '品牌'
        }]
    },
    'purchase-home': {
        path: '/purchase-home',
        name: 'PurchaseHome',
        component: PurchaseHome,
        meta: [{
            label: '企业采购'
        }]
    },
    'purchase-detail': {
        path: '/purchase-detail',
        name: 'PurchaseDetail',
        component: PurchaseDetail,
        meta: [{
            path: '/purchase-home',
            label: '企业采购'
        }, {
            label: '商品详情'
        }]
    },
    'purchase-cart': {
        path: '/purchase-cart',
        name: 'PurchaseCart',
        component: PurchaseCart,
        meta: [{
            path: '/purchase-home',
            label: '企业采购'
        }, {
            label: '购物车'
        }]
    },
    'purchase-settlement': {
        path: '/purchase-settlement',
        name: 'PurchaseSettlement',
        component: PurchaseSettlement,
        meta: [{
            path: '/purchase-home',
            label: '企业采购'
        }, {
            path: '/purchase-cart',
            label: '购物车'
        }, {
            label: '现在结算'
        }]
    },
    'freight': {
        path: '/freight',
        name: 'Freight',
        component: Freight,
        meta: {
            crumbs: [{
                label: '运费模板'
            }],
            keepAlive: true
        }
    },
    'freight-detail': {
        path: '/freight-detail',
        name: 'FreightDetail',
        component: FreightDetail,
        meta: [{
            label: '运费模板',
            path: '/freight'
        }, {
            label: '运费详情'
        }]
    },
    'freight-add': {
        path: '/freight-add',
        name: 'FreightAdd',
        component: FreightAdd,
        meta: [{
            label: '运费模板',
            path: '/freight'
        }, {
            label: '新增运费模板'
        }]
    },
    'user_seller': {
        path: '/user_seller',
        name: 'userSeller',
        component: userSeller,
        meta: {
            crumbs: [{
                label: '店员管理'
            }],
            keepAlive: true
        }
    },
    'restaurant': {
        path: '/restaurant',
        name: 'Restaurant',
        component: Restaurant,
        meta: [{
            label: '餐品管理'
        }]
    },
    'restaurant-class': {
        path: '/restaurant-class',
        name: 'restaurantClass',
        component: restaurantClass,
        meta: [{
            label: '餐品分类'
        }]
    },
    'restaurant-table': {
        path: '/restaurant-table',
        name: 'restaurantTable',
        component: restaurantTable,
        meta: [{
            label: '桌台管理'
        }]
    },
    'restaurant-tetail': {
        path: '/restaurant-detail',
        name: 'restaurantDetail',
        component: restaurantDetail,
        meta: [{
                label: '餐品管理',
                path: '/restaurant'
            },
            {
                label: '餐品管理详情'
            }
        ]
    },
    'look': {
        path: '/look',
        name: 'Look',
        component: Look,
        meta: {
            crumbs: [{
                label: '线上点餐'
            }, {
                label: '审核列表'
            }, {
                label: '待审核'
            }],
            keepAlive: true
        }
    },
    'audit': {
        path: '/audit',
        name: 'Audit',
        component: Audit,
        meta: {
            crumbs: [{
                label: '线上点餐'
            }, {
                label: '审核列表'
            }, {
                label: '审核中'
            }],
            keepAlive: true
        }
    },
    'look-fail': {
        path: '/look-fail',
        name: 'lookFail',
        component: lookFail,
        meta: {
            crumbs: [{
                label: '线上点餐'
            }, {
                label: '审核列表'
            }, {
                label: '审核失败'
            }],
            keepAlive: true
        }
    },
    'auditing-fail': {
        path: '/auditing-fail',
        name: 'AuditingFail',
        component: AuditingFail,
        meta: {
            crumbs: [{
                label: '企业云商城'
            }, {
                label: '审核列表'
            }, {
                label: '审核失败'
            }],
            keepAlive: true
        }
    },
    'lower': {
        path: '/lower',
        name: 'Lower',
        component: Lower,
        meta: {
            crumbs: [{
                label: '产业联盟线下商品'
            }],
            keepAlive: true
        }
    },
    'lower-details': {
        path: '/lower-details',
        name: 'LowerDetails',
        component: LowerDetails,
        meta: [{
            path: '/lower',
            label: '产业联盟线下商品'
        }, {
            label: '产业联盟线下商品详情'
        }]
    },
    'upper': {
        path: '/upper',
        name: 'Upper',
        component: Upper,
        meta: {
            crumbs: [{
                label: '产业联盟线上商品'
            }],
            keepAlive: true
        }

    },
    'upper-details': {
        path: '/upper-details',
        name: 'UpperDetails',
        component: UpperDetails,
        meta: [{
            path: '/upper',
            label: '产业联盟线上商品'
        }, {
            label: '产业联盟线上商品详情'
        }]
    },
    'service': {
        path: '/service',
        name: 'Service',
        component: Service,
        meta: {
            crumbs: [{
                label: '供应链服务'
            }],
            keepAlive: true
        }
    },
    'service-details': {
        path: '/service-details',
        name: 'ServiceDetails',
        component: ServiceDetails,
        meta: [{
            path: '/service',
            label: '供应链服务'
        }, {
            label: '供应链服务详情'
        }]
    },
    'commodity': {
        path: '/commodity',
        name: 'Commodity',
        component: Commodity,
        meta: {
            crumbs: [{
                label: '供应链商品'
            }],
            keepAlive: true
        }
    },
    'commodity-details': {
        path: '/commodity-details',
        name: 'CommodityDetails',
        component: CommodityDetails,
        meta: [{
            path: '/commodity',
            label: '供应链商品'
        }, {
            label: '供应链商品详情'
        }]
    },
    'look-detail': {
        path: '/look-detail',
        name: 'lookDetail',
        component: lookDetail,
        meta: [{
            path: '/look',
            label: '审核列表'
        }, {
            label: '列表详情'
        }]
    },
    'result': {
        path: '/result',
        name: 'Result',
        component: Result,
        meta: {
            crumbs: [{
                label: '周末抽奖'
            }],
            keepAlive: true
        }
    },
    'result-detail': {
        path: '/result-detail',
        name: 'ResultDetail',
        component: ResultDetail,
        meta: [{
            path: '/result',
            label: '周末抽奖'
        }, {
            label: '抽奖详情'
        }]
    },
    'administration': {
        path: '/administration',
        name: 'Administration',
        component: Administration,
        meta: [{
            label: '自助购物'
        }, {
            label: '商品分类管理'
        }]
    },
    'data_screen': {
        path: '/data_screen',
        name: 'dataScreen',
        component: dataScreen,
        meta: {
            crumbs: [{
                label: '数据大屏首页'
            }],
            keepAlive: true
        }
    },
    'screen_data': {
        path: '/screen_data',
        name: 'screenData',
        component: screenData,
        meta: {
            crumbs: [{
                label: '数据大屏'
            }],
            keepAlive: true
        }
    },
    'combined': {
        path: '/combined',
        name: 'Combined',
        component: Combined,
        meta: [{
            label: '联合运营商'
        }]
    },
    'buy-code': {
        path: '/buy-code',
        name: 'BuyCode',
        component: BuyCode,
        meta: [{
            label: '自助购物入口'
        }]
    },
}

const constantRouterMap = (roles = []) => {
    // 超级管理员权限，加载所有路由
    if (localStorage['accountType' + sessionStorage['roleTypeId']] === '0') return Object.values(router)
    let arr = []
    for (let item of roles) {
        item = item.replace(/^@/g, "")
        if (router[item]) {
            arr.push(router[item])
        }
    }
    return arr
}

export default constantRouterMap