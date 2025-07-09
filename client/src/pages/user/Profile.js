import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"

const Profile = () => {
  return (
  <Layout title={'Profile-LUXOTICA'}>

  <div className="container-flui p-3 m-3">
    <div className="d-flex">
        <div className="col-md-3 m-2 ">
            <UserMenu/>
        </div> 
         <div className="col-md-9 m-3">
        <h1>Your Profile</h1>
    </div>
    </div>
   

  </div>
  </Layout>
  )
}

export default Profile
