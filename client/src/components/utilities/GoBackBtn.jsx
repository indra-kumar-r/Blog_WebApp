import styled from "styled-components";

const GoBackBtn = () => {
  return (
    <Main>
      <span
        className="text-secondary fs-6"
        onClick={() => window.history.back()}
      >
        Go back <i className="bi bi-arrow-left-circle"></i>
      </span>
    </Main>
  );
};

export default GoBackBtn;

let Main = styled.div`
  font-size: black;
  span {
    cursor: pointer;
    transition: all 0.2s;
    padding-bottom: 0.25rem;

    &:hover {
      border-bottom: 0.01rem solid black;
    }
  }
`;
