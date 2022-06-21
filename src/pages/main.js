import styled from "styled-components";
import Template from "../components/template";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadPeople } from "../modules/people";
import { useParams } from "react-router-dom";
import { loadPeopleAxios } from "../modules/people";
import { keyframes } from "styled-components";
function Main() {
  const person = useSelector((state) => state.people.users.users);
  const [update, setUpdate] = useState([]);
  const dispatch = useDispatch();
  const [view, setView] = useState(true);

  React.useEffect(() => {
    dispatch(loadPeopleAxios());
    setUpdate(person);
  }, []);

  console.log(person);
  const onClickView = () => {
    setView((prev) => !prev);
  };
  return (
    <Template>
      <Div>
        {person && (
          <>
            {view ? (
              <OneCard
                style={{
                  backgroundImage: `url(${person[0].imageUrl})`,
                }}
              >
                <H3>{person && person[0].userName}</H3>
                <H4>{person && person[0].userAge}</H4>
              </OneCard>
            ) : (
              <TwoCard
                style={{
                  backgroundImage: `url(${person[1].imageUrl})`,
                }}
              >
                <H3>{person && person[1].userName}</H3>
                <H4>{person && person[1].userAge}</H4>
              </TwoCard>
            )}
          </>
        )}
      </Div>
      <ButtonDiv>
        <ButtomOne onClick={onClickView}>싫어요</ButtomOne>
        <ButtomTwo onClick={onClickView}>좋아요</ButtomTwo>
      </ButtonDiv>
    </Template>
  );
}
const Div = styled.div`
  width: 500px;
  max-width: 85vw;
  height: 500px;
  /* height: 75vh; */

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
  position: relative;
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
const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 50px;
  justify-content: space-around;
`;

const ButtomOne = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid #fe5065;
  background-color: transparent;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
`;

const ButtomTwo = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid #25eccb;
  background-color: transparent;
`;

export default Main;
