import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./utilities/Spinner";
import { ClockLoader, SyncLoader, PacmanLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import moment from "moment";

const UserProfile = () => {
  let [user, setUser] = useState("");
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  let [userImage, setUserImage] = useState("");

  useEffect(() => {
    if (userInfo === null || Object.keys(userInfo).length === 0) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    async function getUser() {
      try {
        let response = await fetch(
          `http://localhost:9000/user?username=${userInfo.username}`
        );
        if (response.ok) {
          let userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [userInfo, navigate, user]);

  const editUserImage = () => {
    if (userImage === "") {
      return toast.error("Fill the field!");
    }
    fetch("http://localhost:9000/userimage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userimage: userImage, username: user.username }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Profile image updated successfully!");
          setUserImage("");
        }
      })
      .catch((error) => {
        toast.error("Failed to update profile image. Please try again.");
        console.log(error);
      });
  };

  return (
    <>
      {user ? (
        <Wrapper>
          <div className="sectionOne">
            <div
              className="profileImage"
              data-bs-toggle="modal"
              data-bs-target="#editUserImage"
              style={{
                cursor: "pointer",
              }}
              title="Change your Image."
            >
              <img
                src={
                  user.userimage
                    ? user.userimage
                    : "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                }
              />
            </div>
            <div className="user_details d-flex flex-column gap-2 p-2">
              <span className="bg-dark text-light text-center">
                {user.username}
              </span>
              <span>
                <i className="bi bi-info-circle text-secondary"></i>{" "}
                {user.usertagline ? (
                  user.usertagline
                ) : (
                  <span className="text-secondary">Add tagline</span>
                )}
              </span>
              <span>
                <i className="bi bi-geo-alt text-secondary"></i>{" "}
                {user.userlocation ? (
                  user.userlocation
                ) : (
                  <span className="text-secondary">Add location</span>
                )}
              </span>
              <span>
                <span>
                  <i className="bi bi-people text-secondary"></i>
                  <span className="text-secondary">following</span>
                  {user.userfollowing ? user.userfollowing : "0"}
                </span>
                <span>
                  <i className="bi bi-people-fill text-secondary"></i>
                  <span className="text-secondary">followers</span>
                  {user.userfollowers ? user.userfollowers : "0"}
                </span>
              </span>
              <span>
                <span>
                  <i className="bi bi-heart-fill text-secondary"></i>
                  <span className="text-secondary">liked</span>
                  {user.userliked ? user.userliked : "0"}
                </span>
                <span>
                  <i className="bi bi-bookmark text-secondary"></i>
                  <span className="text-secondary">saved</span>
                  {user.usersaved ? user.usersaved : "0"}
                </span>
              </span>
              <span className="text-secondary">
                Active since:{" "}
                {user.createdAt
                  ? moment(user.createdAt).format("MMM Do YY")
                  : "-- -- ----"}
              </span>
              <span
                className="p-0 btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#editUserInfo"
                style={{
                  maxWidth: "100%",
                  cursor: "pointer",
                }}
              >
                Edit details <i className="bi bi-pencil-square"></i>
              </span>
            </div>
          </div>
          <div className="sectionTwo">
            <SyncLoader color="#36d7b7" size={5} />
            Stats will be displayed soon.
          </div>
          <div className="sectionThree">
            <ClockLoader color="#36d7b7" size={25} /> No Recent Acitivity
          </div>
        </Wrapper>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            marginTop: "7.5rem",
            width: "60%",
            height: "50vh",
          }}
        >
          <Spinner />
        </div>
      )}
      <div
        className="modal fade"
        id="editUserInfo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editUserInfoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            {/* <div className="modal-header">
              <h1 className="modal-title fs-5" id="editUserInfoLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-circle text-light"></i>
              </button>
            </div> */}
            <div className="modal-body d-flex justify-content-end align-items-center flex-column ">
              <div
                className="p-0 d-flex justify-content-end align-items-center"
                style={{ width: "100%" }}
              >
                <button
                  type="button"
                  className="btn p-0 m-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{
                    border: "none",
                    outline: "none",
                  }}
                >
                  <i className="bi bi-x-circle text-light fs-4"></i>
                </button>
              </div>
              <PacmanLoader color="#36d7b7" />
              <span className="pt-4">Server down. Try after some time.</span>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="editUserImage"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="editUserImageLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-body">
              <span
                className="d-flex justify-content-between align-items-center"
                style={{ width: "100%" }}
              >
                <h1 className="modal-title fs-5" id="editUserImageLabel">
                  Edit Image
                </h1>
                <button
                  type="button"
                  className="btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{ border: "none", outline: "none" }}
                >
                  <i className="bi bi-x-circle text-white fs-5"></i>
                </button>
              </span>
              <div className="row mb-3">
                <div className="col d-flex justify-content-between align-items-center">
                  <img
                    src={
                      user && user.userimage
                        ? userImage
                          ? userImage
                          : user.userimage
                        : userImage
                        ? userImage
                        : "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                    }
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <input
                    type="text"
                    className="form-control p-3 my-4"
                    placeholder="Enter the new image url..."
                    value={userImage}
                    onChange={(e) => setUserImage(e.target.value)}
                    style={{
                      outline: "none",
                      boxShadow: "none",
                    }}
                  />
                </div>
              </div>
              <span className="d-flex justify-content-center">
                <div className="btn btn-warning" onClick={editUserImage}>
                  Save
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

let Wrapper = styled.div`
  margin-top: 7.5rem;
  width: 60%;
  height: 35rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem black;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  .sectionOne {
    width: 100%;
    grid-column: 1 / span 1;
    grid-row: 1 / span 3;
    background-color: black;
    color: white;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    .profileImage {
      background-color: black;
      width: 100%;
      height: 40%;
      overflow: hidden;
      padding: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 80%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .user_details {
      width: 100%;

      span {
        padding: 0.5rem;
      }
    }
  }

  .sectionTwo {
    grid-column: 2 / span 2;
    grid-row: 1 / span 1;
    width: 100%;
    background-color: #0e0e0e;
    color: #656565;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    overflow: hidden;
  }

  .sectionThree {
    grid-column: 2 / span 2;
    grid-row: 2 / span 2;
    width: 100%;
    background-color: #151414;
    color: #656565;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;
