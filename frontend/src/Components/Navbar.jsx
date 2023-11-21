import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import blog_logo from "../assets/images/blogify-dark.png";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const [expandNav, setExpandNav] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setExpandNav(false);
  }, [location]);

  const handleMenu = () => {
    setExpandNav((prev) => !prev);
  };

  return (
    <nav className="w-full h-16 items-center flex fixed bg-emerald-400 shadow-xl sm:w-1/4 sm:h-screen sm:flex-col sm:pt-10">
      <div
        className="w-12 h-12 rounded-full cursor-pointer overflow-hidden sm:self-center ml-8 sm:ml-0 sm:w-16 sm:h-16"
        onClick={() => navigate("/")}
      >
        <img src={blog_logo} alt="blogify logo" className="w-full h-full" />
      </div>

      <div
        onClick={handleMenu}
        className="text-3xl absolute right-8 top-4 cursor-pointer sm:hidden"
      >
        {expandNav === false ? <FaBars /> : <IoClose />}
      </div>

      <div
        className={`flex flex-col items-end sm:items-center sm:h-1/2 sm:justify-evenly sm:pb-0 pb-6 sm:pt-0 pt-16 px-10 sm:px-0 absolute sm:static bg-emerald-400 sm:z-auto z-[-1] left-0 w-full sm:pl-0 pl-9 transition-all duration-500 ease-in ${
          expandNav ? "top-1" : "top-[-490px]"
        }`}
      >
        <hr className="w-full self-center sm:w-3/4" />
        <h2
          className="text-base font-semibold cursor-pointer text-white mt-3 sm:mt-0"
          onClick={() => navigate("/")}
        >
          all blogs.
        </h2>
        <h2
          className="text-base font-semibold cursor-pointer text-white mt-3 sm:mt-0"
          onClick={() => navigate("/myblogs")}
        >
          my blogs.
        </h2>
        <div
          className="flex items-center cursor-pointer mt-3 sm:mt-0"
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
