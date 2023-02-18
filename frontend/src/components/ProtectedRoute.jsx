import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserChatComponents from "./userChat/UserChatComponents";
import axios from "axios";
import LoginPage from "../pages/LoginPage";
import { Nav } from "react-bootstrap";

const ProtectedRoute = ({ admin }) => {
  const [isAuth, setIsAuth] = useState();

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

  // below this is only for simulation(production) purposes
  // //   let auth = false;

  // // for using chat components
  // if (admin) {
  //   let adminAuth = true;
  //   // let adminAuth = false;
  //   // if (adminAuth) auth = true;

  //   return adminAuth ? <Outlet /> : <Navigate to={"/login"} />;
  // } else {
  //   // let userAuth = false;
  //   let userAuth = true;
  //   // if (userAuth) auth = true;
  //   return userAuth ? (
  //     <>
  //       <UserChatComponents /> <Outlet />
  //     </>
  //   ) : (
  //     <Navigate to={"/login"} />
  //   );
  // }
  // // for using chat components
  // //   return auth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
