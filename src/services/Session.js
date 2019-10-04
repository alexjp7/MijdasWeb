import Api from "@/services/Api";

export default {
  getStudents(credentials) {
    return Api().post("session/", credentials);
  },
  getStudentSubjects(credentials) {
    return Api().post("session/", credentials);
  },
  getStudentAssessmentData(credentials) {
    return Api().post("session/", credentials);
  }
};
