import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "./styles/app.scss";
import { UserContextProvider } from "./components/UserContext";
import CreatePost from "./components/CreatePost";
import UserPosts from "./components/UserPosts";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import { useEffect } from "react";
import ViewProfile from "./components/ViewProfile";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("currentRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    const storedRoute = sessionStorage.getItem("currentRoute");
    if (storedRoute) {
      navigate(storedRoute);
    }
  }, [navigate]);

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path={"/posts"} element={<UserPosts />} />
            <Route path={"/post/:id"} element={<PostPage />} />
            <Route path={"/edit/:id"} element={<EditPost />} />
            <Route path={"/profile"} element={<UserProfile />} />
            <Route path={"/user/:user"} element={<ViewProfile />} />
            <Route path={"*"} element={<NotFound />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
