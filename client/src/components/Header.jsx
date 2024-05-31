import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import Profile from "./subComponents/Profile";
import styled from "styled-components";
import Nav from "./utilities/Nav";

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

  const beforeLogin = [
    { label: "Home", value: "/" },
    { label: "Create", value: "/create" },
    { label: "Posts", value: "/posts" },
    { label: <Profile />, value: "#" },
  ];

  const afterLogin = [
    { label: "Home", value: "/" },
    { label: "Login", value: "/login" },
    { label: "Register", value: "/register" },
  ];

  return (
    <Main>
      <div className="header">
        <div className="logo">
          <NavLink to={"/"} className="blogLogo">
            <img src="/images/logo.png" />{" "}
            <span className="text-success fw-bold">MyBlog</span>
          </NavLink>
        </div>
        <div className="navbar">
          {username ? <Nav props={beforeLogin} /> : <Nav props={afterLogin} />}
        </div>
      </div>
    </Main>
  );
};

export default Header;

let Main = styled.div`
  width: 60%;
  height: 5rem;
  position: fixed;
  top: 0;
  background-color: white;
  transition: all 0.25s;

  .navbar {
    display: flex;
    justify-content: end;
    align-items: center;
  }

  a {
    @include logoStyles;
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    color: darkgray;
    border-bottom: 1px solid transparent;

    &:hover,
    &:focus {
      outline: none;
      color: black;
      transform: translateY(-0.05rem);
    }

    &[aria-current] {
      color: black;
      transform: translateY(-0.1rem);
      border-bottom: 1px solid black;
    }

    &.blogLogo {
      border: none;
      transform: none;
    }
  }
`;
