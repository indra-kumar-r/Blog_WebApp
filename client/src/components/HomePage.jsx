import { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import { UserContext } from "./UserContext";

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
      {posts.map((post) => (
        <Posts key={post._id} post={post} />
      ))}
    </>
  );
};

export default HomePage;
