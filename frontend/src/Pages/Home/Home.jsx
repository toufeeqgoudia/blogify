import { useAuth } from "../../Hooks/useAuth";
import default_img from "../../assets/images/default.jpg";
import { instance } from "../../utils/apiService";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  console.log("users: ", user);

  const logout = async () => {
    try {
      const response = await instance.post('/api/logout/')
      localStorage.removeItem('token') // remove token
      console.log('response: ', response)
      if (response.status === 200) {
        navigate('/login')
      }
    } catch (error) {
      console.log('error logging out: ', error)
    }
  }

  return (
    <div className="flex justify-evenly">
      <div>
        <h1>welcome to blogify.</h1>

        <p>id: {user.id}</p>
        <p>username: {user.username}</p>
        <p>email: {user.email}</p>
        <img src={`${baseUrl}${user.profile_img}`} className="w-20 rounded-full" />
      </div>

      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default Home;
