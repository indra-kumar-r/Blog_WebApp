import { format } from "date-fns";
import { Link } from "react-router-dom";

const Posts = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`} className="post">
      <img loading="lazy" src={post.cover} alt={post.title} />
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
