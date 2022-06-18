import styled from "styled-components";

const LoginHeader = () => {
  return (
    <Container>
      <Logo src="https://uploads-ssl.webflow.com/619d152dea16aa3c8cc54252/61f0557e8b4cb9af92a19953_wordmark-R-tinder-coral-RGB%201.png" />
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
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 350px) {
    top: 20%;
    width: 40%;
  }
`;

export default LoginHeader;
