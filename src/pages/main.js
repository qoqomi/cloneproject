import styled from "styled-components";
import Template from "../components/template";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { goodPeopleAxios, badPeopleAxios } from "../modules/people";

import { loadPeopleAxios } from "../modules/people";
import { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
function Main() {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.people.users);
  const navigate = useNavigate();
  const personId = person.length > 0 ? person[0]._id : "";
  const personImage = person.length > 0 ? person[0].imageUrl : "";

  const [view, setView] = useState(true);
  const [select, setSelect] = useState(false);
  console.log("personImage:", personImage);
  useEffect(() => {
    dispatch(loadPeopleAxios());
  }, []);

  const onClickLike = (userId, likedOrNot) => {
    // setView((prev) => !prev);
    dispatch(goodPeopleAxios(userId, likedOrNot));
  };

  const onClickBad = (userId, likedOrNot) => {
    // setView((prev) => !prev);
    console.log(view);

    dispatch(badPeopleAxios(userId, likedOrNot));
  };
  return (
    person && (
      <Template>
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

          {/* <TwoCard
            id="twoCard"
            style={{
              zIndex: view ? 0 : 1,
              backgroundImage: `url(${person.length > 0 ? personImage : ""})`,
            }}
          >
            <H3
              style={{
                zIndex: view ? 0 : 1,
              }}
            >
              {person.length > 0 ? person[1].userName : ""}
            </H3>
            <H4
              style={{
                zIndex: view ? 0 : 1,
              }}
            >
              {person.length > 0 ? person[1].userAge : ""}
            </H4>
          </TwoCard> */}
        </Div>
        <ButtonDiv>
          <ButtomOne
            id="bad"
            onClick={() => {
              onClickBad(personId, false);
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              style={{ color: "#fe5065" }}
            />
          </ButtomOne>

          <ButtomMypage
            id="like"
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              size="2x"
              style={{ color: "#36C9F6" }}
            />
          </ButtomMypage>

          <ButtomTwo
            id="like"
            onClick={async () => {
              onClickLike(personId, true);
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              size="2x"
              style={{ color: "#25eccb" }}
            />
          </ButtomTwo>
        </ButtonDiv>
      </Template>
    )
  );
}

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
// const TwoCard = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   left: 0;
//   top: 0;
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   /* overflow: hidden; */
//   border-radius: 20px;
//   box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
// `;

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
const boxFade = keyframes`
  0% {
    transform: none;
 
  }
  50% {
    transform: scale(1.3);
  }
  100% {
  transform: none;
  }
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
  background: #f7f8f8;

  cursor: pointer;
  &:hover {
    animation: ${boxFade} 1s 0.2s alternate;
  }
`;
const ButtomMypage = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid #36c9f6;
  background-color: transparent;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  background: #f7f8f8;

  cursor: pointer;
  &:hover {
    animation: ${boxFade} 1s 0.2s alternate;
  }
`;
const ButtomTwo = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid #25eccb;
  background-color: transparent;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  background: #f7f8f8;
  &:hover {
    animation: ${boxFade} 1s 0.2s alternate;
  }
`;

export default Main;
