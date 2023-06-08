import { IconButton } from "@mui/material";
import React from "react";
import { MdClose, MdLogout, MdMenu, MdOutlineAccountCircle, MdOutlineDashboard } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const items = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdOutlineDashboard />
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <MdOutlineAccountCircle />
  },
  {
    title: "Novel",
    path: "/admin/novels",
    icon: <GiBookshelf />
  }
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const [isToggle, setIsToggle] = React.useState(false);
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className={!isToggle ? "sidebar-container" : "sidebar-container w64"}>
      <div className={!isToggle ? "sidebar" : "sidebar w64"}>
        <div className="sidebar__logo">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/xauu-88869.appspot.com/o/Image%2Fdownload.png?alt=media&token=2c8907d7-c975-4bf9-962b-3d6d45c0ae0b"
            alt="logo"
          />
          <div className="toggle">
            <IconButton onClick={handleToggle}>{!isToggle ? <MdClose /> : <MdMenu />}</IconButton>
          </div>
        </div>
        <div className="sidebar__menu">
          <h3>Main</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="sidebar__account">
            <ul>
              <li>
                <NavLink to="/admin/profile">
                  <img src={user.photo} alt="logo" />
                  <span>{user.name}</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/logout">
                  <MdLogout />
                  <span>Logout</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
