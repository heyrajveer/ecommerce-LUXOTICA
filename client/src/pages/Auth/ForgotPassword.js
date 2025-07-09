import {  useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import { useNavigate ,useLocation} from "react-router-dom";
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
const [email, setEmail] = useState("");
 const [newPassword, setnewPassword] = useState("");
 const [answer, setAnswer] = useState("");
const location =useLocation();
const navigate=useNavigate();
//form funcion

  const handleSubmit =async(e) => {
    e.preventDefault() ; // prevent page reload
    try {
      const res= await axios.post('/api/v1/auth/forgot-password',
        {email,newPassword,answer}
      ); 
      if(res && res.data.success){
        toast.success(res.data && res.data.message);
        navigate(location.state || "/login")
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
   <Layout title={'Forgot Password - LUXOTICA'}>
     <div className="form-container ">
           <h1>Forgot-Password Form</h1>
           <form className="form" onSubmit={handleSubmit}>
             <div className="mb-4">
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="form-control"
                 placeholder="Enter your  email"
                 required
               />
             </div>
             
             <div className="mb-4">
               <input
                 type="text"
                 value={answer}
                 onChange={(e) => setAnswer(e.target.value)}
                 className="form-control"
                 placeholder="Enter your Favirote Name"
                 required
               />
             </div>
              <div className="mb-4">
               <input
                 type="text"
                 value={newPassword}
                 onChange={(e) => setnewPassword(e.target.value)}
                 className="form-control"
                 placeholder="Enter new Password"
                 required
               />
             </div>
   
             <button type="submit" className="btn btn-primary mt-4">
               Submit
             </button>
           </form>
         </div>
       </Layout>
     );
   }; 
   export default ForgotPassword;
   