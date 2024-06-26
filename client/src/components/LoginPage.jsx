import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [redirect, setRedirect] = useState(false);
  let { setUserInfo } = useContext(UserContext);
  let inputFocus = useRef(null);

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  async function login(e) {
    e.preventDefault();
    let response = await fetch("http://localhost:9000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), password }),
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        toast.success("You have successfully logged in.");
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      toast.error("Login Failed.");
    }
  }

  if (redirect) {
    if (username === "ADMIN") {
      return <Navigate to={"/admin"} />;
    }
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <FormContainer>
        <div className="formTitle">LOGIN</div>
        <div className="row">
          <div className="col d-none d-lg-flex justify-content-center align-items-center">
            <img
              src="https://img.freepik.com/premium-vector/security-password-concept-illustration_251005-470.jpg?w=826"
              className="img-fluid"
            />
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <FormOutline className="login" onSubmit={login}>
              <FormSection>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  required
                  placeholder="Username"
                  ref={inputFocus}
                />
              </FormSection>
              <FormSection>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                  placeholder="Password"
                />
              </FormSection>
              <FormSection>
                <Button type="submit">Login</Button>
              </FormSection>
              <div className="links">
                <Link to="/forgotpassword">forgot password</Link>
                <Link to="/register">register</Link>
              </div>
            </FormOutline>
          </div>
        </div>
      </FormContainer>
    </>
  );
};

export default LoginPage;

let FormContainer = styled.div`
  margin-top: 7.5rem;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 3rem 1.5rem 3rem;
  box-shadow: 0 0 0.25rem plum;
  border-radius: 0.25rem;
  text-align: center;

  .row {
    width: 100%;

    .col {
      img {
        transform: scale(1.05);
      }
    }
  }

  @media screen and (max-width: 750px) {
    width: 90%;
  }

  @media screen and (max-width: 500px) {
    padding: 0.25rem;
  }

  .formTitle {
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }
`;

let FormOutline = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;

  .links {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: none;
      color: darkgray;
      padding-bottom: 0.01rem;
      border-bottom: 0.05rem solid transparent;
      outline: none;
      transition: all 0.5s;

      &:hover {
        color: black;
        border-bottom: 0.05rem solid black;
      }
    }
  }
`;

let FormSection = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0.5rem 0;

  label {
    position: absolute;
    left: 3.5%;
    top: -15%;
    background-color: white;
    padding: 0 0.25rem;
  }

  input {
    width: 100%;
    padding: 1.25rem 1rem;
    border: 0.01rem solid violet;
    outline: none;
    border-radius: 0.25rem;
    color: black;
    background-color: white;

    &::placeholder {
      color: darkgray;
    }
  }
`;

let Button = styled.button`
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
    color: white;
    background-color: #36f88a;
  }
`;
