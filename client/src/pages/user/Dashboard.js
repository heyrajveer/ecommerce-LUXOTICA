import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

export const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dahboard- LUXOTICA"}>
       <div classname="d-flex container-fluid m-3 p-3">
        <div className="d-flex ">
          <div className="col-md-3 m-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
            <div className="card  m-3 w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
