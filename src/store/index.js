import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    users: [],
    screenLoading: false,
    cols: 12
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setScreenLoading: (state, data) => {
      state.screenLoading = data
    },
    setCols (state, cols) {
      state.cols = cols
    },
    setUsers (state, users) {
      state.users = users
    }
  },
  actions: {
    async listUsers ({ commit }, pageInfo) {
      commit('setScreenLoading', true)
      commit('setUsers', [])
      try {
        const res = await axios.get(`bilibili/users?page=${pageInfo.page}&size=${pageInfo.size}`)
        commit('setUsers', res.data)
      } finally {
        commit('setScreenLoading', false)
      }
    }
  },
  modules: {}
})
