import Template from "../components/template";
import styled from "styled-components";

function ChatList() {
  return <Template></Template>;
}

const ChatCover = styled.section`
  width: 100%;
  height: 50px;
`;

const ProfileCover = styled.div`
  margin-left: 20px;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
`;

export default ChatList;
