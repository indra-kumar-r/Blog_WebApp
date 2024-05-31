import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";

const UserPosts = () => {
  let [posts, setPosts] = useState([]);
  let { userInfo } = useContext(UserContext);
  let navigate = useNavigate();
  let defaultImage = "https://www.tgsin.in/images/joomlart/demo/default.jpg";

  useEffect(() => {
    if (userInfo === null || Object.keys(userInfo).length === 0) {
      navigate("/");
    } else {
      fetch(`http://localhost:9000/userpost`)
        .then((response) => response.json())
        .then((postData) => {
          let filteredPost = postData.filter(
            (post) => post.author === userInfo.id
          );
          setPosts(filteredPost);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userInfo, navigate]);

  return (
    <>
      <PostCards>
        {posts.map((post) => (
          <Link key={post._id} to={`/edit/${post._id}`}>
            <Post>
              <div className="imageDiv">
                <img
                  src={post.cover || defaultImage}
                  onError={(e) => {
                    e.target.src = defaultImage;
                  }}
                />
              </div>
              <div className="div_content">
                <div>Title: {post.title}</div>
                <div>
                  Date: {format(new Date(post.createdAt), "MMM dd, yyyy")}
                </div>
                <div>Time: {format(new Date(post.createdAt), " HH:mm:ss")}</div>
              </div>
            </Post>
          </Link>
        ))}
      </PostCards>
    </>
  );
};

export default UserPosts;

let PostCards = styled.div`
  margin-top: 7.5rem;
  width: 60%;
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(calc(30% - 1rem), 1fr)); */
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  gap: 1rem;
  padding-bottom: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

let Post = styled.div`
  width: 100%;
  height: 17rem;
  border: 0.01rem solid plum;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: 0.25s ease-in-out;

  &:hover {
    box-shadow: 0 0 0.25rem 0 black;
  }

  .imageDiv {
    width: 100%;
    height: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .div_content {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: right;
    flex-direction: column;
    padding: 1rem 0.5rem;
    overflow: hidden;
    gap: 0.25rem;
    font-style: italic;
    overflow-y: auto;
    font-size: small;
  }
`;
