import AdminMenu from "../../components/Layout/AdminMenu"
import Layout from "../../components/Layout/Layout"

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard- Create Product"}>
    <div classname="d-flex container-fluid m-3 p-3">
        <div className="d-flex ">
          <div className="col-md-3 m-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
           <h1>Create Product</h1>
          </div>
        </div>
    </div>
   </Layout>
  )
}

export default CreateProduct
