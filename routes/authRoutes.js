import express from 'express';
import {registerController,loginController,testController,isAdmin} from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router=express.Router();

//routring 
//REGISTER ||method post
router.post('/register',registerController);
router.post('/login',loginController);

 //test routes
 router.get('/test',requireSignIn,isAdmin,testController);
 router.get('/user-auth',requireSignIn,(req,res)=>{
res.status(200).send({ok:true})
 })

export default router;

