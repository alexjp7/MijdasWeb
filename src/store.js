import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    // token: null,
    user: null,
    isUserLoggedIn: false,
    subjectCode: null,
    subjectID: null
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
    setSubjectCode(state, subjectCode) {
      state.subjectCode = subjectCode;
      console.log("test code: " + subjectCode);
    },
    setSubjectID(state, subjectID) {
      state.subjectID = subjectID;
      console.log("test id" + subjectID);
    }
  },
  actions: {
    // setToken({ commit }, token) {
    //   commit("setToken", token);
    // },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setSubjectCode({ commit }, subjectCode) {
      console.log(" test code: " + subjectCode);
      commit("setSubjectCode", subjectCode);
    },
    setSubjectID({ commit }, subjectID) {
      console.log("test id: " + subjectID);
      commit("setSubjectID", subjectID);
    }
  },
  getters: {
    subjectID: state => {
      return state.subjectID;
    }
  }
});
