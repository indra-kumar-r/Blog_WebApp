import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./utilities/Spinner";
import GlowFont from "./utilities/GlowFont";

const UserPosts = () => {
  let [posts, setPosts] = useState(null);
  let { userInfo } = useContext(UserContext);
  let navigate = useNavigate();
  let defaultImage = "https://www.tgsin.in/images/joomlart/demo/default.jpg";

  useEffect(() => {
    if (userInfo === null || Object.keys(userInfo).length === 0) {
      navigate("/");
    } else {
      async function getUserPosts() {
        try {
          let response = await fetch(`http://localhost:9000/userpost`);
          let postData = await response.json();
          let filteredPost = postData.filter(
            (post) => post.author === userInfo.id
          );
          setPosts(filteredPost);
        } catch (error) {
          console.log(error);
        }
      }
      getUserPosts();
    }
  }, [userInfo, navigate]);

  return (
    <>
      {posts === null ? (
        <PostCards
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner />
        </PostCards>
      ) : !posts.length ? (
        <PostCards
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            margin: "7.5rem",
          }}
        >
          <img
            src="https://img.freepik.com/free-vector/design-inspiration-concept-illustration_114360-4191.jpg?w=740&t=st=1717364407~exp=1717365007~hmac=f8da8990602a2a785bc2eacdfd17493d274276c6aa71db686d06e2a624ebbb85"
            className="img-fluid"
            width={"400rem"}
            height={"400rem"}
          />
          <div>
            There are no posts to display. Once you create a post, it will
            appear here.
          </div>
          <Link to={"/create"} className="fw-bold text-primary">
            <GlowFont text={"Click here to create."} font={1.5} custom={0.1} />
          </Link>
        </PostCards>
      ) : (
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
                  <div>
                    Time: {format(new Date(post.createdAt), " HH:mm:ss")}
                  </div>
                </div>
              </Post>
            </Link>
          ))}
        </PostCards>
      )}
    </>
  );
};

export default UserPosts;

let PostCards = styled.div`
  margin-top: 7.5rem;
  width: 60%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  gap: 1rem;
  padding-bottom: 1rem;
  transition: all 0.2s ease-in-out;

  a {
    text-decoration: none;
    color: inherit;
  }

  @media screen and (max-width: 750px) {
    width: 90%;
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
    align-items: flex-start;
    align-items: right;
    flex-direction: column;
    padding: 0.25rem 0.5rem;
    overflow: hidden;
    gap: 0.25rem;
    font-style: italic;
    overflow-y: auto;
    font-size: small;
  }
`;
