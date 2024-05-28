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
  );
};

export default Posts;
