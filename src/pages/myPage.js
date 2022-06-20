import React from "react";
import Template from "../components/template";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getMyInfoAxios, cleanMyInfo } from "../modules/myInfo";

function MyPage() {
  const dispatch = useDispatch();

  const myInfo = useSelector((state) => state.myInfo.myInfo);

  React.useEffect(() => {
    dispatch(getMyInfoAxios());

    return function cleanup() {
      dispatch(cleanMyInfo());
    };
  }, []);

  return (
    <Template>
      <Title>내 프로필</Title>
      <ProfileCover>
        <ProfileImg src={myInfo.imageUrl} />
        <BoldTitle>{myInfo.userName}</BoldTitle>
        <UserEmail>{myInfo.userEmail}</UserEmail>
      </ProfileCover>
      <LogoutBtn
        onClick={() => {
          localStorage.removeItem("token");
        }}
      >
        로그아웃
      </LogoutBtn>
      <BoldTitle>자기소개</BoldTitle>
      <UserIntroInput />
      <BoldTitle>직장/학교</BoldTitle>
      <UserWorkPlaceInput />
      <BoldTitle>카테고리</BoldTitle>
    </Template>
  );
}

const Title = styled.p`
  text-align: center;
  margin: 10px auto 20px auto;
  font-weight: bold;
  font-size: 20px;
`;

const ProfileCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 250px;
  max-width: 40vw;
  height: 250px;
  max-height: 40vw;
  justify-content: center;
  margin: 0px auto;
`;

const BoldTitle = styled.p`
  text-align: center;
  margin: 20px auto;
  font-weight: bold;
  font-size: 20px;
`;

const UserEmail = styled.p`
  text-align: center;
  margin: 20px auto;
  font-size: 15px;
`;

const LogoutBtn = styled.button`
  font-size: 18px;
  border-radius: 50px;
  margin-bottom: 5px;
  border: none;
  padding: 18px;
  width: 20em;
  max-width: 70%;
  letter-spacing: 2px;
  background-color: ${(props) => props.color};
  color: white;
  :hover {
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.19);
  }
  background: #f7f8f8; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff3774, #ff8146);
  background: linear-gradient(to right, #ff3774, #ff8146);
`;

const UserIntroInput = styled.textarea`
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

const UserWorkPlaceInput = styled.input`
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

export default MyPage;
