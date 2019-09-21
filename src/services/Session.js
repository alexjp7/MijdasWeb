import Api from "@/services/Api";

export default {
    getStudents(credentials) {
    return Api().post("session/", credentials);
    }
};
