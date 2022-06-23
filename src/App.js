import React from "react";
import Router from "./components/router";
import GlobalStyles from "./components/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { checkUserValidation } from "./modules/user";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.userInfo.is_login);

  React.useEffect(() => {
    if (isLogin === false) {
      dispatch(checkUserValidation());
    }
  }, [isLogin]);

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
