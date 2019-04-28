
const Password = r => require.ensure([], () => r(require('@/page/base/password')), 'password')
const BaseInfo = r => require.ensure([], () => r(require('@/page/base/info')), 'BaseInfo')
const Setting = r => require.ensure([], () => r(require('@/page/base/setting')), 'Setting')
const Platform = r => require.ensure([], () => r(require('@/page/base/platform')), 'platform')

const publiclyRouter = [
    {
		path: '/password',
		name: 'Password',
        component: Password,
        meta: [{label: '基本设置' }, {label: '修改密码' }]
    },
    {
		path: '/base-info',
		name: 'BaseInfo',
        component: BaseInfo,
        meta: [{label: '基本设置' }, {label: '账户信息' }]
    },
    {
		path: '/setting',
		name: 'Setting',
        component: Setting,
        meta: [{label: '基本设置' }, {label: '通用设置' }]
	},
	{
		path: '/platform',
		name: 'Platform',
        component: Platform,
        meta: [{label: '基本设置' }, {label: '平台信息' }]
	},
]

export default publiclyRouter