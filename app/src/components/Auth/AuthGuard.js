import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return children;
};

export default AuthGuard;
