import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import "../../styles/AuthStyles.css";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // When auth.user is available, set initial values
  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name || "");
      setEmail(auth.user.email || "");
      setPhone(auth.user.phone || "");
      setAddress(auth.user.address || "");
    }
  }, [auth?.user]);
  const handleSubmit = async (e) => {
     
    e.preventDefault(); // prevent page reload
    try {
      const {data}= await axios.put(`${BASE_URL}/api/v1/auth/profile`,
         {
        name,
        email,
        password,
        phone,
        address,
      }
    );
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth , user:data?.updatedUser})
        let ls =localStorage.getItem("auth");
        ls =JSON.parse(ls);
        ls.user =data.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success('profile updated successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Profile-LUXOTICA"}>
      <div className="container-fluid p-3 m-3">
        <div className="d-flex">
          <div className="col-md-3 m-2 ">
            <UserMenu />
          </div>
          <div className="form-container col-md-9">
            <h1>USER PROFILE</h1>
            <form className="form " onSubmit={handleSubmit}>
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
                  disabled
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
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
