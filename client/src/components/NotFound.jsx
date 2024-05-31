import styled from "styled-components";
import { ClockLoader } from "react-spinners";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2500);
  });

  return (
    <Main>
      <img
        className="img-fluid"
        src="https://cdn.svgator.com/images/2024/04/animated-3D-404-not-found-page-error.gif"
        alt=""
      />
      <span className="fs-3 fw-bold text-secondary">PAGE NOT FOUND</span>
      <span className="text-secondary d-flex gap-2 justify-content-center align-items-center">
        <span>Redirecting...</span>
        <ClockLoader color="#36d7b7" size={20} />
      </span>
    </Main>
  );
};

export default NotFound;

let Main = styled.div`
  width: 60%;
  margin-top: 7.5rem;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
    height: 80%;
  }
`;
