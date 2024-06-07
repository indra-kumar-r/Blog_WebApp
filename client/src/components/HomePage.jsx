import { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import Spinner from "./utilities/Spinner";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  let { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:9000/post")
      .then((response) => response.json())
      .then((postApi) => {
        setPosts(postApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userInfo, setPosts]);

  return (
    <>
      {posts.length ? (
        <Main>
          {posts.map((post) => (
            <Posts key={post._id} post={post} />
          ))}
        </Main>
      ) : (
        <Main
          className="d-flex justify-content-center align-items-center"
          style={{
            width: "60%",
            height: "50vh",
          }}
        >
          <Spinner />
        </Main>
      )}
    </>
  );
};

export default HomePage;

let Main = styled.div`
  width: 60%;
  margin-top: 7.5rem;
  transition: all 0.25s ease-in-out;

  @media screen and (max-width: 750px) {
    width: 90%;
  }
`;
