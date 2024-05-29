import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("Write your blog post here...");
  const [file, setFile] = useState("");
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo === null || Object.keys(userInfo).length === 0) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const resetFun = () => {
    setTitle("");
    setSummary("");
    setContent("Write your blog post here...");
    setFile("");
  };

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:9000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, summary, content, cover: file }),
        credentials: "include",
      });
      let responseData = await response.json();
      if (response.ok) {
        toast.promise(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(responseData.message);
              resetFun();
            }, 2000);
          }),
          {
            loading: "Creating post...",
            success: "Post created successfully",
            error: "Failed to create post",
          }
        );
      }
    } catch (error) {
      toast.error("An error occurred while creating the post");
    }
  };

  let postImageContent =
    file || "https://www.tgsin.in/images/joomlart/demo/default.jpg";

  return (
    <>
      <Form onSubmit={createNewPost}>
        <div className="row">
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
              <img src={postImageContent} alt="Post cover" />
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="postImage"
                placeholder=""
                required
                value={file}
                onChange={(e) => setFile(e.target.value)}
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
                placeholder=""
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="postTitle">Title</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="postSummary"
                placeholder=""
                required
                onChange={(e) => setSummary(e.target.value)}
                value={summary}
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
        <button type="submit">Post</button>
      </Form>
    </>
  );
};

export default CreatePost;

let Form = styled.form`
  margin-top: 7.5rem;
  width: 60%;
  height: 35rem;
  box-shadow: 0 0 0.25rem black;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  overflow-y: auto;

  .row {
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

    width: 100%;

    .col {
      justify-content: flex-start;
    }
  }

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
  }

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

  .textbox {
    width: 100%;
  }

  button {
    padding: 0.75rem 1.75rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    background-color: #39ef88;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.25rem;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover,
    &:focus {
      background-color: #36f88a;
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
  }
`;
