import React, { useState } from 'react'
import axios from 'axios';
import './Products.css';

function Products() {

    const [productName , setProductName] = useState("");
    const [productDescription , setProductDescription] = useState("");
    const [productCategory , setProductCatergory] = useState("");
    const [productPrice , setProductPrice] = useState("");
    const [productImages , setProductImages] = useState([]);
    const [productQuantity , setProductQunatity] = useState("");


    const uploadProduct = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();

            formData.append("productName", productName);
            formData.append("productDescription", productDescription);
            formData.append("productCategory", productCategory);
            formData.append("productPrice", productPrice);
            formData.append("productQuantity", productQuantity);

            for (let i = 0; i < productImages.length; i++) {
                formData.append("productImages", productImages[i]);
            }

            const res = await axios.post("https://deepcut-e-commerce-website.onrender.com/api/add-product",formData)
            
            alert(res.data.message);

            setProductName("");
            setProductDescription("");
            setProductImages([]);
            setProductCatergory("");
            setProductPrice("");
            setProductQunatity("");

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Upload failed");
        }
    }

    return (
        <>
        <div className="product-container">
        <form className="product-form" onSubmit={uploadProduct}>

            <h2>Add Product</h2>

            <label>Product Name</label>
            <input
            type="text"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e)=>setProductName(e.target.value)}
            required
            />

            <label>Product Description</label>
            <input
            type="text"
            placeholder="Enter Product Description"
            value={productDescription}
            onChange={(e)=>setProductDescription(e.target.value)}
            required
            />

            <label>Product Images</label>
            <input
            type="file"
            multiple
            onChange={(e)=>setProductImages(e.target.files)}
            required
            />

            <div className="image-preview">
                {Array.from(productImages).map((img,index)=>(
                <img
                key={index}
                src={URL.createObjectURL(img)}
                alt="preview"
                />
                ))}
            </div>

            <label>Product Category</label>
            <select
            value={productCategory}
            onChange={(e)=>setProductCatergory(e.target.value)}
            >

            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home Appliances">Home Appliances</option>

            </select>

            <label>Product Price</label>
            <input
            type="number"
            placeholder="Enter Product Price"
            value={productPrice}
            onChange={(e)=>setProductPrice(e.target.value)}
            required
            />

            <label>Product Quantity</label>
            <input
            type="number"
            placeholder="Enter Product Quantity"
            value={productQuantity}
            onChange={(e)=>setProductQunatity(e.target.value)}
            required
            />

            <button type="submit">Add Product</button>

        </form>
        </div>

        </>
    )
}

export default Products
