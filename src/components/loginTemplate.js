import styled from "styled-components";
import LoginHeader from "./loginHeader";

const LoginTemplate = ({ children }) => {
  return (
    <Container>
      <Background>
        <LoginHeader />
        <Section>{children}</Section>
      </Background>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  justify-content: center;
`;

const Background = styled.div`
  width: 100%;
  max-width: 500px;
  margin: auto;
  background-color: white;
  height: 100vh;
  padding-top: 30px;
  padding-bottom: 10px;
`;

const Section = styled.section`
  min-height: calc(100vh - 90px);
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;
export default LoginTemplate;
