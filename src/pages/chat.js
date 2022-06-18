import React from "react";
import Template from "../components/template";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();
  const [inputCurrent, setInputCurrent] = React.useState("");

  const chatlist = [
    {
      me: false,
      message: "안녕하세요!",
    },
    {
      me: false,
      message: "저는 아이유라고 해요.",
    },
    {
      me: true,
      message: "반가워요!",
    },
    {
      me: true,
      message: "저는 김현빈이라고 해요.",
    },
    {
      me: false,
      message:
        "청담동에 살고 있고, 직업은 가수이자 배우예요. 취미로는 작곡을 하고 있어요. 반가워요. 잘 부탁드려요.",
    },
    {
      me: true,
      message:
        "안산에 살고 있고, 항해99를 하고 있어요. 취미는 엄청 다양한데 요즘은 매일 코딩만 하고 있어요 ㅠㅠㅠ",
    },
    {
      me: false,
      message: "아 진짜요?",
    },
    {
      me: false,
      message: "아 진짜요?",
    },
    {
      me: false,
      message: "아 진짜요?",
    },
    {
      me: false,
      message: "아 진짜요?",
    },
  ];

  const changeInputState = (e) => {
    setInputCurrent(e.target.value);
  };

  const sendMessage = () => {
    alert("메시지를 보냈습니다! - " + inputCurrent);
  };

  return (
    <Template>
      <ChatListBtn
        onClick={() => {
          navigate("/chatlist");
        }}
      >
        ←
      </ChatListBtn>
      <ChatHeader>
        <ProfileCover>
          <ProfileImg src="https://newsimg.hankookilbo.com/cms/articlerelease/2021/05/17/b41ab909-e0e2-40e8-a36a-4bae809a9024.jpg" />
          <NameCover>
            <Name>아이유</Name>
          </NameCover>
        </ProfileCover>
        <HeaderLine />
      </ChatHeader>
      <ChatArea>
        {chatlist.map((v, i) => {
          return v.me ? (
            <ChatCoverMe>
              <ChattingCoverMe>
                <Chatting>{v.message}</Chatting>
              </ChattingCoverMe>
            </ChatCoverMe>
          ) : (
            <ChatCoverYou>
              <ChatProfileCover>
                <ChatProfileImg src="https://newsimg.hankookilbo.com/cms/articlerelease/2021/05/17/b41ab909-e0e2-40e8-a36a-4bae809a9024.jpg" />
              </ChatProfileCover>
              <ChattingCoverYou>
                <Chatting>{v.message}</Chatting>
              </ChattingCoverYou>
            </ChatCoverYou>
          );
        })}
      </ChatArea>
      <MessageCover>
        <MessageInput onChange={changeInputState} />
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
  height: calc(100vh - 240px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ChatCoverYou = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ChatCoverMe = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: right;
  margin-top: 10px;
  margin-bottom: 10px;
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
  background-color: deepskyblue;
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
  color: ${(props) => (props.inputValue ? "royalblue" : "#aaa")};
  font-weight: ${(props) => (props.inputValue ? "bold" : "normal")};
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(0%, -50%);
`;

export default Chat;
