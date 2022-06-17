import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo src="https://uploads-ssl.webflow.com/619d152dea16aa3c8cc54252/61f0557e8b4cb9af92a19953_wordmark-R-tinder-coral-RGB%201.png" />
      <ProfileBtn
        onClick={() => {
          navigate("/mypage");
        }}
      >
        프로필
      </ProfileBtn>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  max-width: 500px;
  height: 50px;
  margin: auto;
  background-color: white;
  position: relative;
`;

const Logo = styled.img`
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProfileBtn = styled.button`
  float: right;
  margin-right: 15px;
  background-color: #fd4f68;
  color: white;
  border: none;
  border-radius: 10px;
`;

export default Header;
