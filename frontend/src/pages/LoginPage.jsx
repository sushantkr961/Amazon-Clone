import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userAction";

const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post("/api/users/login", {
    email,
    password,
    doNotLogout,
  });
  // after successfull login and checkbox is checked store it in localstorage otherwise session storage
  if (data.userLoggedIn.doNotLogout) {
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  }else{
    sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  }

  return data;
};

const LoginPage = () => {
  const reduxDispatch = useDispatch();

  return (
    <LoginPageComponent
      loginUserApiRequest={loginUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default LoginPage;
