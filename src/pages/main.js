import styled from "styled-components";
import Template from "../components/template";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  loadPeople,
  goodPeopleAxios,
  goodPeople,
  badPeople,
  badPeopleAxios,
} from "../modules/people";
import { useParams } from "react-router-dom";
import { loadPeopleAxios } from "../modules/people";
import { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
function Main() {
  const person = useSelector((state) => state.people.users);
  // console.log(person.users);
  const [update, setUpdate] = useState([]);
  const dispatch = useDispatch();
  const [view, setView] = useState(true);

  const [select, setSelect] = useState(false);
  React.useEffect(() => {
    dispatch(loadPeopleAxios());
  }, []);

  React.useEffect(() => {
    setUpdate(person);
  }, [person]);

  const onClickLike = async (userId, likedOrNot) => {
    await dispatch(goodPeopleAxios(userId, likedOrNot))
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(goodPeople(userId, likedOrNot));
  };

  const onClickBad = (userId, likedOrNot) => {
    setView((prev) => !prev);
    console.log(userId, likedOrNot);

    dispatch(badPeopleAxios(userId, likedOrNot));
  };
  const img = update.length > 0 ? update?.users[0].imageUrl : "";
  return (
    person && (
      <Template>
        <Div>
          (
          <>
            {view ? (
              <OneCard
                id="oneCard"
                style={{
                  zIndex: view ? 0 : 1,
                  backgroundImage: `url(${img})`,
                }}
              ></OneCard>
            ) : (
              <TwoCard
                id="twoCard"
                style={{
                  zIndex: view ? 1 : 0,
                  // backgroundImage: `url(${update.users[1].imageUrl})`,
                }}
              ></TwoCard>
            )}
          </>
          )
        </Div>
        <ButtonDiv>
          <ButtomOne
            id="bad"
            onClick={() => {
              onClickBad(person.users[0]._id, false);
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              style={{ color: "#fe5065" }}
            />
          </ButtomOne>
          <ButtomTwo
            id="like"
            onClick={async () => {
              onClickLike(person.users[0]._id, true);
              setView((prev) => !prev);
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

const PicFrams = keyframes`
  0% {
    transform:scale(1)
  }
  100% {
  transform:scale(0)
  }
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
const CardFade = keyframes`
  from {
		transform: translate(0, 0);
	}
	to {
		transform: translate(700px, 200px);
   
	}
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

  /* overflow: hidden; */
  /* border-radius: 20px;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3); */
  //animation
  /* animation: ${CardFade} 1s ease; */
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
  /* overflow: hidden; */
  border-radius: 20px;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
  animation: ${CardFade} 0.5s ease;
  /* animation: ${PicFrams} 0.1s ease; */
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
