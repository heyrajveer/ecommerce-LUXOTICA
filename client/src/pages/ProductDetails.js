import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details"}>
      <div className="row container mt-2">
        <div className="col-md-4">
          {product?._id && (
            <img
              src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="400"
              width="300px"
            />
          )}
        </div>

        <div className="col-md-5">
          <h1 className="details">Product Details</h1>
          <h5>Name: {product.name}</h5>
          <h5>Description: {product.description}</h5>
          <h5>Price: ${product.price}</h5>
          <h5>Category: {product?.category?.name}</h5>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>

        <div className="row mt-4">
          <h1>Similar Products</h1>
          {relatedProducts.length < 1 && <p>No similar products found</p>}
          <div className="d-flex flex-wrap justify-content-start">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description?.substring(0, 30)}...</p>
                  <p className="card-text">${p.price}</p>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
