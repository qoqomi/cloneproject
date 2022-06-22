import React, { useState } from "react";
import LoginTemplate from "../components/loginTemplate";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyInfoAxios,
  cleanMyInfo,
  modifyMyInfoAxios,
} from "../modules/myInfo";
import { useNavigate } from "react-router-dom";
import { apis } from "../shared/api";
import { categories } from "../shared/category";

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIntro = React.useRef(null);
  const workPlace = React.useRef(null);

  const reader = new FileReader();

  const myInfo = useSelector((state) => state.myInfo.myInfo);

  const [myPicUrl, setMyPicUrl] = useState("");
  const [imageState, setImageState] = useState(null);
  const [myCategory, setMyCategory] = useState([]);

  React.useEffect(() => {
    dispatch(getMyInfoAxios());

    return function cleanup() {
      dispatch(cleanMyInfo());
    };
  }, []);

  React.useEffect(() => {
    setMyPicUrl(myInfo.imageUrl);
    setMyCategory(myInfo.category);
  }, [myInfo]);

  const checkHandler = ({ target }) => {
    const myElement = document.getElementById(`${target.value}label`);
    if (target.checked) {
      myElement.style.border = "2px solid #ff3774";
      setMyCategory([...myCategory, target.value]);
    } else {
      myElement.style.border = "1px solid #ddd";
      const newCategory = myCategory.filter((word) => word !== target.value);
      setMyCategory(newCategory);
    }
  };

  const preview = (e) => {
    setImageState(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setMyPicUrl(reader.result);
        resolve();
      };
    });
  };

  const changeProfile = () => {
    console.log(userIntro.current.value, myCategory, workPlace.current.value);
    let frm = new FormData();
    frm.append("userIntro", userIntro.current.value);
    frm.append("category", JSON.stringify(myCategory));
    frm.append("imageUrl", imageState);
    frm.append("workPlace", workPlace.current.value);
    console.log(frm);
    dispatch(modifyMyInfoAxios(frm));
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
        <ProfileImg src={myPicUrl} />
        <ChangePhotoInput
          id="InputPhoto"
          type="file"
          accept="image/*"
          onChange={preview}
        />
        <label htmlFor="InputPhoto">사진 변경</label>
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
      <UserIntroInput defaultValue={myInfo.userIntro} ref={userIntro} />
      <BoldTitle>직장/학교</BoldTitle>
      <UserWorkPlaceInput defaultValue={myInfo.workPlace} ref={workPlace} />
      <BoldTitle>카테고리</BoldTitle>
      <CheckForm>
        {categories.map((v, i) => {
          return (
            <CheckBoxLabel key={i} htmlFor={v.name} id={v.name + "label"}>
              <CheckBoxInput
                type="checkbox"
                id={v.name}
                value={v.name}
                onChange={(e) => {
                  checkHandler(e);
                }}
                checked={myCategory.includes(v.name)}
              />
              {v.name}
            </CheckBoxLabel>
          );
        })}
      </CheckForm>
      <ChangeBtn
        onClick={() => {
          changeProfile();
        }}
      >
        프로필 변경
      </ChangeBtn>
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
  margin: 0px auto 15px auto;
`;

const ChangePhotoInput = styled.input`
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
  ::file-selector-button {
    display: none;
  }
  :hover {
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.19);
  }
  background: #f7f8f8; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff3774, #ff8146);
  background: linear-gradient(to right, #ff3774, #ff8146);
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
