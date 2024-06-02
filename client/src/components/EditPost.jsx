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
      navigate(-1);
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
        navigate(-1);
      } else {
        throw new Error("Failed deleting the Post.");
      }
    } catch (error) {
      console.log("Failed deleting the Post:", error.message);
    }
  };

  const resetFun = () => {
    setTitle("");
    setSummary("");
    setContent("Write your blog post here...");
    setImgCover("");
  };

  let defaultImage = "https://www.tgsin.in/images/joomlart/demo/default.jpg";

  return (
    <>
      <Form onSubmit={updatePost}>
        <div className="formBtns d-flex justify-content-between">
          <GoBackBtn />
          <span className="d-flex justify-content-end">
            <i
              title="reset"
              className="bi-arrow-clockwise"
              onClick={() => resetFun()}
            ></i>
          </span>
        </div>
        <div className="row">
          <div className="col d-flex gap-2 flex-column">
            <div className="imgDiv">
              <img
                className="imgData"
                src={imgCover ? `${imgCover}` : defaultImage}
              />
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="postImage"
                value={imgCover}
                onChange={(e) => setImgCover(e.target.value)}
                placeholder=""
                autoComplete="off"
                required
              />
              <label htmlFor="postImage">Image Url</label>
            </div>
          </div>
          <div className="col d-flex gap-2 flex-column">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="postTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder=""
                autoComplete="off"
                required
              />
              <label htmlFor="postTitle">Title</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="postSummary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary"
                autoComplete="off"
                required
              />
              <label htmlFor="postSummary">Summary</label>
            </div>
            <StyledReactQuill
              className="textbox"
              value={content}
              theme="snow"
              onChange={(newValue) => setContent(newValue)}
              required
            />
          </div>
        </div>

        <div className="btns d-flex gap-3">
          <button title="update post" className="btn btn-warning" type="submit">
            <i className="bi bi-box-arrow-up fs-4"></i>
          </button>
          <button
            title="delete post"
            className="btn btn-danger"
            type="button"
            onClick={() => deletePost(id)}
          >
            <i className="bi bi-trash3 fs-4"></i>
          </button>
        </div>
      </Form>
    </>
  );
};

export default EditPost;

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

  .imgDiv {
    width: 100%;
    min-height: 15rem;
    max-height: 15rem;
    border: 0.01rem solid lightgray;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .form-floating {
    width: 100%;

    input {
      width: 100%;
      transition: all 0.25s;

      &:focus {
        box-shadow: 0 0.1rem 0 black;
        outline: none;
      }
    }

    label {
      color: darkgray;
      font-family: "Times New Roman", Times, serif;
    }
  }

  .formBtns {
    width: 100%;
    .bi-arrow-clockwise {
      background-color: #39ef88;
      padding: 0.25rem 0.5rem;
      border-radius: 50%;
      cursor: pointer;
      font-weight: bold;
      transition: transform 0.5s;

      &:hover {
        transform: rotate(360deg);
      }
    }
  }
`;

let StyledReactQuill = styled(ReactQuill)`
  .ql-container {
    border-radius: 0.25rem;
    min-width: 25rem;
    max-width: 25rem;
    min-height: 15rem;
    max-height: 15rem;
    overflow-y: auto;
  }

  .ql-toolbar {
    border-radius: 0.25rem;
  }

  .ql-editor {
    max-width: 100%;
    height: 100%;
    text-align: justify;
  }
`;
