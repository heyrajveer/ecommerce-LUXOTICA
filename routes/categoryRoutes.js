// routes/categoryRoutes.js
import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/authController.js";
import {
    categoryContoller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/createCategoryController.js";

const router = express.Router();

// FIXED: added `/` in path
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
router.get("/get-category",categoryContoller);//there is no need of any type of middleware and authorization  bcoz 
// anyone can able to search category without login//not like that means admin already loggedin 
router.get('/single-category/:slug',singleCategoryController)

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryCOntroller);
export default router;
