import Api from "@/services/Api";
import store from "@/store.js";

export default {
  getAssessments(credentials) {
    credentials.token = store.state.token;
    return Api().post("assessment/", credentials);
  },
  createAssessments(credentials) {
    credentials.token = store.state.token;
    return Api().post("assessment/", credentials);
  },
  toggleActivation(credentials) {
    credentials.token = store.state.token;
    return Api().post("assessment/", credentials);
  }
};
