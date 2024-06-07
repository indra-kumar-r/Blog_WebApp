import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Posts = ({ post }) => {
  let [coverImage, setCoverImage] = useState(
    "https://www.tgsin.in/images/joomlart/demo/default.jpg"
  );

  useEffect(() => {
    if (post.cover) {
      setCoverImage(post.cover);
    }
  }, [post.cover]);

  return (
    <PostCards>
      <Link to={`/post/${post._id}`} className="post">
        <img loading="lazy" src={`${coverImage}`} alt={post.title} />
        <div className="px-2 fw-bold text-uppercase">{post.title}</div>
        <div className="info">
          {post.author && (
            <div className="authorName text-secondary">
              {post.author.username}
            </div>
          )}
          <time className="text-secondary">
            {format(new Date(post.createdAt), "MMM dd, yyyy")}
          </time>
        </div>
        <p className="text-muted">{post.summary}</p>
      </Link>
    </PostCards>
  );
};

export default Posts;

let PostCards = styled.div`
  .post {
    width: 100%;
    height: 17.5rem;
    overflow: hidden;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    cursor: pointer;
    border-bottom: 0.01rem solid black;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    transition: all 0.25s ease-in-out;
    text-decoration: none;
    color: black;
    box-shadow: 0 0.05rem 0.05rem 0 black;

    &:hover {
      border-bottom: 0.02rem solid black;
      box-shadow: 0 0.15rem 0.15rem 0 black;
      border-radius: 0.25rem;
    }

    img {
      width: 100%;
      height: 60%;
      object-fit: cover;
    }

    .info {
      width: 100%;
      display: flex;
      gap: 1rem;
      padding: 0 0.5rem;

      .authorName {
        text-transform: capitalize;
      }

      time {
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(45, 45, 45);
      }
    }

    p {
      width: 100%;
      text-align: justify;
      line-height: 1.5;
      padding: 0 0.5rem;
    }
  }
`;
