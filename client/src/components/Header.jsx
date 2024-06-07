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
            <span className="fw-bold">Ignite Blog</span>
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
  z-index: 10;

  .header {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-radius: 0.25rem;
    box-shadow: 0 0.15rem 0.15rem 0 black;

    .logo {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .blogLogo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;

        img {
          /* width: 15%;
          height: 15%; */
          width: 2.5rem;
          height: 2.5rem;
          object-fit: contain;
          margin-right: 0.5rem;
        }

        span {
          color: orange;
          filter: drop-shadow(-0.1rem 0.1rem 0 black);
          letter-spacing: 0.1rem;
          font-size: x-large;
        }
      }
    }

    .navbar {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1.5rem;
    }

    a {
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
  }

  @media screen and (max-width: 750px) {
    width: 90%;
    height: 7rem;

    .header {
      justify-content: center;
      flex-direction: column;

      .logo {
        justify-content: center;

        .blogLogo {
          justify-content: center;

          img {
          }
        }
      }

      .navbar {
        justify-content: center;
      }
    }
  }
`;
