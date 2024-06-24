import styled from "styled-components";
import GlowFont from "./utilities/GlowFont";

const Admin = () => {
  return (
    <Main>
      <GlowFont text={"WELCOME TO ADMIN DASHBOARD"} font={"2"} custom={".1"} />
    </Main>
  );
};

export default Admin;

let Main = styled.div`
  width: 60%;
  margin-top: 7.5rem;
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-direction: column;

  @media screen and (max-width: 750px) {
    width: 90%;
  }
`;
