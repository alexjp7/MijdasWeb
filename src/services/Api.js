import axios from "axios";
//import store from "@/store";

//Creates a base api url request.

export default () => {
  return axios.create({
    baseURL: `http://127.0.0.1/api/`
  });
};
