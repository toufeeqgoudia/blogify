import { useState, useEffect, createContext } from "react";
import { instance } from "../utils/apiService";
import PropTypes from "prop-types";

const AuthContext = createContext({ user: null, token: '' });

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await instance.get("/api/user/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.log("Error: ", error);
      }

      setLoading(false)
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
