import { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();

  const getProductsBycat = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  }, [params.slug]); // dependency

  useEffect(() => {
    if (params?.slug) getProductsBycat();
  }, [params.slug, getProductsBycat]); // ✅ include both

  return (
    <Layout title={"products"}>
      <div className="container">
        <h1 className="text-center">{category?.name}</h1>
        <div className="row">
          {products?.map((p) => (
            <div className="col-md-4" key={p._id}>
              <div className="card m-2">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description?.substring(0, 30)}...</p>
                  <p className="card-text">₹ {p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
