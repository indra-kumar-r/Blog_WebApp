import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import styled from "styled-components";
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
      setUserInfo({});
    } else {
      toast.error("Logout failed.");
    }
  }

  return (
    <ProfileWrapper>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Profile
        </button>
        <ul className="dropdown-menu p-0 overflow-hidden">
          <li>
            <Link className="py-2" to={"/profile"}>
              <span className="text-warning">Profile</span>
            </Link>
          </li>
          <li data-bs-toggle="modal" data-bs-target="#resetPassword">
            <a className="bg-secondary p-2 text-light">
              <i className="bi bi-key me-2 text-white fs-5"></i>
              <span>Reset Password</span>
            </a>
          </li>
          <li>
            <a className="bg-dark py-2 text-white" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </ProfileWrapper>
  );
};

export default Profile;

let ProfileWrapper = styled.div`
  li {
    all: unset;
  }

  button {
    border: none;
    outline: none;
  }

  a {
    cursor: pointer;
  }
`;
