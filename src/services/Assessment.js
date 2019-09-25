import Api from "@/services/Api";

export default {
  getAssessments(credentials) {
    return Api().post("assessment/", credentials);
  },
  createAssessments(credentials) {
    return Api().post("assessment/", credentials);
  },
  toggleActivation(credentials) {
    return Api().post("assessment/", credentials);
  }
};
