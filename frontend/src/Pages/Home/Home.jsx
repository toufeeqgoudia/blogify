import { useState, useEffect } from "react";
import { instance } from "../../utils/apiService";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState({});
  const location = useLocation();
  const token = location.state;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get("/api/user/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        console.log(response);

        setUsers(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="flex flex-col justify-center">
      <h1>welcome to blogify.</h1>

      <p>id: {users.id}</p>
      <p>username: {users.username}</p>
      <p>email: {users.email}</p>
      <img src={users.profile_img} className="w-20" />
    </div>
  );
};

export default Home;
