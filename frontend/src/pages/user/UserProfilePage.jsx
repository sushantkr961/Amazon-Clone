import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userAction";
import UserProfilePageComponent from "./components/UserProfilePageComponent";

const updateUserApiRequest = async (
  name,
  lastName,
  phoneNumber,
  address,
  country,
  pinCode,
  city,
  state,
  password
) => {
  const { data } = await axios.put("/api/users/profile", {
    name,
    lastName,
    phoneNumber,
    address,
    country,
    pinCode,
    city,
    state,
    password,
  });
  return data;
};

const fetchUser = async (id) => {
  const { data } = await axios.get("/api/users/profile/" + id);
  return data;
};

const UserProfilePage = () => {
  const reduxDispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  return (
    <UserProfilePageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      userInfoFromRedux={userInfo}
      setReduxUserState={setReduxUserState}
      reduxDispatch={reduxDispatch}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
};

export default UserProfilePage;
