import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/authController.js";
import {
  createProductController,
  deleteProductController,
  getProductcontroller,
  getsingleProductController,
  productPhotoController,
  updateProductController,
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
router.delete("/delete-product/:pid", deleteProductController);
export default router;
