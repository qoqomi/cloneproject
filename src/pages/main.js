import styled from "styled-components";
import Template from "../components/template";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  goodPeopleAxios,
  badPeopleAxios,
  loadPeopleAxios,
} from "../modules/people";
import Detail from "./detail";
import { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { checkUserValidation } from "../modules/user";

function Main() {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.people.users);
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.user.userInfo.is_login);

  React.useEffect(() => {
    if (isLogin === null) {
      dispatch(checkUserValidation());
      return;
    }
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  const [view, setView] = useState(true);
  const [lastPersonLike, setLastPersonLike] = useState(false);

  useEffect(() => {
    dispatch(loadPeopleAxios());
  }, []);
  const [modal, setModal] = useState(false);

  const onClickLike = async (userId, likedOrNot) => {
    document.getElementById("like").disable = true;
    if (person[1] === undefined || person[1]._id === 404) {
      alert("더 이상 보여줄 사람이 없습니다!");
      document.getElementById("like").disable = false;
      return;
    }
    await dispatch(goodPeopleAxios(userId, likedOrNot)).then(() => {
      document.getElementById("like").disable = false;
    });
  };

  const onClickBad = async (userId, likedOrNot) => {
    document.getElementById("like").disable = true;
    if (person[1] === undefined || person[1]._id === "404") {
      alert("더 이상 보여줄 사람이 없습니다!");
      document.getElementById("like").disable = false;
      return;
    }
    await dispatch(badPeopleAxios(userId, likedOrNot)).then(() => {
      document.getElementById("like").disable = false;
    });
  };

  return (
    person &&
    (modal === true ? (
      <Detail close={setModal} />
    ) : (
      <Template>
        <Div>
          <OneCard
            id="oneCard"
            style={{
              backgroundImage: `url(${
                person.length > 0 ? person[0].imageUrl : ""
              })`,
            }}
            noMore={person.length > 0 ? person[0]._id === "404" : false}
          >
            <NameCover>
              <H3 noMore={person.length > 0 ? person[0]._id === "404" : false}>
                {person.length > 0 ? person[0].userName : ""}
              </H3>
              <H4 noMore={person.length > 0 ? person[0]._id === "404" : false}>
                {person.length > 0 ? person[0].userAge : ""}
              </H4>
            </NameCover>
          </OneCard>
        </Div>
        <ButtonDiv>
          <ButtomOne
            id="bad"
            onClick={() => {
              onClickBad(person[0]._id, false);
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size="2x"
              style={{ color: "#fe5065" }}
            />
          </ButtomOne>

          <ButtomMypage
            id="mypage"
            onClick={() => {
              setModal(true);
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
              onClickLike(person[0]._id, true);
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
    ))
  );
}

const Div = styled.div`
  width: 500px;
  max-width: 85vw;
  height: 500px;

  background-size: cover;
  background-position: center;

  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
`;

const OneCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: ${(props) => (props.noMore ? "" : "cover")};
  background-position: center;
`;

const NameCover = styled.div`
  position: absolute;
  left: 20px;
  margin-top: 600px;
  bottom: 20px;
  display: flex;
`;

const H3 = styled.h3`
  font-size: 24px;
  font-weight: ${(props) => (props.noMore ? "" : "bold")};
  color: ${(props) => (props.noMore ? "black" : "white")};
  text-shadow: 1px 1px 1px #000;
`;
const H4 = styled.h4`
  font-size: 25px;
  color: ${(props) => (props.noMore ? "black" : "white")};
  text-shadow: 1px 1px 1px #000;
  margin-left: 15px;
`;
const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
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
