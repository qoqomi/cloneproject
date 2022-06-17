import styled from "styled-components";
import Header from "./header";
import Footer from "./footer";

const Template = ({ children }) => {
  return (
    <Container>
      <Background>
        <Header />
        <Section>{children}</Section>
        <Footer />
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
  min-height: calc(100vh - 140px);
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;
export default Template;
