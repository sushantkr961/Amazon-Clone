import axios from "axios";
import UserProfilePageComponent from "./components/UserProfilePageComponent";

const UserProfilePage = () => {
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

  return (
    <UserProfilePageComponent updateUserApiRequest={updateUserApiRequest} />
  );
};

export default UserProfilePage;
