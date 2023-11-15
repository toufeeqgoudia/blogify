import { useAuth } from "../../Hooks/useAuth";
import { instance } from "../../utils/apiService";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate();

  console.log(user)

  const logout = async () => {
    try {
      const response = await instance.post("/api/logout/");
      localStorage.removeItem("token"); // remove token
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error logging out: ", error);
    }
  };
  return (
    <div className="w-3/4 h-full p-5 flex flex-col ml-25">
      <h2 className="text-lg font-semibold self-center">profile.</h2>
      <hr />
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-4/5 h-full flex flex-col items-center my-5">

          <div className="w-1/2 flex justify-evenly items-center my-5">
            {/** onClick enlarge photo */}
            <img src={`${baseUrl}${user.profile_img}`} alt='Profile Photo' className="w-24 rounded-full" />
            {/** onClick change photo */}
            <p>change profile photo.</p>
          </div>

          <div className="w-1/2 flex flex-col items-center my-5">
            <p className="self-start">username.</p>
            <form className="w-full flex">
              <input className="w-full border-2 outline-none py-1 px-2 rounded-s-lg" placeholder={user.username} />
              <button className="bg-emerald-500 px-2 rounded-e-lg">Change</button>
            </form>
          </div>

          <div className="w-1/2 flex flex-col items-center my-5">
            <p className="self-start">full name.</p>
            <form className="w-full flex">
              <input className="w-full border-2 outline-none py-1 px-2 rounded-s-lg" placeholder={user.full_name} />
              <button className="bg-emerald-500 px-2 rounded-e-lg">Change</button>
            </form>
          </div>

          <div className="w-1/2 flex flex-col items-center my-5">
            <p className="self-start">email.</p>
            <form className="w-full flex">
              <input className="w-full border-2 outline-none py-1 px-2 rounded-s-lg" placeholder={user.email} />
              <button className="bg-emerald-500 px-2 rounded-e-lg">Change</button>
            </form>
          </div>

          <div className="w-1/2 flex flex-col items-center my-5">
            <p className="self-start">password.</p>
            <form className="w-full flex flex-col">
              <input className="w-full border-2 outline-none py-1 px-2 rounded-lg" placeholder='old password' />
              <input className="w-full border-2 outline-none py-1 px-2 rounded-lg my-2" placeholder='new password' />
              <button className="bg-emerald-500 w-20 h-10 px-2 rounded-lg self-end">Change</button>
            </form>
          </div>

          <button className="w-40 p-3 mt-20 bg-black rounded text-white" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
