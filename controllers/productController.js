
import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {


  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
   
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.mimetype;
    }

   
    console.log(photo?.path);
    console.log(photo?.mimetype);

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

// ✅ Controller to get all products
export const getProductcontroller = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 }); 

    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products", 
      error: error.message,
    });
  }
};


export const getsingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product", 
      error: error.message,
    });
  }
};
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product && product.photo && product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data); // `send` is fine for binary
    } else {
      return res.status(404).send({ success: false, message: "Photo not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
export const deleteProductController =async(req,res)=>{
  try {
    const product =await productModel.findByIdAndDelete(req.params.pid).select('-photo')
    res.status(200).send({
        success:true,
        message:"successfully deleted product",

    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error while deleting product",
        error,
    })
  }
}
export const updateProductController =async(req,res)=>{
     try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;


    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

  const product = await productModel.findByIdAndUpdate(
  req.params.pid,
  { ...req.fields, slug: slugify(name) },
  { new: true }
);

if (!product) {
  return res.status(404).send({ success: false, message: "Product not found" });
}

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.mimetype;
    }

   
    console.log(photo?.path);
    console.log(photo?.mimetype);

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
}
