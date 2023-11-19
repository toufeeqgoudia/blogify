import { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { instance } from "../../utils/apiService";
import { updateDetails, updateImage } from "../../utils/updateProfile";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Profile = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(user.profile_img);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

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
      window.location.reload();
    } catch (error) {
      console.log("error logging out: ", error);
    }
  };
  return (
    <div className="w-full h-full p-5 flex flex-col ml-25">
      <h2 className="text-lg font-semibold self-center">profile.</h2>
      <hr />
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full h-full flex flex-col items-center my-5"> {/** CHANGE FOR SM SCREEN */}
          <div className="w-1/2 flex justify-evenly items-center my-5">
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
                className="text-xs"
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
              className="w-20 h-9 bg-emerald-500 px-2 rounded-lg"
              onClick={() => updateProfileImage()}
            >
              change.
            </button>
          </div>

          <div className="w-1/2 flex flex-col items-center my-5">
            <p className="self-start">username.</p>
            <form className="w-full flex" onSubmit={updateUsername}>
              <input
                name="username"
                autoComplete="off"
                onChange={handleChange}
                className="w-full border-2 outline-none py-1 px-2 rounded-s-lg"
                placeholder={user.username}
              />
              <button
                type="submit"
                className="bg-emerald-500 px-2 rounded-e-lg"
              >
                change.
              </button>
            </form>
          </div>

          <div className="w-1/2 flex flex-col items-center my-5">
            <p className="self-start">full name.</p>
            <form className="w-full flex" onSubmit={updateFullname}>
              <input
                name="full_name"
                autoComplete="off"
                onChange={handleChange}
                className="w-full border-2 outline-none py-1 px-2 rounded-s-lg"
                placeholder={user.full_name}
              />
              <button
                type="submit"
                className="bg-emerald-500 px-2 rounded-e-lg"
              >
                change.
              </button>
            </form>
          </div>

          <div className="w-1/2 flex flex-col items-center my-5">
            <p className="self-start">email.</p>
            <form className="w-full flex" onSubmit={updateEmail}>
              <input
                name="email"
                autoComplete="off"
                onChange={handleChange}
                className="w-full border-2 outline-none py-1 px-2 rounded-s-lg"
                placeholder={user.email}
              />
              <button
                type="submit"
                className="bg-emerald-500 px-2 rounded-e-lg"
              >
                change.
              </button>
            </form>
          </div>

          <div className="w-1/2 flex flex-col items-center my-5">
            <p className="self-start">password.</p>
            <form className="w-full flex flex-col" onSubmit={updatePassword}>
              <input
                type="password"
                name="oldPassword"
                autoComplete="off"
                onChange={handleChange}
                className="w-full border-2 outline-none py-1 px-2 rounded-lg"
                placeholder="old password"
              />
              <input
                type="password"
                name="newPassword"
                autoComplete="off"
                onChange={handleChange}
                className="w-full border-2 outline-none py-1 px-2 rounded-lg my-2"
                placeholder="new password"
              />
              <button
                type="submit"
                className="bg-emerald-500 w-20 h-10 px-2 rounded-lg self-end"
              >
                change.
              </button>
            </form>
          </div>

          <button
            className="w-40 p-3 mt-20 bg-black rounded text-white"
            onClick={logout}
          >
            logout.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
