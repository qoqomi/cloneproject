import React from "react";
import { Route, Routes } from "react-router-dom";

import SignUp from "../pages/signup";
import Login from "../pages/login";
import Main from "../pages/main";
import ChatList from "../pages/chatList";
import Chat from "../pages/chat";
import MyPage from "../pages/myPage";
import SignupImg from "../pages/signupImg";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupImg" element={<SignupImg />} />
        <Route path="/main" element={<Main />} />

        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/room/:roomId" element={<Chat />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}
