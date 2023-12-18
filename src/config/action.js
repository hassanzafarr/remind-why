import { baseURL } from "./config";
import axios from "axios";

const getAuthToken = () => {
  const userData = JSON.parse(localStorage.getItem("token"));

  return userData;
};

export const Action = axios.create({
  baseURL,
});

Action.interceptors.request.use(function (config) {
  const token = getAuthToken();

  config.headers.Authorization = token;
  return config;
});

Action.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response, "error.response");
    if (error.response && error.response.status === 401) {
      console.log("401 error");
    }
    return Promise.reject(error);
  }
);
