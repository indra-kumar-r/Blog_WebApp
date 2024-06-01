import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { UserContext } from "../UserContext";

const LikePost = ({ id, user }) => {
  let [likeStatus, setLikeStatus] = useState(false);
  let [likeId, setLikeId] = useState(null);
  let [disabled, setDisable] = useState(true);
  let { userInfo } = useContext(UserContext);

  let likeIcon = likeStatus ? (
    <i className="bi bi-heart-fill"></i>
  ) : (
    <i className="bi bi-heart"></i>
  );

  console.log("checking one: ", Object.keys(userInfo).length, disabled);
  console.log("val: ", userInfo);

  useEffect(() => {
    console.log("changed");
    if (Object.keys(userInfo).length) {
      console.log("user online");
      setDisable(false);
      fetch(`http://localhost:9000/likepost?postId=${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.userName === user.username) {
            setLikeStatus(data.likeStatus);
            setLikeId(data._id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!Object.keys(userInfo).length) {
      setDisable(true);
    }
  }, [id, userInfo]);

  console.log("checking two: ", disabled, user);

  const toggleLike = async () => {
    if (disabled) {
      return toast(() => <span>Login to like the post.</span>);
    }
    setLikeStatus((prev) => !prev);
    if (!likeStatus) {
      try {
        let response = await fetch(`http://localhost:9000/likepost`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: id,
            userName: user.username,
            likeStatus: true,
          }),
        });
        if (response.ok) {
          toast.success("This Blog is now lit!", {
            icon: "🔥",
          });
        } else {
          toast.error("Error");
        }
        let data = await response.json();
        setLikeId(data.likeData._id);
      } catch (error) {
        console.log(error);
      }
    } else {
      let response = await fetch(`http://localhost:9000/likepost`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: likeId,
        }),
      });
      if (response.ok) {
        setLikeId(null);
      }
    }
  };

  return (
    <>
      <Like title="Like this Blog" onClick={toggleLike}>
        {likeIcon}
      </Like>
    </>
  );
};

export default LikePost;

let Like = styled.div`
  i {
    cursor: pointer;
    color: red;
    background-color: rgb(255, 219, 219, 0.4);
    border-radius: 50%;
    padding: 0.25rem 0.5rem;

    &:hover {
      background-color: rgb(255, 219, 219, 0.6);
    }
  }
`;
