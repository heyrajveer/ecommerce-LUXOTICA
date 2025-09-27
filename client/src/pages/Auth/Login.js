import {  useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import { useNavigate ,useLocation} from "react-router-dom";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// import { token } from "morgan";
const Login = () => {
const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
const  [auth,setAuth] =useAuth();
const location =useLocation();
const navigate=useNavigate();
//form funcion
  const handleSubmit =async (e) => {
    e.preventDefault() ; // prevent page reload
    try {
      const res= await axios.post(`${BASE_URL}/api/v1/auth/login`,
        {email,
        password}
      ); 
      if(res && res.data.success){
        toast.success(res.data && res.data.message)
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        });
       localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || "/")
      }
      else{
     toast.error(res.data.message)
      }
      
        
    } catch (error) {
        console.log(error)
        toast.error("something went wrong")
    }

  };
 
  return (
    <Layout title="Login - LUXOTICA">
      <div className="form-container ">
        <h1>Login Form</h1>
        <form className="form" onSubmit={handleSubmit}>

          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>
          <div className=" mb-4">
            <button type="submit" className="btn btn-primary mt-4" onClick={()=> {navigate('/forgot-password')}}>
            forgot Passward
          </button>
          </div>
          
          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
