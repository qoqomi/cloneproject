import styled from "styled-components";
import Template from "../components/template";

function Main() {
  return (
    <Template>
      <Div>
        <OneCard
          style={{
            backgroundImage: `url("https://p4.wallpaperbetter.com/wallpaper/817/916/889/falcon-9-rocket-4k-high-definition-wallpaper-preview.jpg")`,
          }}
        >
          <H3>이름</H3>
          <H4>나이</H4>
        </OneCard>
        <TwoCard
          style={{
            backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc7vUezLJbElOtP19-xjeLpuFwMhw92S6Y6g&usqp=CAU")`,
          }}
        >
          <H3>이름</H3>
          <H4>나이</H4>
        </TwoCard>
      </Div>
    </Template>
  );
}
const Div = styled.div`
  width: 500px;
  max-width: 85vw;
  height: 75vh;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
  //카드 부모
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
`;
const OneCard = styled.div`
  //자식
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
  z-index: -1;
`;
const TwoCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const H3 = styled.h3`
  font-size: 24px;
  margin-top: -20px;
  z-index: 1;
  position: fixed;
  bottom: 0;
  margin-bottom: 120px;
  margin-left: 20px;
  font-weight: bold;

  color: white;
`;
const H4 = styled.h4`
  font-size: 20px;
  margin-top: -20px;
  z-index: 1;
  position: fixed;
  bottom: 0;
  margin-bottom: 120px;
  margin-left: 67px;

  color: white;
`;
export default Main;
