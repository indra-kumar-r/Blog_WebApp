import { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "./../utilities/Spinner";
import toast from "react-hot-toast";
import GlowFont from "./../utilities/GlowFont";
import { Link } from "react-router-dom";

const Admin_Posts = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9000/get_posts")
      .then((response) => response.json())
      .then((data) => {
        setPostsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const deletePost = async (id) => {
    if (confirm("Do you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:9000/del_post/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPostsData(postsData.filter((post) => post._id !== id));
          toast.success("Post Deleted successfully.");
        } else {
          throw new Error("Failed deleting the Post.");
        }
      } catch (error) {
        console.log("Failed deleting the Post:", error.message);
        toast.error("Failed deleting the Post.");
      }
    }
  };

  const togglePostStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      const response = await fetch(
        `http://localhost:9000/update_postStatus/${id}/${newStatus}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setPostsData(
          postsData.map((post) =>
            post._id === id ? { ...post, hidden: newStatus } : post
          )
        );
        toast.success("Post status updated successfully.");
      } else {
        throw new Error("Failed to update post status.");
      }
    } catch (error) {
      console.log("Failed to update post status:", error.message);
      toast.error("Failed to update post status.");
    }
  };

  return (
    <Main>
      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : postsData.length > 0 ? (
        <div className="d-flex flex-column gap-3" style={{ width: "100%" }}>
          {postsData.map((item, index) => (
            <div key={item._id} className="h_cards">
              <div className="index me-3">{index + 1}</div>
              <div className="postTitle">
                {item.cover ? (
                  <img src={`${item.cover}`} />
                ) : (
                  <img src="https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=" />
                )}
                <span>{item.title}</span>
              </div>
              <Link title="Read" to={`/post/${item._id}`}>
                <i
                  className="bi bi-eye"
                  style={{
                    fontSize: "1.5rem",
                    color: "red",
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                ></i>
              </Link>
              <div className="form-check form-switch">
                <input
                  title="Change the status"
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={`flexSwitchCheckChecked-${item._id}`}
                  checked={item.hidden}
                  onChange={() => togglePostStatus(item._id, item.hidden)}
                  style={{
                    width: "2.5rem",
                    height: "1.15rem",
                    cursor: "pointer",
                    boxShadow: "none",
                  }}
                />
              </div>
              <button
                title="Delete"
                className="delBtn"
                onClick={() => deletePost(item._id)}
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="spinner">
          <GlowFont text={"No posts!"} font={"2"} custom={".1"} />
        </div>
      )}
    </Main>
  );
};

export default Admin_Posts;

let Main = styled.div`
  width: 60%;
  margin-top: 7.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 750px) {
    width: 90%;
  }

  .h_cards {
    width: 100%;
    min-height: 10vh;
    max-height: 10vh;
    box-shadow: 0 0 0.25rem lightgray;
    border-radius: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    overflow: hidden;

    @media screen and (max-width: 750px) {
      overflow-x: scroll;
    }

    &:hover {
      box-shadow: 0 0 0.25rem darkgray;
      cursor: pointer;
    }

    .delBtn {
      border: none;
      border-radius: 50%;
      outline: none;
      padding: 0.5rem 0.75rem;

      &:hover,
      &:focus {
        background: black;
        color: white;
      }
    }

    .postTitle {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      text-transform: uppercase;
      font-weight: bold;
      font-size: small;

      img {
        min-width: 3rem;
        max-width: 3rem;
        height: 3rem;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }

  .spinner {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
