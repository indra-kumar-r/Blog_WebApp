import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  let { userInfo, setUserInfo } = useContext(UserContext);

  async function logout() {
    let response = await fetch("http://localhost:9000/logout", {
      credentials: "include",
      method: "POST",
    });
    if (response.ok) {
      toast.success("You have been successfully logged out.");
      setUserInfo(null);
    } else {
      toast.error("Logout failed.");
    }
  }

  return (
    <>
      <Box>
        <div className="profileIcon">Profile</div>
        <div className="profileLinks">
          <Link to={"/profile"}>
            <FaRegUserCircle /> <span>{userInfo?.username}</span>
          </Link>
          <a onClick={logout}>Logout</a>
        </div>
      </Box>
    </>
  );
};

export default Profile;

let Box = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: white;

  .profileIcon {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1rem;
    color: #069242;
  }

  .profileLinks {
    width: 10rem;
    position: absolute;
    top: 1.5rem;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 0 0.25rem 0 black;
    border-radius: 0.25rem;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0;
    overflow: hidden;
    z-index: 100;

    a {
      padding: 1rem 0.55rem;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      text-align: left;
      border-radius: 0.25rem;
      color: black;
      text-decoration: none;

      &:hover,
      &:active {
        background-color: black;
        color: white;
      }

      span {
        margin-left: 0.5rem;
        text-transform: capitalize;
        font-style: italic;
        color: violet;
      }
    }
  }

  &:hover > .profileLinks {
    visibility: visible;
    opacity: 1;
  }
`;
