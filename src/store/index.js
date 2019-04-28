import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import base from './modules/base'

Vue.use(Vuex)

Vue.directive("has", function (el,binding) {
    if (localStorage['accountType' + sessionStorage['roleTypeId']] === '0') {
    	return
    }
    let arr = binding.value.split(',')
    let temp = false
    arr.forEach(element => {
        if(users.state.roles.includes(element)) {
            temp = true
        }
    })
    if (!temp) {
        try {
            el.parentNode.removeChild(el);
        } catch (error) {
        }
    }
})

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        users,
        base
    }
})
export default store