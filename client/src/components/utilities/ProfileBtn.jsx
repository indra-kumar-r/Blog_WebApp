import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../UserContext";
import { styled } from "styled-components";
import GlowFont from "./GlowFont";

const ProfileBtn = ({ userName }) => {
  let [user, setUser] = useState("");
  let [image, setImage] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        fetch(`http://localhost:9000/user?username=${userName}`)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              setUser(data);
              setImage(data.userimage);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [image]);

  if (!image) {
    let firstLetter = userName[0];
    return (
      <Pic title={`${userName}`} className="text-uppercase fw-bold">
        <span>
          <GlowFont text={firstLetter} font={1.5} custom={0} />
        </span>
      </Pic>
    );
  }

  return (
    <>
      <>
        {image && <ProfileImage title={userName} $image={image}></ProfileImage>}
      </>
    </>
  );
};

export default ProfileBtn;

let Pic = styled.div`
  border-radius: 50%;
  min-width: 2.5rem;
  min-height: 2.5rem;
  max-width: 2.5rem;
  max-height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0.25rem plum;
  overflow: hidden;

  background: linear-gradient(90deg, white, lightgray);
  background-color: #9daeff;
  background: linear-gradient(43deg, #b5c2ff 0%, #ffc0fb 46%, #ffe8be 100%);

  background-size: 400% 400%;
  animation: gradient 10s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &:hover {
    box-shadow: 0 0 0.5rem plum;
  }

  span {
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: white;
    font-family: "Times New Roman", Times, serif;
    font-size: 1.5rem;
  }
`;

let ProfileImage = styled.div`
  border-radius: 50%;
  min-width: 2.5rem;
  min-height: 2.5rem;
  max-width: 2.5rem;
  max-height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0.25rem plum;
  overflow: hidden;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
