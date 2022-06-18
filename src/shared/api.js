import axios from "axios";

const imgApi = axios.create({
  baseURL: " http://localhost:5003/",
  headers: {
    "content-type": "multipart/form-data",
  },
});
const api = axios.create({
  baseURL: "http://localhost:5003/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  if (accessToken !== undefined) {
    config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export const apis = {
  // article
  add: (contents) => api.post("/api/articles", contents),
  // user
  login: (userEmail, password) =>
    api.post("/user/login", { userEmail: userEmail, password: password }),

  signup: (frm) => imgApi.post("/login", frm),
};
