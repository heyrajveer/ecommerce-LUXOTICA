import express from "express";
import dotenv from 'dotenv';
import connectDB from "./database/db.js";
import morgan from 'morgan';
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js'
dotenv.config();

const app=express();

connectDB();
app.use(express.json());
app.use(morgan('dev'));


//rest api
app.get('/',(req,res)=>{
    res.send(
          " <h1>ecommerce<c/h1>"
    )
})
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


const PORT = process.env.PORT ||8000;
app.listen(PORT,()=>{
    console.log(`server is lestening on ${process.env.PORT}`);
})