import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import axios from "axios";
import Feed from "./components/Feed";
import UserProfile from "./pages/UserProfile";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Search from "./components/Search";
import Page404 from "./pages/Page404";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Feed />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/post-detail/:postId" element={<PostDetail />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<Page404 />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
