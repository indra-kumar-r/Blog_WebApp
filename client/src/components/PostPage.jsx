import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { format } from "date-fns";
import ReactHtmlParser from "@orrisroot/react-html-parser";
import GoBackBtn from "./utilities/GoBackBtn";
import Spinner from "./utilities/Spinner";
import NotFound from "./NotFound";
import LikePost from "./subComponents/LikePost";
import { UserContext } from "./UserContext";

const PostPage = () => {
  let [postInfo, setPostInfo] = useState(null);
  let { id } = useParams();
  let [loader, setLoader] = useState(true);
  let { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:9000/post/${id}`)
      .then((response) => response.json())
      .then((postData) => {
        setPostInfo(postData);
      });
  }, [id]);

  useEffect(() => {
    let spinnerTime = setTimeout(() => {
      setLoader(false);
    }, 750);

    return () => clearTimeout(spinnerTime);
  }, []);

  if (loader) {
    return (
      <>
        <PostData className="spinnerDiv">
          <Spinner />
        </PostData>
      </>
    );
  }

  if (postInfo.message === "NotFound") return <NotFound />;

  return (
    <>
      {postInfo ? (
        <PostData>
          <div className="container-fluid d-flex justify-content-between align-items-center">
            <GoBackBtn />
            <div className="options">
              <LikePost id={postInfo._id} user={userInfo} />
            </div>
          </div>
          <div className="postHeader">
            <h3>{postInfo.title}</h3>
            <span className="text-secondary">
              <h4>{postInfo.author.username}, </h4>
              <h5>{format(new Date(postInfo.updatedAt), "MMM dd, yyyy")}</h5>
            </span>
          </div>
          <div className="postImg">
            <img src={`${postInfo.cover}`} />
          </div>
          <div className="postContent">{ReactHtmlParser(postInfo.content)}</div>
        </PostData>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default PostPage;

let PostData = styled.div`
  margin-top: 7.5rem;
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 3rem;

  &.spinnerDiv {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .postHeader {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    h3 {
      display: flex;
      text-align: center;
      letter-spacing: 0.15rem;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      font-family: "Times New Roman", Times, serif;

      h4 {
        text-transform: capitalize;
      }
    }
  }

  .postImg {
    width: 100%;
    height: 25rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.25rem;
    }
  }

  .postContent {
    line-height: 2;
    text-align: justify;

    a {
      text-decoration: none;
      font-style: italic;
      font-weight: bold;
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.25rem;
    }
  }
`;
