import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../context/Prices";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter handler for category checkboxes
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Initial load of categories
  useEffect(() => {
    getAllCategory();
  }, []);

  // Load all products if no filters selected
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  // Filtered product call
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

  // Watch for filter changes
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"Best Offers - LUXOTICA"}>
      <div className="d-flex container-fluid mt-3">
        {/* Left Filter Sidebar */}
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

          {/* Filter by price */}
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
           <button className=" btn btn-danger m-2" onClick={()=>window.location.reload()}>RESET FILTERS</button>
          </div>
        </div>

        {/* Products Section */}
        <div className="col-md-10">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
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
                      {p.description?.substring(0, 80)}...
                    </p>
                    <p className="card-text">${p.price}</p>
                    <div className="d-flex">
                      <button className="btn btn-primary ms-1">More Details</button>
                      <button className="btn btn-secondary ms-1">ADD TO CART</button>
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

export default HomePage;
