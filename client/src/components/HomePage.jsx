import { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import Spinner from "./utilities/Spinner";
import GlowFont from "./utilities/GlowFont";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:9000/post")
      .then((response) => response.json())
      .then((postApi) => {
        setPosts(postApi);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [userInfo]);

  return (
    <Main>
      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : posts.length > 0 ? (
        posts.map((post) => <Posts key={post._id} post={post} />)
      ) : (
        <div className="spinner d-flex flex-column justify-content-center align-items-center">
          <img
            src="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg?t=st=1719257452~exp=1719261052~hmac=8185320eb271c364d9287a1679847478dd63c2a454522e55b23f1f39817bd5c2&w=740"
            style={{
              width: "20rem",
              height: "20rem",
            }}
          />
          <GlowFont
            text={"No posts yet. Why not start a new discussion?"}
            font={"1.5"}
            custom={".1"}
          />
        </div>
      )}
    </Main>
  );
};

export default HomePage;

const Main = styled.div`
  width: 60%;
  margin-top: 7.5rem;
  transition: all 0.25s ease-in-out;

  @media screen and (max-width: 750px) {
    width: 90%;
  }

  .spinner {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
