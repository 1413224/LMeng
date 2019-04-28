import Vue from 'vue'
import Router from 'vue-router'
// 一级路由
import Manage from '@/components/manage/manage' //左侧菜单栏
import Login from '@/page/login'
import Not404 from '@/page/404'
const Overdue = r => require.ensure([], () => r(require('@/page/overdue')), 'overdue')
const rePassword = r => require.ensure([], () => r(require('@/page/base/rePassword')), 'rePassword')

import publiclyRouter from './publicly'


Vue.use(Router)

export default new Router({
  routes: [
	{
		path: '/manage',
		name: 'manage',
		component:Manage,
		children:[
			...publiclyRouter
		]
	},
    {
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/re-password',
		name: 'rePassword',
		component: rePassword
	},
	{
		path: '/404',
		name: 'Not404',
		component: Not404
	},
	{
		path: '/overdue',
		name: 'Overdue',
		component: Overdue
	},
	// {
	// 	path: '*',
	// 	redirect: '/404'
	// }
  ]
})
