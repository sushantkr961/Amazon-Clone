import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserChatComponents from "./userChat/UserChatComponents";
import axios from "axios";
import LoginPage from "../pages/LoginPage";

const ProtectedRoute = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    axios.get("/api/get-token").then(function (data) {
      if (data.data.token) {
        setIsAuth(data.data.token);
      }
      return isAuth
    });
  }, [isAuth]);

  if (isAuth === undefined) {
    return <LoginPage />;
  }

  return isAuth && admin && isAuth !== "admin" ? (
    <Navigate to={"/login"} />
  ) : isAuth && admin ? (
    <Outlet />
  ) : isAuth && !admin ? (
    <>
      <UserChatComponents />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
