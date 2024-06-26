import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [redirect, setRedirect] = useState(false);
  let inputFocus = useRef(null);

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, []);

  async function register(e) {
    e.preventDefault();
    let response = await fetch("http://localhost:9000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.status === 200) {
      toast.success("You have successfully registered.");
      setRedirect(true);
      setTimeout(() => {
        toast.success("Login with your credentials.");
      }, 1500);
    } else {
      let data = await response.json();
      toast.error(data ? data.errors : "Regsitration failed.");
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <FormContainer>
        <div className="formTitle">Register</div>
        <div className="row">
          <div className="col d-none d-lg-flex justify-content-center align-items-center">
            <img
              src="https://img.freepik.com/premium-vector/data-security-concept-illustration_251005-467.jpg?w=826"
              className="img-fluid"
            />
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <FormOutline className="register" onSubmit={register}>
              <FormSection>
                <div className="d-flex" style={{ width: "100%" }}>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    ref={inputFocus}
                  />
                  <span
                    className="custom d-flex align-items-end justify-content-center"
                    onClick={() => {
                      toast((t) => (
                        <span
                          className="text-black"
                          style={{ textAlign: "center" }}
                        >
                          <i className="bi bi-exclamation-triangle-fill text-warning"></i>{" "}
                          Once you register with your chosen username, you will
                          not be able to change it later. Please make sure to
                          select your username carefully.
                        </span>
                      ));
                    }}
                  >
                    <i className="bi bi-info-circle-fill text-warning"></i>
                  </span>
                </div>
              </FormSection>
              <FormSection>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormSection>
              <FormSection>
                <Button type="submit">Register</Button>
              </FormSection>
              <div className="links">
                <span className="text-secondary">
                  Already have an account?{" "}
                </span>
                <Link to="/login">Sign in</Link>
              </div>
            </FormOutline>
          </div>
        </div>
      </FormContainer>
    </>
  );
};

export default RegisterPage;

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
        transform: scaleX(1.05);
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
    justify-content: center;
    align-items: center;

    a {
      text-decoration: none;
      color: black;
      padding-left: 0.25rem;
      border-bottom: 0.05rem solid transparent;
      outline: none;
      transition: all 0.2s ease-in-out;

      &:hover {
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

  .custom {
    cursor: pointer;
    position: absolute;
    right: 2.5%;
    bottom: 25%;
  }

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
