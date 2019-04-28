import constantRouterMap from '@/router/allot'

const state = {
    roles: [], // 权限
    menu: [{
            icon: 'el-icon-menu',
            type: 'title',
            index: 'home',
            label: '首页'
        },
        {
            icon: 'fa fa-diamond',
            type: 'title',
            index: 'member',
            label: '会员管理'
        },
        {
            icon: 'fa fa-sitemap',
            type: 'submenu',
            index: 'menu-pos',
            label: '店铺管理',
            children: [{
                    type: 'menu',
                    index: 'goods',
                    label: '商品管理'
                },
                {
                    type: 'menu',
                    index: 'cashier',
                    label: '收银员管理'
                },
                {
                    type: 'menu',
                    index: 'port',
                    label: '收银系统端口'
                },
            ]
        },
        {
            icon: 'fa fa-calendar-o',
            type: 'title',
            index: 'order',
            label: '订单管理'
        },
        {
            icon: 'fa fa-print',
            type: 'title',
            index: 'equipment',
            label: '设备管理'
        },
        {
            icon: 'fa fa-cny',
            type: 'title',
            index: 'income',
            label: '收益管理'
        },
        {
            icon: 'fa fa-file-text-o',
            type: 'submenu',
            index: 'menu-settlement',
            label: '结算管理',
            children: [{
                type: 'menu',
                index: 'settlement',
                label: '结算明细'
            }, {
                type: 'menu',
                index: 'history',
                label: '历史账单'
            }]
        },
        {
            icon: 'fa fa-cubes',
            type: 'title',
            index: 'apply',
            label: '应用中心'
        },
        {
            icon: 'fa fa-unlock-alt',
            type: 'submenu',
            index: 'menu-power',
            label: '权限管理',
            children: [{
                    type: 'menu',
                    index: 'power',
                    label: '操作员管理'
                },
                {
                    type: 'menu',
                    index: 'quick',
                    label: '快捷权限组'
                },
            ]
        },
        {
            icon: 'fa fa-phone-square',
            type: 'submenu',
            index: 'menu-info',
            label: '企业信息',
            children: [{
                    type: 'menu',
                    index: 'base',
                    label: '基本信息'
                },
                {
                    type: 'menu',
                    index: 'iac',
                    label: '工商信息'
                },
                {
                    type: 'menu',
                    index: 'tax',
                    label: '税务信息'
                }
            ]
        },
        {
            icon: 'fa fa-object-ungroup',
            type: 'submenu',
            index: 'menu-service',
            label: '平台服务中心',
            children: [
            	{
                    type: 'menu',
                    index: 'combined',
                    label: '联合运营商'
                },
                {
                    type: 'menu',
                    index: 'operate',
                    label: '城市管理中心'
                },
                {
                    type: 'menu',
                    index: 'platform',
                    label: '服务平台'
                },
            ]
        },
        {
            icon: 'el-icon-setting',
            type: 'submenu',
            index: 'menu-base',
            label: '基本设置',
            children: [{
                    type: 'menu',
                    index: 'setting',
                    label: '通用设置'
                },
                {
                    type: 'menu',
                    index: 'base-info',
                    label: '账户信息'
                },
                {
                    type: 'menu',
                    index: 'password',
                    label: '修改密码'
                },
                {
                    type: 'menu',
                    index: 'notice',
                    label: '通知人管理'
                },
                //              {
                //                  type: 'menu',
                //                  index: 'platform',
                //                  label: '平台信息'
                //              }
            ]
        },
        {
            icon: 'fa fa-envelope-o',
            type: 'title',
            index: 'feedback',
            label: '反馈中心',
            children: [{
                type: 'menu',
                index: 'feedback-add',
                label: '新增反馈信息'
            }, {
                type: 'menu',
                index: 'feedback-detail',
                label: '反馈详情'
            }]
        },
        //      {
        //          icon: 'fa fa-clipboard',
        //          type: 'title',
        //          index: 'supply',
        //          label: '供应链云商城'
        //      },
        //      {
        //         icon: 'fa fa-pencil-square-o',
        //         type: 'submenu',
        //         index: 'menu-purchase',
        //         label: '企业采购',
        //         children: [{
        //                 type: 'menu',
        //                 index: 'purchase-home',
        //                 label: '企业采购'
        //             },
        //             {
        //                 type: 'menu',
        //                 index: 'purchase-brand',
        //                 label: '品牌'
        //             }
        //         ]
        //      },
        {
            icon: 'fa fa-life-ring ',
            type: 'title',
            index: 'result',
            label: '周末抽奖'
        },
        // {
        //    icon: 'fa fa-database',
        //    type: 'title',
        //    index: 'data_screen',
        //    label: '数据大屏'
        // },
    ],
    apply: [ // 应用中心
        {
            icon: 'fa fa-paypal',
            type: 'submenu',
            index: 'cgc_pay',
            label: '收钱码',
            img: require('@/assets/images/cgc-sqh.png'),
            depict: '产品轻便，可移动收款',
            children: [
                {
                    type: 'menu',
                    index: 'cgc_pay',
                    label: '收钱码'
                },
                {
                    type: 'menu',
                    index: 'pay-code',
                    label: '入口管理'
                },
            ]
        },
        {
            icon: 'fa fa-id-card',
            type: 'submenu',
            index: 'enterprise_card',
            label: '企业通用卡',
            img: require('@/assets/images/cgc-jf.png'),
            depict: '线上线下整合营销，为消费者提供增值服务',
            children: [{
                    type: 'menu',
                    index: 'card',
                    label: '通用卡'
                },
                {
                    type: 'menu',
                    index: 'card-member',
                    label: '会员通用卡'
                },
                {
                    type: 'menu',
                    index: 'recharge',
                    label: '会员充值'
                },
                {
                    type: 'menu',
                    index: 'card-log',
                    label: '变更日志'
                },
            ]
        },
        {
            icon: 'fa fa-tags',
            type: 'submenu',
            index: 'buy_now',
            label: '自助购物',
            img: require('@/assets/images/cgc-buy-now.jpg'),
            depict: '为消费者构建全渠道的消费选择',
            children: [{
                    type: 'submenu',
                    index: 'buy-now-admin',
                    label: '商品管理',
                    children: [
                        {
                            type: 'menu',
                            index: 'buy_now1',
                            label: '出售中'
                        },
                        {
                            type: 'menu',
                            index: 'buy_now3',
                            label: '已售罄'
                        },
                        {
                            type: 'menu',
                            index: 'buy_now2',
                            label: '仓库中'
                        },
                        {
                            type: 'menu',
                            index: 'buy_now4',
                            label: '回收站'
                        },
                    ]
                },
                {
                    type: 'submenu',
                    index: 'buy-now-auditing-menu',
                    label: '审核列表',
                    children: [
                        {
                            type: 'menu',
                            index: 'buy-now-auditing5',
                            label: '审核中'
                        },
                        {
                            type: 'menu',
                            index: 'buy-now-auditing6',
                            label: '审核失败'
                        }
                    ]
                },
                {
                    type: 'menu',
                    index: 'administration',
                    label: '分类管理'
                },
                {
                    type: 'menu',
                    index: 'buy-code',
                    label: '入口管理'
                },
            ]
        },
        {
            icon: 'fa fa-creative-commons',
            type: 'title',
            index: 'user_seller',
            label: '店员管理',
            img: require('@/assets/images/c-seller.png'),
            depict: '一站式人力资源管理解决方案'
        },
        {
            icon: 'fa fa-cutlery',
            type: 'submenu',
            index: 'food_online',
            label: '线上点餐',
            img: require('@/assets/images/c-order.png'),
            depict: '为餐厅节省40%的人工成本',
            children: [{
                    type: 'menu',
                    index: 'restaurant',
                    label: '餐品管理'
                }, {
                    type: 'menu',
                    index: 'restaurant-class',
                    label: '餐品分类'
                },
                {
                    type: 'menu',
                    index: 'restaurant-table',
                    label: '桌台管理'
                },
                {
                    type: 'submenu',
                    index: 'restaurant-menu',
                    label: '审核列表',
                    children: [
                        //                  	{
                        //                          type: 'menu',
                        //                          index: 'look',
                        //                          label: '待审核'
                        //                      },
                        {
                            type: 'menu',
                            index: 'audit',
                            label: '审核中'
                        },
                        {
                            type: 'menu',
                            index: 'look-fail',
                            label: '审核失败'
                        }
                    ]
                },
            ]
        },
        {
            icon: 'fa fa-shopping-cart',
            type: 'submenu',
            index: 'online_shop',
            label: '企业云商城',
            img: require('@/assets/images/online_shop.png'),
            depict: '全球消费者挚爱的品质购物之城',
            children: [{
                    type: 'submenu',
                    index: 'menu-shop-admin',
                    label: '商品管理',
                    children: [{
                            type: 'menu',
                            index: 'shop',
                            label: '出售中'
                        },
                        {
                            type: 'menu',
                            index: 'sell-out',
                            label: '已售馨'
                        },
                        {
                            type: 'menu',
                            index: 'warehouse',
                            label: '仓库中'
                        },
                        {
                            type: 'menu',
                            index: 'recycle',
                            label: '回收站'
                        },
                    ]
                },
                {
                    type: 'submenu',
                    index: 'menu-auditing-admin',
                    label: '审核列表',
                    children: [{
                            type: 'menu',
                            index: 'auditing',
                            label: '审核中'
                        },
                        {
                            type: 'menu',
                            index: 'auditing-fail',
                            label: '审核失败'
                        }
                    ]
                },
                {
                    type: 'menu',
                    index: 'shop-group',
                    label: '商品组管理'
                },
                {
                    type: 'menu',
                    index: 'freight',
                    label: '运费模板'
                },
            ]
        },
        {
            icon: 'fa fa-tablet',
            type: 'submenu',
            index: 'diy_page',
            label: '店铺装修',
            img: require('@/assets/images/diy_page.png'),
            depict: '打造个性化的店铺页',
            children: [{
                    type: 'menu',
                    index: 'custom-list',
                    label: '店铺首页'
                },
                {
                    type: 'menu',
                    index: 'custom-list2',
                    label: '专题页'
                },
                {
                    type: 'menu',
                    index: 'menu-list',
                    label: '自定义菜单'
                },
                {
                    type: 'menu',
                    index: 'template-list',
                    label: '模板列表'
                },
            ]
        },
        {
            icon: 'fa fa-phone-square',
            type: 'submenu',
            index: 'make_money',
            label: '精准赚钱',
            img: require('@/assets/images/make_money.jpg'),
            depict: '眼光精准，赚钱有道',
            children: [{
                    type: 'menu',
                    index: 'lower',
                    label: '产业联盟线下商品'
                },
                {
                    type: 'menu',
                    index: 'upper',
                    label: '产业联盟线上商品'
                },
                {
                    type: 'menu',
                    index: 'service',
                    label: '供应链服务'
                },
                {
                    type: 'menu',
                    index: 'commodity',
                    label: '供应链商品'
                }
            ]
        },
//      {
//          icon: 'fa fa-database',
//          type: 'title',
//          index: 'data_screen',
//          label: '数据大屏',
//          img: require('@/assets/images/data-screen.jpg'),
//          depict: '为客户提供了政务、电商、客服、安全、金融等多个应用场景'
//      }
    ]
}

function menuFilter(arr, roles) {
    let temp = []
    arr.forEach(obj => {
        if (roles.indexOf(obj.index) !== -1) {
            let tempobj = JSON.parse(JSON.stringify(obj))
            if (tempobj.children) {
                tempobj.children = menuFilter(tempobj.children, roles)
            }
            temp.push(tempobj)
        }
    })
    return temp
}

function applyFilter(arr, roles) {
    let temp = []
    arr.forEach(obj => {
        if (roles.indexOf(obj.index) !== -1) {
            let tempobj = JSON.parse(JSON.stringify(obj))
            temp.push(tempobj)
        }
    })
    return temp
}

const getters = {
    menu: state => {
        if (localStorage['accountType' + sessionStorage['roleTypeId']] === '0') { // 当管理员的身份时
            if (getters.apply(state).length > 0) { // 判断是否有应用权限
                return state.menu
            } else {
                return state.menu.filter(obj => { // 没有过滤权限
                    return obj.index != 'apply'
                })
            }
        }
        return menuFilter(state.menu, state.roles)
    },
    addRouters: state => {
        return constantRouterMap(state.roles)
    },
    apply: state => {
        if (localStorage['accountType' + sessionStorage['roleTypeId']] === '0') {
            return applyFilter(state.apply, state.roles)
        }
        return menuFilter(state.apply, state.roles)
    },
}

const actions = {}

const mutations = {
    setRole(state, val) {
        state.roles = val
    },
    insertDirectory(state, {
        index
    }) {
        getters.apply(state).forEach((obj, i) => {
            state.menu.splice(index + i, 0, obj)
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}