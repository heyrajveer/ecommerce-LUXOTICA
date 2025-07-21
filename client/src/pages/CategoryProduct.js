import { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();
  const navigate=useNavigate();

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
      <div className="container mt-2 mb-8  pb-5">
          <h1 className="text-center mb-4">Category - {category?.name}</h1>
          
          <div className=" d-flex flex-wrap justify-content-start ">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description?.substring(0, 30)}...
                  </p>
                  <p className="card-text">${p.price}</p>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary ms-2 "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          {/* <div className="text-center mt-4 mb-5">
            <p>Total Products: {total}</p>
            {products.length < total && (
              <button
                className="btn btn-warning px-4 mt-2"
                onClick={() => setPage(page + 1)}
              >
                Load More
              </button>
            )}
          </div> */}
        </div>
    </Layout>
  );
};
