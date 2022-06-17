import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <MainBtn
        onClick={() => {
          navigate("/main");
        }}
      >
        메인
      </MainBtn>
      <ChatBtn
        onClick={() => {
          navigate("/chatlist");
        }}
      >
        채팅
      </ChatBtn>
    </Container>
  );
};

const Container = styled.footer`
  width: 100%;
  max-width: 500px;
  height: 50px;
  justify-content: center;
  margin: auto;
  background-color: white;
`;

const MainBtn = styled.button`
  width: 50%;
  height: 100%;
  background-color: #fd4f68;
  color: white;
  border-right: 1px solid white;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-radius: 15px;
`;

const ChatBtn = styled.button`
  width: 50%;
  height: 100%;
  background-color: #fd4f68;
  color: white;
  border: none;
  border-radius: 15px;
`;

export default Footer;
