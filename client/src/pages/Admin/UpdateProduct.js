import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams(); // using slug from URL

  //  STATE
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
 const [id, setId] = useState("");


  // GET SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/single-product/${params.slug}`);
      const p = data?.product;

   
      setName(p?.name);
      setId(p?._id);
      setDescription(p?.description);
      setPrice(p?.price);
      setQuantity(p?.quantity);
      setCategory(p?.category?._id); // assuming category is object
      setShipping(p?.shipping );
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product");
    }
  };

  useEffect(() => {
    getSingleProduct(); 
  }, []);

  //  GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory(); //  RUN once on mount
  }, []);

  // HANDLE UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
    
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (!data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleDelete =async()=>{
   try {
    let answer =window.prompt('are you sure want to delete this porduct')
    if(!answer)return ;
    const {data} =await axios.delete(`/api/v1/product/delete-product/${id}`);
    toast.success("product deleted successfully")
    navigate('/dashboard/admin/products')
   } catch (error) {
    console.log(error)
    toast.error("something went wrong while deleting product")
   }
  }
 
  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="d-flex">
          <div className="col-md-5">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">

              {/* {/Added value to pre-select current category */} 
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)} // ✅ FIXED here
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):(
                <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`} // ✅ FIXED here
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* ✅ FIXED: Added value to pre-select shipping status */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ?"1":"0"}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary mb-5 m-3" onClick={handleUpdate}>
                  Update PRODUCT
                </button>
                 <button className="btn btn-danger mb-5 m-3 c-red" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
