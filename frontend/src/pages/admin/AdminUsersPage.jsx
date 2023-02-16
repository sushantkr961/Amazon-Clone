import UsersPageComponent from "./components/UsersPageComponent";
import axios from "axios";

const fetchUsers = async (abctrl) => {
  // const users = await axios.get("/api/users");
  // console.log(users.data)  // OR
  const { data } = await axios.get("/api/users", { signal: abctrl.signal });
  // console.log(data);
  return data;
};

const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/users/${userId}`);
  return data;
};

const AdminUsersPage = () => {
  return <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />;
};

export default AdminUsersPage;
