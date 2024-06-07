import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./utilities/Spinner";
import { toast } from "react-hot-toast";
import moment from "moment";

const UserProfile = () => {
  let [user, setUser] = useState(null);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  let [userImage, setUserImage] = useState("");
  let [userTagline, setUserTagline] = useState(null);
  let [userLocation, setUserLocation] = useState(null);
  let [updateTrigger, setUpdateTrigger] = useState(false);

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
  }, [userInfo, updateTrigger]);

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
          setUpdateTrigger((prev) => !prev);
          toast.success("Profile image updated successfully!");
          setUserImage("");
        }
      })
      .catch((error) => {
        toast.error("Failed to update profile image. Please try again.");
        console.log(error);
      });
  };

  const editUserDeatils = (e) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:9000/usertagloc`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userInfo.username,
          usertagline: userTagline,
          userlocation: userLocation,
        }),
      }).then((response) => {
        response.json();
        if (response.ok) {
          setUpdateTrigger((prev) => !prev);
          toast.success("User deatils updated successfully!");
          setUserTagline("");
          setUserLocation("");
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed!");
    }
  };

  return (
    <>
      {user ? (
        <Wrapper>
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
            <span className="text-light">
              <i className="bi bi-info-circle text-secondary"></i>{" "}
              {user.usertagline.trim() ? (
                user.usertagline
              ) : (
                <span className="text-secondary">Add tagline</span>
              )}
            </span>
            <span className="text-light">
              <i className="bi bi-geo-alt text-secondary"></i>{" "}
              {user.userlocation.trim() ? (
                user.userlocation
              ) : (
                <span className="text-secondary">Add location</span>
              )}
            </span>
            <div>
              <span className="text-light">
                <i className="bi bi-people text-secondary"></i>
                <span className="text-secondary">following</span>
                {user.userfollowing ? user.userfollowing : "0"}
              </span>
              <span className="text-light">
                <i className="bi bi-people-fill text-secondary"></i>
                <span className="text-secondary">followers</span>
                {user.userfollowers ? user.userfollowers : "0"}
              </span>
            </div>
            <div>
              <span className="text-light">
                <i className="bi bi-heart-fill text-secondary"></i>
                <span className="text-secondary">liked</span>
                {user.userliked ? user.userliked : "0"}
              </span>
              <span className="text-light">
                <i className="bi bi-bookmark text-secondary"></i>
                <span className="text-secondary">saved</span>
                {user.usersaved ? user.usersaved : "0"}
              </span>
            </div>
            <span className="text-white">
              <span className="text-secondary">Active since:</span>{" "}
              {user.createdAt
                ? moment(user.createdAt).format("MMM Do YY")
                : "-- -- ----"}
            </span>
            <span
              className="p-0 btn btn-dark py-1 px-3"
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
            <div className="modal-header justify-content-between">
              <h1
                className="modal-title text-warning fs-5"
                id="editUserInfoLabel"
              >
                Edit Details
              </h1>
              <div type="button" data-bs-dismiss="modal" aria-label="Close">
                <i className="bi bi-x-circle fs-5 text-light"></i>
              </div>
            </div>
            <div className="modal-body d-flex justify-content-end align-items-center flex-column ">
              <form
                onSubmit={editUserDeatils}
                className="d-flex justify-content-center
              align-items-center flex-column"
                style={{
                  width: "100%",
                }}
              >
                <input
                  type="text"
                  className="form-control p-3 my-1"
                  placeholder="Enter the tageline.."
                  value={userTagline}
                  onChange={(e) => setUserTagline(e.target.value)}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                  required
                />
                <input
                  type="text"
                  className="form-control p-3 my-1"
                  placeholder="Enter your location..."
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                  }}
                  required
                />

                <button className="btn btn-warning mt-2 px-3 fw-bold text-light">
                  {"Save"}
                </button>
              </form>
            </div>
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
              <div className="row mb-3 flex-column justify-content-center align-items-center">
                <div
                  className="col d-flex justify-content-center align-items-center bg-secondary"
                  style={{
                    width: "15rem",
                    minHeight: "15rem",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
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
                    style={{
                      minWidth: "15rem",
                      height: "15rem",
                      objectFit: "cover",
                    }}
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
  background-color: black;
  margin-top: 7.5rem;
  width: 60%;
  height: 35rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem black;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;

  .profileImage {
    min-width: 15rem;
    max-width: 15rem;
    min-height: 15rem;
    max-height: 15rem;
    overflow: hidden;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 0 0.5rem white;

      &:hover {
        box-shadow: 0 0 1rem white;
      }
    }
  }

  .user_details {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      padding: 0.5rem;
    }
  }

  @media screen and (max-width: 750px) {
    width: 90%;
  }
`;
