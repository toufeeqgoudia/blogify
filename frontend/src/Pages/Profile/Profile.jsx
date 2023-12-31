import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { instance } from "../../utils/apiService";
import { updateDetails, updateImage } from "../../utils/updateProfile";
import PropTypes from "prop-types";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Profile = ({ theme, setTheme }) => {
  const { user } = useAuth();
  const [image, setImage] = useState(user.profile_img);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const updateProfileImage = () => {
    updateImage(user.id, image);
    alert("profile image changed successfully.");
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const updateUsername = (e) => {
    e.preventDefault();
    updateDetails(user.id, { username: formData.username });
    alert("username changed successfully.");
  };

  const updateFullname = (e) => {
    e.preventDefault();
    updateDetails(user.id, { full_name: formData.full_name });
    alert("full name changed successfully.");
  };

  const updateEmail = (e) => {
    e.preventDefault();
    updateDetails(user.id, { email: formData.email });
    alert("email changed successfully.");
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    const response = await instance.post("/api/login/", {
      email: user.email,
      password: formData.oldPassword,
    });

    if (response.data.token) {
      updateDetails(user.id, { password: formData.newPassword });
      alert("password changed successfully.");
    } else {
      alert("incorrect current password. password not changed.");
    }
  };

  const logout = async () => {
    try {
      await instance.post("/api/logout/");
      localStorage.removeItem("token");
      navigate('/login')
    } catch (error) {
      console.log("error logging out: ", error);
    }
  };

  return (
    <div className="w-full h-full p-5 flex flex-col mt-16 sm:ml-25 sm:mt-0 dark:bg-black">
      <h2 className="text-lg font-semibold self-center dark:text-slate-300">
        profile.
      </h2>
      <hr />

      <div className="w-full h-full flex flex-col items-center mt-3 mb-10">
        <div className="w-4/5 flex justify-evenly items-center mt-5 mb-5 sm:w-1/2">
          <div className="w-full h-full flex flex-col">
            <div className="w-24 h-24 rounded-full border-2 border-slate-300 object-cover overflow-hidden mb-3">
              <img
                src={`${baseUrl}${user.profile_img}`}
                alt="Profile Photo"
                className="w-full h-full"
                name="profile_img"
              />
            </div>
            <input
              className="text-xs dark:text-slate-300"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage((prevImage) => ({
                  ...prevImage,
                  profile_img: e.target.files[0],
                }))
              }
            />
          </div>
          <button
            type="button"
            className="w-20 h-9 bg-emerald-400 px-2 rounded-lg"
            onClick={() => updateProfileImage()}
          >
            change.
          </button>
        </div>
        <div className="w-4/5 flex flex-col items-center my-5 sm:w-1/2">
          <p className="self-start dark:text-slate-300">username.</p>
          <form className="w-full flex" onSubmit={updateUsername}>
            <input
              name="username"
              autoComplete="off"
              onChange={handleChange}
              className="w-full border-2 outline-none py-1 px-2 rounded-s-lg dark:bg-black dark:text-slate-300"
              placeholder={user.username}
            />
            <button type="submit" className="bg-emerald-400 px-2 rounded-e-lg">
              change.
            </button>
          </form>
        </div>
        <div className="w-4/5 flex flex-col items-center my-5 sm:w-1/2">
          <p className="self-start dark:text-slate-300">full name.</p>
          <form className="w-full flex" onSubmit={updateFullname}>
            <input
              name="full_name"
              autoComplete="off"
              onChange={handleChange}
              className="w-full border-2 outline-none py-1 px-2 rounded-s-lg dark:bg-black dark:text-slate-300"
              placeholder={user.full_name}
            />
            <button type="submit" className="bg-emerald-400 px-2 rounded-e-lg">
              change.
            </button>
          </form>
        </div>
        <div className="w-4/5 flex flex-col items-center my-5 sm:w-1/2">
          <p className="self-start dark:text-slate-300">email.</p>
          <form className="w-full flex" onSubmit={updateEmail}>
            <input
              name="email"
              autoComplete="off"
              onChange={handleChange}
              className="w-full border-2 outline-none py-1 px-2 rounded-s-lg dark:bg-black dark:text-slate-300"
              placeholder={user.email}
            />
            <button type="submit" className="bg-emerald-400 px-2 rounded-e-lg">
              change.
            </button>
          </form>
        </div>
        <div className="w-4/5 flex flex-col items-center my-5 sm:w-1/2">
          <p className="self-start dark:text-slate-300">password.</p>
          <form className="w-full flex flex-col" onSubmit={updatePassword}>
            <input
              type="password"
              name="oldPassword"
              autoComplete="off"
              onChange={handleChange}
              className="w-full border-2 outline-none py-1 px-2 rounded-lg dark:bg-black dark:text-slate-300"
              placeholder="old password"
            />
            <input
              type="password"
              name="newPassword"
              autoComplete="off"
              onChange={handleChange}
              className="w-full border-2 outline-none py-1 px-2 rounded-lg my-2 dark:bg-black dark:text-slate-300"
              placeholder="new password"
            />
            <button
              type="submit"
              className="bg-emerald-400 w-20 h-10 px-2 rounded-lg self-end"
            >
              change.
            </button>
          </form>
          <div className="w-full flex items-center justify-between mt-10">
            <p className="dark:text-slate-300">
              {theme === "dark" ? "dark" : "light"} mode.
            </p>
            <label
              htmlFor="check"
              className="bg-slate-300 cursor-pointer relative w-14 h-7 rounded-full"
            >
              <input
                type="checkbox"
                id="check"
                onClick={handleTheme}
                className="peer sr-only"
              />
              <span className="w-2/5 h-4/5 bg-emerald-400 absolute rounded-full left-0.9 top-0.8 peer-checked:bg-emerald-400 peer-checked:left-7.5 transition-all duration-500"></span>
            </label>
          </div>
        </div>
        <button
          className="w-40 p-3 mt-10 bg-emerald-400 rounded text-white font-semibold"
          onClick={logout}
        >
          logout.
        </button>
      </div>
    </div>
  );
};

Profile.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func,
};

export default Profile;
