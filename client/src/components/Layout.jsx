import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ResetPwd from "./subComponents/ResetPwd";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <div>
          <ResetPwd />
          <Toaster />
        </div>
        <Outlet />
      </Wrapper>
    </>
  );
};

export default Layout;

let Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
