import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Profile from "./subComponents/Profile";

const Header = () => {
  let { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:9000/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((userInfo) => {
        setUserInfo(userInfo);
      });
  }, []);

  let username = userInfo?.username;

  return (
    <div className="header">
      <div className="logo">
        <Link to={"/"} className="blogLogo">
          <img src="/images/logo.png" /> MyBlog
        </Link>
      </div>
      <div className="navbar">
        {username && (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/create"}>Create new post</Link>
            <Link to={"/posts"}>Posts</Link>
            <Profile />
          </>
        )}
        {!username && (
          <>
            <Link to={"/"}>Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
