import styled from "styled-components";
import Template from "../components/template";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadPeople } from "../modules/people";
import { useParams } from "react-router-dom";
import { loadPeopleAxios } from "../modules/people";
function Main() {
  const person = useSelector((state) => state.people.persons);
  const dispatch = useDispatch();
  const [view, setView] = useState(true);

  React.useEffect(() => {
    dispatch(loadPeopleAxios(person));
  }, [person]);

  const onClickView = () => {
    setView((prev) => !prev);
  };
  return (
    <Template>
      <Div>
        {view ? (
          <OneCard
            style={{
              backgroundImage: `url(${person[0].profileImage})`,
            }}
          >
            <H3>{person[0].userName}</H3>
            <H4>{person[0].userAge}</H4>
          </OneCard>
        ) : (
          <TwoCard
            style={{
              backgroundImage: `url(${person[1].profileImage})`,
            }}
          >
            <H3>{person[1].userName}</H3>
            <H4>{person[1].userAge}</H4>
          </TwoCard>
        )}
      </Div>
      <button onClick={onClickView}>싫어요</button>
      <button onClick={onClickView}>좋아요</button>
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
`;
export default Main;
