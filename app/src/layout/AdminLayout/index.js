import React from "react";
import Sidebar from "./Sidebar/index";
import "./style.scss";

const AdminLayout = ({ children }) => {
  return (
    <div className="df">
      <Sidebar />
      <div className="admin-container">{children}</div>
    </div>
  );
};

export default AdminLayout;
