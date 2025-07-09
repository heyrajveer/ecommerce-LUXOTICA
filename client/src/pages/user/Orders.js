import Layout from "../../components/Layout/Layout"
import UserMenu from "../../components/Layout/UserMenu"

const Orders = () => {
  return (
   <Layout title={'Order-LUXOTICA'}>
   <div className="container-flui p-3 m-3">
    <div className="d-flex">
        <div className="col-md-3 m-2 ">
            <UserMenu/>
        </div> 
         <div className="col-md-9 m-3">
        <h1>Your Orders</h1>
    </div>
    </div>
   

  </div>
   </Layout>
  )
}

export default Orders