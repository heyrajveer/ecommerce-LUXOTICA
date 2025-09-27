import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();


const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });


  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common['Authorization'] = auth.token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [auth?.token]);

 
  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token
      });
    }
  }, []);

 
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email, password });
      if (res.data.success) {
        setAuth({
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
      }
      return res.data;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong" };
    }
  };

  return (
    <AuthContext.Provider value={[auth, setAuth, login]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
