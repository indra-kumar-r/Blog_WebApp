import styled from "styled-components";
import GoBackBtn from "./utilities/GoBackBtn";

const ViewProfile = () => {
  return (
    <Main>
      <GoBackBtn />
      <div>ViewProfile</div>
    </Main>
  );
};

export default ViewProfile;

let Main = styled.div`
  width: 60%;
  margin-top: 7.5rem;
`;
