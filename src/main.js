// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './assets/js/base'
import 'font-awesome/css/font-awesome.min.css'
import './style/element-variables.scss'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import ElementUI from 'element-ui'
//import Echarts from 'echarts'
// import 'element-ui/lib/theme-chalk/index.css'
// import layuicss from 'layui.css'
import { post, get, put } from './utils/http'
import api from './api/index'
import store from './store'
import './assets/js/filter'
import VueLazyload from 'vue-lazyload'

sessionStorage['roleType'] = 'alliance'
sessionStorage['roleTypeId'] = 2

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI)
    //Vue.use(Echarts);
Vue.use(VueLazyload, {
    error: require('./assets/images/goods_default.png'),
    loading: require('./assets/images/goods_default.png')
})

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$put = put;

Vue.prototype.$api = api

router.beforeEach((to, from, next) => {
    if (to.path != '/login') {
        if (localStorage['token' + sessionStorage['roleTypeId']]) { // 判断是否有token
            if (store.state.users.roles.length === 0) { // 判断当前用户是否有权限数据
                if (localStorage['roles' + sessionStorage['roleTypeId']]) { // 现在是本地存储
                    store.commit('users/setRole', localStorage['roles' + sessionStorage['roleTypeId']].split(','))
                    router.options.routes[0].children.push(
                        ...store.getters['users/addRouters']
                    )
                    router.options.routes.push({ // 定位404最后加载，防止路由未加载完成时，指向404
                        path: '*',
                        redirect: '/404'
                    })
                    router.addRoutes(router.options.routes) // 动态添加可访问路由表
                    if (to.path == '/manage') {
                        next({...store.getters['users/addRouters'][0], replace: true })
                    } else {
                        next({...to, replace: true }) // hack方法 确保addRoutes已完成
                    }
                } else {
                    next('/login')
                }
            } else {
                if (to.path == '/manage') {
                    next(store.getters['users/addRouters'][0])
                } else {
                    next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
                }
            }
        } else {
            next('/login') // 重定向到登录页
        }
    } else {
        next()
    }
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})