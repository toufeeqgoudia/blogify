import { Routes, Route } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import AllBlogs from "../AllBlogs/AllBlogs";
import Myblogs from "../MyBlogs/Myblogs";
import Profile from "../Profile/Profile";
import EditPost from "../MyBlogs/EditPost";

const Home = () => {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/myblogs" element={<Myblogs />} />
        <Route path="/myblogs/edit/:id" element={<EditPost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Home;
