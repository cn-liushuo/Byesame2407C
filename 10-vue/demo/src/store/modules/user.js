import { login } from "@/api/login"

const state = {}
const getters = {}
const mutations = {}
const actions = {
    goLogin({ commit }, params) {
        login(params).then(res => {
            console.log(res)

        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}