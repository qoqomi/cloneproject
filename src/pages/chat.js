import React from "react";
import Template from "../components/template";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { initialChatAxios, chatSocket, clearChat } from "../modules/chatInfo";
import { checkUserValidation } from "../modules/user";
import io from "socket.io-client";
import axios from "axios";

function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputCurrent = React.useRef(null);
  const location = useLocation();
  const params = useParams();
  console.log(params.roomId);

  const otherInfo = useSelector((state) => state.chatInfo.otherInfo);
  const isLogin = useSelector((state) => state.user.userInfo.is_login);

  React.useEffect(() => {
    if (isLogin === null) {
      console.log("null");
      dispatch(checkUserValidation());
      return;
    }
    if (!isLogin) {
      console.log("false");
      navigate("/");
    }
  }, [isLogin]);

  const id = useSelector((state) => state.user.userInfo.userEmail);
  let socket = io.connect("http://sparta-swan.shop/chat", {
    path: "/socket.io",
  });

  React.useEffect(() => {
    socket.emit("newRoomId", params.roomId);
    dispatch(initialChatAxios(params.roomId));
    // socket.on("join", params.roomId);
  }, []);

  React.useEffect(() => {
    socket.on("chat", (data) => {
      dispatch(chatSocket(data));
    });
  }, [socket]);

  React.useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
        dispatch(clearChat());
      }
    };
  }, []);

  const chatlist = useSelector((state) => state.chatInfo.chat);

  const sendMessage = () => {
    if (inputCurrent.current.value === "" || null) {
      return false;
    }
    const chatData = {
      chat: inputCurrent.current.value,
      userEmail: id,
    };
    axios
      .post(`http://sparta-swan.shop/room/${params.roomId}/chat`, chatData)
      .then(() => {
        document.getElementById("messageInput").value = null;
      });
  };

  const onKeyPressChat = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Template>
      <ChatListBtn
        onClick={() => {
          navigate("/chatlist");
          socket.on("disconnect");
        }}
      >
        ←
      </ChatListBtn>
      <ChatHeader>
        <ProfileCover>
          <ProfileImg src={"http://15.165.160.107/" + otherInfo.imageUrl} />
          <NameCover>
            <Name>{otherInfo.name}</Name>
          </NameCover>
        </ProfileCover>
        <HeaderLine />
      </ChatHeader>
      <ChatArea>
        {chatlist.map((v, i) => {
          return v.userEmail === id ? (
            <ChatCoverMe key={"chat" + i}>
              <ChattingCoverMe>
                <Chatting>{v.chat}</Chatting>
              </ChattingCoverMe>
            </ChatCoverMe>
          ) : (
            <ChatCoverYou key={"chat" + i}>
              <ChatProfileCover>
                <ChatProfileImg
                  src={"http://15.165.160.107/" + otherInfo.imageUrl}
                />
              </ChatProfileCover>
              <ChattingCoverYou>
                <Chatting>{v.chat}</Chatting>
              </ChattingCoverYou>
            </ChatCoverYou>
          );
          // return (
          //   <ChatCoverMe key={"chat" + i}>
          //     <ChattingCoverMe>
          //       <Chatting>{v.chat}</Chatting>
          //     </ChattingCoverMe>
          //   </ChatCoverMe>
          // );
        })}
      </ChatArea>
      <MessageCover>
        <MessageInput
          id="messageInput"
          ref={inputCurrent}
          onKeyPress={onKeyPressChat}
        />
        <MessageBtn
          inputValue={inputCurrent === "" ? false : true}
          onClick={sendMessage}
        >
          보내기
        </MessageBtn>
      </MessageCover>
    </Template>
  );
}

const ChatListBtn = styled.button`
  position: absolute;
  top: 20px;
  left: calc(50vw - 230px);
  width: 30px;
  height: 30px;
  @media screen and (max-width: 500px) {
    left: 20px;
  }
  color: white;
  background-color: #fd4f68;
  border: none;
  border-radius: 20px;
`;

const ChatHeader = styled.section`
  width: 100%;
  height: 50px;
`;

const ChatArea = styled.section`
  width: 100%;
  height: calc(100vh - 250px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 10px;
`;

const ChatCoverYou = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  margin-top: 10px;
  word-break: break-all;
`;

const ChatCoverMe = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: right;
  margin-top: 10px;
  margin-bottom: 10px;
  word-break: break-all;
`;

const ProfileCover = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

const NameCover = styled.div`
  margin-left: 20px;
`;

const Name = styled.p`
  font-weight: bold;
`;

const HeaderLine = styled.hr`
  background-color: #ddd;
`;

const ChatProfileCover = styled.div`
  margin: 5px 0px 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: initial;
  justify-content: left;
`;

const ChatProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
`;

const ChattingCoverYou = styled.div`
  margin-left: 10px;
  max-width: 60%;
  border: none;
  border-radius: 10px;
  background-color: #ddd;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding: 10px;
  height: fit-content;
`;

const Chatting = styled.p`
  line-height: 150%;
`;

const ChattingCoverMe = styled.div`
  margin-right: 10px;
  max-width: 60%;
  border: none;
  border-radius: 10px;
  background-color: deepskyblue;
  color: white;
  padding: 10px;
  height: fit-content;
  float: right;
`;

const MessageCover = styled.section`
  width: 90%;
  height: 30px;
  margin: 0px 5px 20px auto;
  position: relative;
  border: 2px solid black;
  border-radius: 20px;
  float: right;
`;

const MessageInput = styled.input`
  position: absolute;
  top: 50%;
  left: 2px;
  width: calc(100% - 67px);
  border: transparent;
  background-color: transparent;
  transform: translate(0%, -50%);
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const MessageBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 50px;
  height: 30px;
  width: fit-content;
  color: royalblue;
  font-weight: ${(props) => (props.inputValue ? "bold" : "normal")};
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(0%, -50%);
`;

export default Chat;
