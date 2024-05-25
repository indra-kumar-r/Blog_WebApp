import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  let [title, setTitle] = useState("");
  let [summary, setSummary] = useState("");
  let [content, setContent] = useState("");
  let [file, setFile] = useState("");
  let { userInfo } = useContext(UserContext);
  let [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (userInfo === null) {
      setRedirect(true);
    }
  }, [userInfo]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  let createNewPost = async (e) => {
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
        alert(responseData.message);
      }

      setTitle("");
      setSummary("");
      setContent("");
      setFile("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Form onSubmit={createNewPost}>
        <div className="formImage">
          <img src={file} alt="" />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          placeholder="Summary"
          required
        />
        <input
          type="text"
          value={file}
          onChange={(e) => setFile(e.target.value)}
          placeholder="Image URL"
          required
        />
        <ReactQuill
          className="textbox"
          value={content}
          theme="snow"
          onChange={(newValue) => setContent(newValue)}
          required
        />
        <button type="submit">Post</button>
      </Form>
    </>
  );
};

export default CreatePost;

let Form = styled.form`
  width: 60%;
  max-height: 35rem;
  box-shadow: 0 0 0.5rem violet;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  overflow-y: auto;

  .formImage {
    width: 100%;
    max-height: 20rem;
    overflow: hidden;

    img {
      width: 100%;
      max-height: 100%;
      object-fit: fill;
    }
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
