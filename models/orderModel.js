import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
      products:[
        {
            type:mongoose.ObjectId,
            ref:"Product"
        },
      ],
    
    payment: {
      type: Object, // Or use a specific schema if you're storing more structured data
      required: true,
    }
      ,
      buyer:{
        type:mongoose.ObjectId,
        ref:'users',
      },
      status:{
        type:String,
        default:"not Process",
        enum:["Not process","Processing","Shipped","delieved","cancel" ]
      },
    
     
}, {timestamps:true}
)
export default mongoose.model("Order", orderSchema);