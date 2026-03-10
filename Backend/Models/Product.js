import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    productDescription : {
        type : String,
        required : true
    },
    productPrice : {
        type : Number,
        required : true
    },
    productImages : [String],
    productCategory : {
        type : String,
        required : true
    },
    productRating : {
        type : Number,
        default : 0
    },
    productQuantity : {
        type : Number,
        required : true
    },
},{
    timestamps : true
})


const Product = mongoose.model("Product" , productSchema);

export default Product;