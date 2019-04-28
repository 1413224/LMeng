const state = {
    avatar: ''
}

const getters = {
    avatar: state => state.avatar
}

const actions = {}

const mutations = {
    setAvarar(state, val) {
        state.avatar = val
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}