import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    users: {},
    screenLoading: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    listUsers: (state, pageInfo) => {
      state.screenLoading = true
      axios.get(`bilibili/users?page=${pageInfo.page}&size=${pageInfo.size}`).then(res => {
        state.users = res.data
      }).finally(() => {
        state.screenLoading = false
      })
    },
    setScreenLoading: (state, data) => {
      state.screenLoading = data
    }
  },
  actions: {
  },
  modules: {
  }
})
