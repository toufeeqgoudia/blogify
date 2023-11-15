import { instance } from "../../utils/apiService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

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
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
