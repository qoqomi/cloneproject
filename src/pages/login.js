import LoginTemplate from "../components/loginTemplate";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginAxios } from "../modules/user";
import { useSelector } from "react-redux";

function Login() {
  const person = useSelector((state) => state.people.persons);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const [error, setError] = useState("");

  const loginFB = async () => {
    try {
      await dispatch(
        loginAxios(usernameRef.current.value, passwordRef.current.value)
      ).then((success) => {
        navigate("/main");
        console.log(success);
        if (success === true) {
          alert("로그인되었습니다!");
        } else {
          // document.getElementById("LoginBtn").disabled = false;
        }
      });
    } catch (err) {
      console.log(err);
    }

    //await
  };

  return (
    <LoginTemplate>
      <Form>
        <LOG
          required
          name="email"
          type="email"
          placeholder="Email"
          ref={usernameRef}
        />
        <LOG
          required
          name="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />

        <Button onClick={loginFB}>Login</Button>

        <Next
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Next>
      </Form>
    </LoginTemplate>
  );
}
const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LOG = styled.input`
  border: none;
  border-radius: 30px;
  padding: 15px 15px;
  margin-bottom: 25px;
  font-size: 18px;
  outline: 0;
  width: 20em;

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
export default Login;
