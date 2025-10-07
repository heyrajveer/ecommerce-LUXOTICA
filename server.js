import express from "express";
import dotenv from 'dotenv';
import connectDB from "./database/db.js";
import morgan from 'morgan';
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from "cors";

dotenv.config(); // Load .env

const app = express(); // <-- define app first!

// Now you can use middlewares
app.use(cors({
  origin: [
    "http://localhost:3000", // local dev
    "https://ecommerce-luxotica.vercel.app/"
    "https://ecommerce-luxotica-git-main-hey-rajveers-projects.vercel.app",
    "https://ecommerce-luxotica-356sw6ewj-hey-rajveers-projects.vercel.app" // production frontend
    "ecommerce-luxotica-l8l3sy6jb-hey-rajveers-projects.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));


app.use(express.json());
app.use(morgan('dev'));

connectDB();

// Routes
app.get('/', (req,res) => {
    res.send("<h1>ecommerce</h1>");
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
