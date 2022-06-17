import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  if (accessToken !== undefined) {
    config.headers.common["token"] = `${accessToken}`;
  }
  return config;
});

export const apis = {
  // article
  add: (contents) => api.post("/api/articles", contents),

  // user
  login: (id, pw) => api.post("/user/login", { username: id, password: pw }),
};
