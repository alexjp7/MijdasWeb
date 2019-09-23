import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // token: null,
    user: null,
    isUserLoggedIn: false,
    subject: null
  },
  mutations: {
    // setToken(state, token) {
    //   state.token = token;
    //   state.isUserLoggedIn = !!token;
    // },
    setUser(state, user) {
      state.user = user;
      state.isUserLoggedIn = !!user;
    },
    setSubject(state, subject) {
      state.subject = subject;
    }
  },
  actions: {
    // setToken({ commit }, token) {
    //   commit("setToken", token);
    // },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setSubject({ commit }, subject) {
      commit("setSubject", subject);
    }
  }
});
