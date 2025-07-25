import express from 'express';
import {registerController,loginController,testController,isAdmin, forgotPasswordController, updateProfileController} from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router=express.Router();

//routring 
//REGISTER ||method post
router.post('/register',registerController);
router.post('/login',loginController);
 //test routes
 router.get('/test',requireSignIn,isAdmin,testController);
 // Protected user routes
 router.get('/user-auth',requireSignIn,(req,res)=>{
res.status(200).send({ok:true})
 })

  //  protect admin routes
 router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
res.status(200).send({ok:true})
 })
router.post("/forgot-password", forgotPasswordController);
router.put('/profile',requireSignIn, updateProfileController);

export default router;

