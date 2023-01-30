import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserChatComponents from "./userChat/UserChatComponents";

const ProtectedRoute = ({ admin }) => {
  //   let auth = false;

  // for using chat components
  if (admin) {
    let adminAuth = true;
    // let adminAuth = false;
    // if (adminAuth) auth = true;

    return adminAuth ? <Outlet /> : <Navigate to={"/login"} />;
  } else {
    // let userAuth = false;
    let userAuth = true;
    // if (userAuth) auth = true;
    return userAuth ? (
      <>
        <UserChatComponents /> <Outlet />
      </>
    ) : (
      <Navigate to={"/login"} />
    );
  }
  // for using chat components
  //   return auth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
