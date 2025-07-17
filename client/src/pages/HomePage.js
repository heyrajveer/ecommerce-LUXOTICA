import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../context/Prices";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Paginated products loader
  const getPaginatedProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts((prev) => [...prev, ...data.products]); // Append not replace
    } catch (error) {
      console.log(error);
    }
  };

  // Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  // Filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // --- Effects ---
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getPaginatedProducts();
  }, [page]);

  useEffect(() => {
    console.log("radio",radio)
    if (checked.length || radio.length) filterProduct();
    else {
      // Reset to page 1 and fetch from scratch if no filter
      setProducts([]);
      setPage(1);
    }
  }, [checked, radio]);

  return (
    <Layout title={"Best Offers - LUXOTICA"}>
      <div className="d-flex container-fluid mt-3">
        {/* Filter Sidebar */}
        <div className="col-md-3">
          <h4 className="m-2">Filter by Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="m-2">Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger m-2"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        {/* Product Section */}
        <div className="col-md-9">
          <h1 className="text-center mb-4">All Products</h1>
          <div className="d-flex flex-wrap justify-content-start">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <Link className="product-link">
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
                      <button className="btn btn-primary ms-1">
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Load More Button & Spacer */}
          <div className="text-center mt-4 mb-5">
            <p>Total Products: {total}</p>
            {products.length < total && (
              <button
                className="btn btn-warning px-4  mt-2"
                onClick={() => setPage(page + 1)}
              >
                Load More
              </button>
            )}
          </div>
          <button></button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
