import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const connectDB  = async(req,res)=>{
  try {
    const conn =await mongoose.connect(process.env.MONGO_DB)
    console.log(`MONGODB conneted  ${conn.connection.host}`);
    
  } catch (error) {
    console.log(`Error in Mongodb${error}`);
  }
}
export default  connectDB;