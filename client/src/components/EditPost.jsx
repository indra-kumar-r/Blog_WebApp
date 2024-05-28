import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import GoBackBtn from "./utilities/GoBackBtn";
import toast from "react-hot-toast";
import { UserContext } from "./UserContext";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imgCover, setImgCover] = useState(
    "https://www.tgsin.in/images/joomlart/demo/default.jpg"
  );
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo === null || Object.keys(userInfo).length === 0) {
      navigate("/");
    } else {
      fetch(`http://localhost:9000/post/${id}`)
        .then((response) => response.json())
        .then((postData) => {
          setTitle(postData.title);
          setSummary(postData.summary);
          setContent(postData.content);
          setImgCover(postData.cover);
        });
    }
  }, [userInfo, navigate]);

  async function updatePost(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:9000/post`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary,
        content,
        cover: imgCover,
        id: id,
      }),
      credentials: "include",
    });
    if (response.ok) {
      toast.success("Post Updated Successfully");

      setRedirect(true);
    } else {
      toast.error("Failed updating the Post");
    }
  }

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:9000/post/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Post Deleted successfully.");
        setRedirect(true);
      } else {
        throw new Error("Failed deleting the Post.");
      }
    } catch (error) {
      console.log("Failed deleting the Post:", error.message);
    }
  };

  return (
    <>
      <Form onSubmit={updatePost}>
        <div className="formBtns">
          <GoBackBtn />
        </div>
        <Img>
          <img className="imgData" src={`${imgCover}`} />
        </Img>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          autoComplete="off"
          required
        />
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          autoComplete="off"
          required
        />
        <input
          type="text"
          value={imgCover}
          onChange={(e) => setImgCover(e.target.value)}
          placeholder="Image URL"
          autoComplete="off"
          required
        />
        <ReactQuill
          className="textbox"
          value={content}
          theme="snow"
          onChange={(newValue) => setContent(newValue)}
          required
        />
        <div className="btns">
          <button className="btn btn-warning fw-bold" type="submit">
            UPDATE POST
          </button>
          <button
            className="btn btn-danger fw-bold"
            type="button"
            onClick={() => deletePost(id)}
          >
            DELETE
          </button>
        </div>
      </Form>
    </>
  );
};

export default EditPost;

const Img = styled.div`
  width: 100%;
  height: 15rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
  }
`;

const Form = styled.form`
  margin-top: 7.5rem;
  width: 60%;
  max-height: 35rem;
  box-shadow: 0 0 0.25rem black;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  overflow-y: auto;

  .formBtns {
    width: 100%;
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 0.01rem solid violet;
    outline: none;
    padding: 0.5rem 0;

    &::placeholder {
      font-style: italic;
      letter-spacing: 0.25rem;
    }
  }

  .textbox {
    width: 100%;
  }

  .btns {
    display: flex;
    gap: 0.5rem;
  }
`;
