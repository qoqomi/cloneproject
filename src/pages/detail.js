import styled from "styled-components";
import LoginTemplate from "../components/loginTemplate";
import { useSelector } from "react-redux";

function Detail(props) {
  const closeModal = () => {
    props.close(false);
  };

  const person = useSelector((state) => state.people.users);
  const personImage = person.length > 0 ? person[0].imageUrl : "";

  return (
    <LoginTemplate>
      <CloseButton onClick={closeModal}>닫기</CloseButton>
      <Div>
        <OneCard
          id="oneCard"
          style={{
            backgroundImage: `url(${person.length > 0 ? personImage : ""})`,
          }}
        >
          <H3>{person.length > 0 ? person[0].userName : ""}</H3>
          <H4>{person.length > 0 ? person[0].userAge : ""}</H4>
        </OneCard>
      </Div>
      <BoldTitle>자기소개</BoldTitle>
      <UserIntroP>{person[0].userIntro}</UserIntroP>
      <BoldTitle>직장/학교</BoldTitle>
      <UserWorkPlaceP>{person[0].workPlace}</UserWorkPlaceP>
      <BoldTitle>카테고리</BoldTitle>
      <CheckForm>
        {person[0].category.map((v, i) => {
          return (
            <CheckBoxCategroy key={i} id={v + "category"}>
              {v}
            </CheckBoxCategroy>
          );
        })}
      </CheckForm>
    </LoginTemplate>
  );
}

const CloseButton = styled.button`
  float: right;
  margin-right: 15px;
  background-color: #fd4f68;
  color: white;
  border: none;
  border-radius: 10px;
`;

const Div = styled.div`
  width: 500px;
  max-width: 85vw;
  height: 500px;
  //카드 부모
  background-size: cover;
  background-position: center;
  //
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
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
`;

const H3 = styled.h3`
  position: absolute;
  font-size: 24px;
  bottom: 20px;
  left: 20px;
  font-weight: bold;
  color: white;
`;
const H4 = styled.h4`
  position: absolute;
  font-size: 20px;
  bottom: 20px;
  left: 90px;
  color: white;
  margin-left: 10px;
`;

const BoldTitle = styled.p`
  text-align: center;
  margin: 20px;
  font-weight: bold;
  font-size: 20px;
`;

const UserIntroP = styled.p`
  border: none;
  border-radius: 30px;
  padding: 15px 15px;
  margin-bottom: 5px;
  font-size: 14px;
  outline: 0;
  width: 80vw;
  max-width: 400px;
  height: 120px;

  input.placeholder {
    text-align: center;
  }
  ::-webkit-input-placeholder {
    text-align: center;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    text-align: center;
  }

  :-ms-input-placeholder {
    text-align: center;
  }

  :not([type="submit"]) {
    border: 1px solid rgba(0, 0, 0, 0.2);
    transition: border-color 0.3s ease-in-out;
    :focus {
      border-color: #f34967;
    }
  }
`;

const UserWorkPlaceP = styled.p`
  border: none;
  border-radius: 30px;
  padding: 15px 15px;
  margin-bottom: 5px;
  font-size: 14px;
  outline: 0;
  width: 80vw;
  max-width: 400px;
  height: 40px;

  input.placeholder {
    text-align: center;
  }
  ::-webkit-input-placeholder {
    text-align: center;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    text-align: center;
  }

  :-ms-input-placeholder {
    text-align: center;
  }

  :not([type="submit"]) {
    border: 1px solid rgba(0, 0, 0, 0.2);
    transition: border-color 0.3s ease-in-out;
    :focus {
      border-color: #f34967;
    }
  }
`;

const CheckForm = styled.form`
  text-align: center;
`;

const CheckBoxInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const CheckBoxCategroy = styled.label`
  display: inline-block;
  width: 90px;
  margin: 5px;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  border: 2px solid #ff3774;
  /* border: ${(props) =>
    props.checkThis ? "2px solid #ff3774" : "1px solid #ddd"}; */
`;

export default Detail;
