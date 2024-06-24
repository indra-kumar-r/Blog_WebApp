import { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "./../utilities/Spinner";
import GlowFont from "../utilities/GlowFont";

const Admin_Users = () => {
  let [usersData, setUsersData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9000/get_users")
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Main>
      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : usersData.length ? (
        <div
          className="d-flex flex-column gap-3"
          style={{
            width: "100%",
          }}
        >
          {usersData.map((item, index) => (
            <div key={item._id} className="h_cards">
              <div className="index me-3">{index + 1}</div>
              <div className="username">
                {item.userimage ? (
                  <img src={`${item.userimage}`} />
                ) : (
                  <img src="https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=" />
                )}
                <span>{item.username}</span>
              </div>
              <div
                title="EDIT"
                className="btn btn-outline-dark d-flex justify-content-center align-items-center gap-2"
              >
                <i className="bi bi-pencil-square"></i>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner">
          <GlowFont text={"No users!"} font={"2"} custom={".1"} />
        </div>
      )}
    </Main>
  );
};

export default Admin_Users;

let Main = styled.div`
  width: 60%;
  margin-top: 7.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 750px) {
    width: 90%;
  }

  .h_cards {
    width: 100%;
    min-height: 10vh;
    max-height: 10vh;
    box-shadow: 0 0 0.25rem lightgray;
    border-radius: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    overflow: hidden;

    &:hover {
      box-shadow: 0 0 0.25rem darkgray;
      cursor: pointer;
    }

    .username {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      text-transform: uppercase;
      font-weight: bold;
      font-size: small;

      img {
        min-width: 3rem;
        max-width: 3rem;
        height: 3rem;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }

  .spinner {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
