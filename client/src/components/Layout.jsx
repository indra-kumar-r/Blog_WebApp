import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ResetPwd from "./subComponents/ResetPwd";

const Layout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div>
          <ResetPwd />
          <Toaster />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
