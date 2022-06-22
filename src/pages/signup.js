import LoginTemplate from "../components/loginTemplate";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userInfo } from "../modules/user.js";
function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");

  const [emailError, setEmailError] = useState(false);
  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "addEmail") {
      setUserEmail(value);
    } else if (name === "addPassword") {
      setPassword(value);
    } else if (name === "passwordCheck") {
      setPasswordCheck(value);
    } else if (name === "name") {
      setUserName(value);
    } else if (name === "age") {
      setUserAge(value);
    }
  };
  //유효성검사 추가중
  // const onChangeEmail = (e) => {
  //   const emailRegex =
  //     /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  //   if (!e.target.value || emailRegex.test(e.target.value))
  //     setEmailError(false);
  //   else setEmailError(true);
  //   setUserEmail(e.target.value);
  //   console.log(userEmail);
  // };

  window.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      signupOnClick();
    }
  });

  const signupOnClick = async () => {
    if (
      userEmail === "" ||
      password === "" ||
      passwordCheck === "" ||
      userName === "" ||
      userAge === "" ||
      userEmail === " " ||
      password === " " ||
      passwordCheck === " " ||
      userName === " " ||
      userAge === " " ||
      userEmail === null ||
      password === null ||
      passwordCheck === null ||
      userName === null ||
      userAge === null
    ) {
      alert("빈칸을 모두 채워주세요!");
      return false;
    }
    document.getElementById("SignUpBtn").disabled = true;

    dispatch(
      userInfo({
        userEmail: userEmail,
        password: password,
        passwordCheck: passwordCheck,
        userName: userName,
        userAge: userAge,
      })
    );
    navigate("/signupImg");
  };

  return (
    <LoginTemplate>
      <Form>
        <Div>
          <LOG
            required
            name="addEmail"
            type="email"
            placeholder="아이디"
            value={userEmail}
            onChange={onChange}
            maxLength={20}
          />
          {emailError && <ValiDiv>이메일 형식에 맞지 않습니다.</ValiDiv>}
        </Div>
        <Div>
          <LOG
            required
            name="addPassword"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChange}
          />
          {emailError && (
            <ValiDiv>
              숫자, 영어, 특수문자 조합 8~16글자로 입력해주세요{" "}
            </ValiDiv>
          )}
        </Div>
        <Div>
          <LOG
            required
            name="passwordCheck"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={onChange}
          />
        </Div>
        <Div>
          <LOG
            required
            name="name"
            type="text"
            placeholder="이름"
            value={userName}
            onChange={onChange}
          />
        </Div>
        <Div>
          <LOG
            required
            name="age"
            type="text"
            placeholder="나이"
            value={userAge}
            onChange={onChange}
          />
        </Div>
        <ButtomDiv>
          <Button color="#fccb4f" id="SignUpBtn" onClick={signupOnClick}>
            Next
          </Button>
          <Next
            onClick={() => {
              navigate("/login");
            }}
            color="#212529"
          >
            Back
          </Next>
        </ButtomDiv>
      </Form>
    </LoginTemplate>
  );
}
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Div = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const LOG = styled.input`
  border: none;
  border-radius: 30px;
  padding: 15px 20px;
  font-size: 15px;
  outline: 0;
  width: 75%;

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
const ValiDiv = styled.div`
  color: red;
  margin-top: 10px;
`;
const ButtomDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const Button = styled.button`
  font-size: 18px;
  border-radius: 50px;
  margin-bottom: 15px;

  border: none;
  padding: 18px;
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
const Next = styled.button`
  font-size: 18px;
  border-radius: 50px;
  margin-bottom: 15px;

  border: 1px solid black;
  padding: 18px;

  letter-spacing: 2px;
  background-color: transparent;
  color: black;
  :hover {
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.19);
  }
`;

export default SignUp;
