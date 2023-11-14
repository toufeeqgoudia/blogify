import { useState } from "react";
import { instance } from "../../utils/apiService";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SignIn = (props) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await instance.post("/api/login/", {
        email: userData.email,
        password: userData.password,
      });

      console.log('response: ', response)

      if (response.status === 200) {
        navigate("/", { state: response.data.token });
      }
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setFetchError("failed to sign in.");
      console.log("Error: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-2/5 h-full bg-emerald-500 flex items-center justify-end">
        <div className="w-4/5 h-4/5 bg-emerald-500 shadow-3xl flex items-center justify-center">
          <h2 className="text-6xl text-white font-bold">blogify.</h2>
        </div>
      </div>
      <div className="w-3/5 h-full bg-white flex items-center justify-start">
        <div className="w-4/5 h-4/5 bg-white shadow-3xl">
          <form
            className="w-full h-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mb-10">login.</h2>
            {fetchError && (
              <div className="p-2 bg-red-500 rounded mb-4 -mt-6">
                <p>{fetchError}</p>
              </div>
            )}
            <p className="mb-2">email.</p>
            <input
              type="email"
              name="email"
              placeholder="youremail@email.com"
              className="w-4/5 outline-none p-1 mb-5 text-center"
              autoComplete="on"
              onChange={handleChange}
            />
            <p className="mb-2">password.</p>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-4/5 outline-none p-1 mb-5 text-center"
              autoComplete="on"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-1/2 p-1 mt-5 mb-5 bg-emerald-500 rounded "
              disabled={loading}
            >
              login.
            </button>
            <button
              type="text"
              className="bg-none underline cursor-pointer text-center text-sm"
              onClick={() => props.onFormSwitch("register")}
            >
              Don`t have an account? Register here.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  onFormSwitch: PropTypes.func,
};

export default SignIn;
