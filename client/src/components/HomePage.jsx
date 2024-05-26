import { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import { UserContext } from "./UserContext";
import styled from "styled-components";

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
    <Main>
      {posts.map((post) => (
        <Posts key={post._id} post={post} />
      ))}
    </Main>
  );
};

export default HomePage;

let Main = styled.div`
  width: 60%;
  margin-top: 7.5rem;
`;
