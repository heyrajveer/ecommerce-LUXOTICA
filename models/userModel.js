import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
    ,
    answer:{
       type:String,
       require:true
    },
    address:{
        type:{}, //i pass object becos long address aaccept this one
        require:true
    },
    role:{
        type:Number,
        default:0
    }
})
export default mongoose.model('users',userSchema)