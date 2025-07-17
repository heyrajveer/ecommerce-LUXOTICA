import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/authController.js";
import {
  createProductController,
  deleteProductController,
  getProductcontroller,
  getsingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  updateProductController,
  searchProductController
} from "../controllers/productController.js";
import ExpressFormidable from "express-formidable";
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
 updateProductController
);
router.get("/get-product", getProductcontroller);

router.get("/single-product/:slug", getsingleProductController);
//try to access bohot
router.get("/product-photo/:pid", productPhotoController);
//delete routes
router.delete("/delete-product/:pid", deleteProductController);
//filter
router.post('/product-filters',productFiltersController);
//product ppage count
router.get('/product-count',productCountController);
 //per page  per page
router.get('/product-list/:page',productListController);
//serch products
router.get('/search/:keyword',searchProductController);


export default router;
