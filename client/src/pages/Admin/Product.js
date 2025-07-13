import { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Card } from "antd";
import { Link } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while fetching product");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
<Layout>
  <div className="d-flex ">
    <div className="col-md-4 m-2 ">
      <AdminMenu />
    </div>
    <div className="col-md-8 m-2">
      <h1 className="text-center">All Products List</h1>

      <div className="row">
        {product?.map((p) => (
          <div className="col-md-3 mb-3" key={p._id}>
            <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link" >
              <div className="card h-100 ">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description?.substring(0, 80)}...</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
</Layout>

  );
};

export default Product;
