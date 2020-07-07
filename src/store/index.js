import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentZB: ""
    },
    mutations: {
        changeZB(state, zb) {
            state.currentZB = zb
        }
    },
    actions: {},
    modules: {}
})