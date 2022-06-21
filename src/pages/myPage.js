import React from "react";
import LoginTemplate from "../components/loginTemplate";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getMyInfoAxios, cleanMyInfo } from "../modules/myInfo";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myInfo = useSelector((state) => state.myInfo.myInfo);

  React.useEffect(() => {
    dispatch(getMyInfoAxios());

    return function cleanup() {
      dispatch(cleanMyInfo());
    };
  }, []);

  const checkData = [
    { id: 1, name: "PC방" },
    { id: 2, name: "산책" },
    { id: 3, name: "카페" },
    { id: 4, name: "반려동물" },
    { id: 5, name: "드라마" },
    { id: 6, name: "맛집" },
    { id: 7, name: "전시회" },
    { id: 8, name: "만화" },
    { id: 9, name: "방탈출" },
    { id: 10, name: "캠핑" },
    { id: 11, name: "쇼핑" },
    { id: 12, name: "스포츠" },
    { id: 13, name: "인스타그램" },
    { id: 14, name: "언어교환" },
    { id: 15, name: "영화" },
    { id: 16, name: "독서" },
    { id: 17, name: "노래방" },
    { id: 18, name: "요리" },
    { id: 19, name: "술" },
    { id: 20, name: "패션" },
    { id: 21, name: "여행" },
    { id: 22, name: "등산" },
    { id: 23, name: "사진" },
    { id: 24, name: "봉사" },
  ];

  const checkHandler = ({ target }) => {
    const myElement = document.getElementById(`${target.value}label`);
    if (target.checked) {
      myElement.style.border = "2px solid #ff3774";
    } else {
      myElement.style.border = "1px solid #ddd";
    }
  };

  return (
    <LoginTemplate>
      <GoBackBtn
        onClick={() => {
          navigate(-1);
        }}
      >
        ←
      </GoBackBtn>
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
      <UserIntroInput defaultValue={myInfo.userIntro} />
      <BoldTitle>직장/학교</BoldTitle>
      <UserWorkPlaceInput defaultValue={myInfo.workPlace} />
      <BoldTitle>카테고리</BoldTitle>
      <CheckForm>
        {checkData.map((v, i) => {
          return (
            <CheckBoxLabel key={i} for={v.name} id={v.name + "label"}>
              <CheckBoxInput
                type="checkbox"
                id={v.name}
                value={v.name}
                onChange={(e) => {
                  checkHandler(e);
                }}
              />
              {v.name}
            </CheckBoxLabel>
          );
        })}
      </CheckForm>
      <ChangeBtn>프로필 변경</ChangeBtn>
    </LoginTemplate>
  );
}

const GoBackBtn = styled.button`
  position: absolute;
  top: 20px;
  left: calc(50vw - 230px);
  width: 30px;
  height: 30px;
  @media screen and (max-width: 500px) {
    left: 20px;
  }
  color: white;
  background-color: #fd4f68;
  border: none;
  border-radius: 20px;
`;

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
  margin: 20px;
  font-weight: bold;
  font-size: 20px;
`;

const UserEmail = styled.p`
  text-align: center;
  margin: 0px auto 20px auto;
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

const CheckBoxLabel = styled.label`
  display: inline-block;
  width: 90px;
  margin: 5px;
  height: 30px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #ddd;
  line-height: 25px;
  cursor: pointer;
  ${(props) => (props.checked ? "salmon" : "papayawhip")}
`;

const ChangeBtn = styled.button`
  font-size: 18px;
  border-radius: 50px;
  margin: 15px auto;
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

export default MyPage;
