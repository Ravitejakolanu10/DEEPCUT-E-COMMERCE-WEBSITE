import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    amount : {
        type : Number,
    },
    quantity : {
        type : Number,
        default : 1
    },
    address : {
        type : String,
        required : true
    },
    status : {
    type : String,
    enum : ["pending","confirmed","shipped","delivered","cancelled"],
    default : "pending"
}
},{
    timestamps : true
})



const Order = mongoose.model("Order" , orderSchema);
export default Order;