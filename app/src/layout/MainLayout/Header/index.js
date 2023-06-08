import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiLogOut, BiUser } from "react-icons/bi";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import Login from "./../../../views/Login/index";
import { logout } from "../../../store/features/userSlice.js";

const Header = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleClose();
    }
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      <Login isOpen={isOpen} handleClose={handleClose} />
      <div className="header">
        <div className="header__logo">
          <NavLink to="/">
            <img src="https://i.ibb.co/KX3Kz6n/Lavender.png" alt="logo" />
          </NavLink>
        </div>
        <div className="header__links">
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink exact to="/rated" activeClassName="active">
            Rated
          </NavLink>
        </div>
        <div className="header__search"></div>
        <div className="header__user">
          {isLoggedIn ? (
            <div className="user-menu">
              <img src={"https://upload.mavinstg.qls.vn/1686059020439-ad10ae69f3af3e252f8726dc28570d38.jpg"} alt="user" />
              <div className="user-menu__dropdown">
                <div>
                  <BiUser />
                  {user.user_id}
                </div>
                <div onClick={handleLogout}>
                  <BiLogOut />
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <button onClick={handleClickOpen}>Login</button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
