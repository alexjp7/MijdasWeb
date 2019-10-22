import Api from "@/services/Api";
import store from "@/store.js";

export default {
  subjects(credentials) {
    credentials.token = store.state.token;
    return Api().post("subject/", credentials);
  },
  addStudents(credentials) {
    credentials.token = store.state.token;
    return Api().post("subject/", credentials);
  },
  getStudents(credentials) {
    credentials.token = store.state.token;
    return Api().post("subject/", credentials);
  },
  addStaffMember(credentials) {
    credentials.token = store.state.token;
    return Api().post("subject/", credentials);
  },
  getTutors(credentials) {
    credentials.token = store.state.token;
    return Api().post("subject/", credentials);
  },
  removeStaff(credentials) {
    credentials.token = store.state.token;
    return Api().post("subject/", credentials);
  },
  getAssessments(credentials) {
    credentials.token = store.state.token;
    return Api().post("subject/", credentials);
  }
};
