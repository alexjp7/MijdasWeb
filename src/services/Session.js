import Api from "@/services/Api";
import store from "@/store.js";

export default {
  getStudents(credentials) {
    credentials.token = store.state.token;
    return Api().post("session/", credentials);
  },
  getStudentSubjects(credentials) {
    credentials.token = store.state.token;
    return Api().post("session/", credentials);
  },
  getStudentAssessmentData(credentials) {
    credentials.token = store.state.token;
    return Api().post("session/", credentials);
  }
};
