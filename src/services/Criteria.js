import Api from "@/services/Api";
import store from "@/store.js";

export default {
  criteria(credentials) {
    credentials.token = store.state.token;
    return Api().post("criteria/", credentials);
  },
  getCriteria(credentials) {
    credentials.token = store.state.token;
    return Api().post("criteria/", credentials);
  },
  createCriteria(credentials) {
    credentials.token = store.state.token;
    return Api().post("criteria/", credentials);
  },
  deleteCriteria(credentials) {
    credentials.token = store.state.token;
    return Api().post("criteria/", credentials);
  }
};
