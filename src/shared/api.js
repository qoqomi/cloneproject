import axios from "axios";

const imgApi = axios.create({
  baseURL: "http://15.165.160.107/",
  headers: {
    "content-type": "multipart/form-data",
  },
});
const api = axios.create({
  baseURL: "http://15.165.160.107/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

const chatApi = axios.create({
  baseURL: "http://sparta-swan.shop/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = `${localStorage.getItem("token")}`;

  //  {
  //   authorization: `Bearer ${localStorage.getItem("token")}`,
  // };

  if (accessToken !== undefined) {
    config.headers.common["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

imgApi.interceptors.request.use(function (config) {
  const accessToken = `${localStorage.getItem("token")}`;
  if (accessToken !== undefined) {
    config.headers.common["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

chatApi.interceptors.request.use(function (config) {
  const accessToken = `${localStorage.getItem("token")}`;
  if (accessToken !== undefined) {
    config.headers.common["token"] = `Bearer ${accessToken}`;
  }
  return config;
});

//apis body

export const apis = {
  // people
  selectGood: (userId, select) =>
    api.post("/api/recommends/select", { selectId: userId, select: select }),

  selectBad: (userId, select) =>
    api.post("/api/recommends/select", { selectId: userId, select: select }),

  // user
  login: (userEmail, password) =>
    api.post("/api/users/login", { userEmail: userEmail, password: password }),

  signup: (frm) => imgApi.post("/api/users/signup", frm),

  load: () => api.get("/api/recommends"),

  myInfo: () => api.get("/api/users/personal"),
  modifyMyInfo: (frm) => api.put("/api/users/modify", frm),
  checkUser: () => api.get("/api/users/auth"),

  // chat
  loadChatList: (id) => chatApi.get(`/${id}`),
  getRoomId: (user, other) =>
    chatApi.post("/room", {
      user: user,
      other: other,
    }),
  getInitialChat: (roomId) => chatApi.get(`/chatlist/${roomId}`),
};
