import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminGuard = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  if (user?.role !== "admin") {
    return <Redirect to="/" />;
  }

  return children;
};

export default AdminGuard;
