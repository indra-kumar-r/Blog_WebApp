import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <Link to={`/post/${post._id}`} className="post">
      <img loading="lazy" src={`${coverImage}`} alt={post.title} />
      <h4>{post.title}</h4>
      <div className="info">
        {post.author && (
          <div className="authorName">{post.author.username}</div>
        )}
        <time>{format(new Date(post.createdAt), "MMM dd, yyyy | HH:mm")}</time>
      </div>
      <p>{post.summary}</p>
    </Link>
  );
};

export default Posts;
