import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { format } from "date-fns";
import ReactHtmlParser from "@orrisroot/react-html-parser";

const PostPage = () => {
  let [postInfo, setPostInfo] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:9000/post/${id}`)
      .then((response) => response.json())
      .then((postData) => {
        setPostInfo(postData);
      });
  }, []);

  return (
    <>
      {postInfo && (
        <PostData>
          <div className="postHeader">
            <h3>{postInfo.title}</h3>
            <span>
              <h4>{postInfo.author.username}, </h4>
              <h5>
                {format(new Date(postInfo.createdAt), "MMM dd, yyyy | HH:mm")}
              </h5>
            </span>
          </div>
          <div className="postImg">
            <img src={`${postInfo.cover}`} />
          </div>
          <div className="postContent">{ReactHtmlParser(postInfo.content)}</div>
        </PostData>
      )}
    </>
  );
};

export default PostPage;

let PostData = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 3rem;

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
      justify-content: flex-end;
      align-items: center;
      gap: 0.25rem;
      font-family: Arial, Helvetica, sans-serif;

      h4 {
        text-transform: capitalize;
        font-weight: 100;
        letter-spacing: 0.15rem;
        font-size: small;
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
