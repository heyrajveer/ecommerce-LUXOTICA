import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"
import { useAuth } from "../../context/auth"

const AdminDashboard = () => {
  const [auth] =useAuth();
  return (
   <Layout>
    <div classname="d-flex container-fluid m-3 p-3">
        <div className="d-flex ">
          <div className="col-md-3 m-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card  m-3 w-75 p-3">
              <h4>Admin Name :{auth?.user?.name}</h4>
               <h4>Admin email :{auth?.user?.email}</h4>
                <h4>Admin contact :{auth?.user?.phone}</h4>
                
            </div>
          </div>
        </div>
    </div>
   </Layout>
  )
}

export default AdminDashboard