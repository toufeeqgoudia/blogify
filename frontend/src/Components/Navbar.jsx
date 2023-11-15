import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import blog_logo from "../assets/images/blogify-dark.png";

const baseUrl = import.meta.env.VITE_BASE_URL

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

  return (
    <nav className="w-screen h-20 flex justify-between bg-emerald-500 shadow-xl" >
      <div className="flex items-center w-1/4">
        <img src={blog_logo} alt="blogify logo" className="w-12 rounded-full mx-5" />
        <h1 className="text-3xl font-extrabold">blogify.</h1>
      </div>
      <div className="flex items-center w-1/2 justify-evenly">
        <h2 className="text-base font-semibold cursor-pointer" onClick={() => navigate('/')}>All Posts</h2>
        <h2 className="text-base font-semibold cursor-pointer" onClick={() => navigate('/myblogs')}>My Posts</h2>
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/profile')}>
            <img src={`${baseUrl}${user.profile_img}`} alt="User Profile Image" className="w-7 rounded-full" />
            <h2 className="ml-2 text-base font-semibold">{user.username}</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
