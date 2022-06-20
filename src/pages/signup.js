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
      userAge === ""
    ) {
      alert("빈칸을 모두 채워주세요!");
      //아예 끝냄
      return false;
    }

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
        <LOG
          required
          name="addEmail"
          type="email"
          placeholder="아이디"
          value={userEmail}
          onChange={onChange}
        />
        <LOG
          required
          name="addPassword"
          type="text"
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
        />
        <LOG
          required
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={onChange}
        />
        <LOG
          required
          name="name"
          type="text"
          placeholder="이름"
          value={userName}
          onChange={onChange}
        />
        <LOG
          required
          name="age"
          type="text"
          placeholder="나이"
          value={userAge}
          onChange={onChange}
        />

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
      </Form>
    </LoginTemplate>
  );
}
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const LOG = styled.input`
  border: none;
  border-radius: 30px;
  padding: 15px 15px;
  margin-bottom: 15px;
  font-size: 18px;
  outline: 0;
  width: 20em;
  max-width: 85vw;

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
const Button = styled.button`
  font-size: 18px;
  border-radius: 50px;
  margin-bottom: 15px;

  border: none;
  padding: 18px;
  width: 20em;
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
  width: 20em;
  letter-spacing: 2px;
  background-color: transparent;
  color: black;
  :hover {
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.19);
  }
`;
export default SignUp;
