import { useAuth } from "../../Hooks/useAuth";

const Home = () => {
  const {user} = useAuth()

  console.log('users: ', user)

  return (
    <div className="flex flex-col justify-center">
      <h1>welcome to blogify.</h1>

      <p>id: {user.id}</p>
      <p>username: {user.username}</p>
      <p>email: {user.email}</p>
      <img src={user.profile_img} className="w-20" />
    </div>
  );
};

export default Home;
