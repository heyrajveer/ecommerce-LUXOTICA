import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
  
const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate=useNavigate();
//form funcion
  const handleSubmit =async (e) => {
    e.preventDefault() ; // prevent page reload
    try {
      const res= await axios.post('/api/v1/auth/register',
        {name,email,password,phone,address}
      );
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/login')
      }
      else{
     toast.error(res.data.message)
      }
      
        
    } catch (error) {
        console.log(error)
        toast.error("something went wrong")
    }

    

    // ===================== its uses only for checking working or not========== 
    // console.log("Register Data:", {
    //   name,
    //   email,
    //   password,
    //   phone,
    //   address,
    // });
    // toast.success('Register Successfully');
    // =======================================


    // Optional: Clear the form
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("");
  };
  // for checking i store it
  // console.log(process.env.REACT_APP_APII)

  return (
    <Layout title="Register - LUXOTICA">
      <div className="form-container ">
        <h1>Register Form</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter name"
              required
            />
          </div>

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

          <div className="mb-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="Enter address"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
