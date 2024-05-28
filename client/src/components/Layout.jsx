import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div>
          <Toaster />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
