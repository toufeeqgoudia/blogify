import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import blog_logo from "../assets/images/blogify-dark.png";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="w-1/4 h-screen flex flex-col bg-emerald-500 shadow-xl fixed">
      <div className="flex flex-col items-center h-1/4 justify-center">
        <img src={blog_logo} alt="blogify logo" className="w-16 rounded-full" />
      </div>
      <hr className="w-3/4 self-center" />
      <div className="flex flex-col items-center h-1/2 justify-evenly">
        <h2
          className="text-base font-semibold cursor-pointer text-white"
          onClick={() => navigate("/")}
        >
          all blogs.
        </h2>
        <h2
          className="text-base font-semibold cursor-pointer text-white"
          onClick={() => navigate("/myblogs")}
        >
          my blogs.
        </h2>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <div className="w-7 h-7 rounded-full border-2 overflow-hidden">
            <img
              src={`${baseUrl}${user.profile_img}`}
              alt="User Profile Image"
              className="w-full h-full"
            />
          </div>
          <h2 className="ml-2 text-base font-semibold text-white">
            {user.username}.
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
