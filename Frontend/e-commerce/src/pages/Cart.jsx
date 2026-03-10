import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {

const [products, setMyCart] = useState([]);

const userId = localStorage.getItem("userId");

/* LOAD CART */

useEffect(() => {

if(userId){
fetchCart();
}

}, [userId]);

const fetchCart = async () => {

try {

const res = await axios.get(
`http://localhost:5000/api/userCart/${userId}`
);

setMyCart(res.data);

} catch (error) {
console.error(error);
}

};

/* INCREASE QUANTITY */

const increaseQty = async (productId) => {

try {

await axios.put(
"http://localhost:5000/api/cart/increase",
{
userId,
productId
}
);

fetchCart();

} catch (error) {
console.error(error);
}

};

/* DECREASE QUANTITY */

const decreaseQty = async (productId, quantity) => {

if(quantity <= 1) return;

try {

await axios.put(
"http://localhost:5000/api/cart/decrease",
{
userId,
productId
}
);

fetchCart();

} catch (error) {
console.error(error);
}

};

/* REMOVE PRODUCT */

const removeItem = async (productId) => {

try {

await axios.delete(
"http://localhost:5000/api/cart/remove",
{
data:{ userId, productId }
}
);

fetchCart();

} catch (error) {
console.error(error);
}

};

/* TOTAL PRICE */

const totalAmount = products.reduce((total,item)=>{

if(!item.product) return total;

return total + item.product.productPrice * item.quantity;

},0);

return (

<div className="cart-page">

<h1 className="cart-title">
Your Shopping Cart
</h1>

{products.length === 0 ? (

<div className="empty-section">

<h2 className="empty-cart">
Your cart is empty
</h2>

<Link to="/homepage">
<button className="continue-btn">
Continue Shopping
</button>
</Link>

</div>

):( 

<div className="cart-container">

{/* CART ITEMS */}

<div className="cart-items">

{products.map((item)=>{

const product = item.product;

if(!product) return null;

return(

<div className="cart-card" key={product._id}>

<img
src={`http://localhost:5000/uploads/${product.productImages?.[0]}`}
alt={product.productName}
/>

<div className="cart-details">

<h3>{product.productName}</h3>

<p className="desc">
{product.productDescription}
</p>

<p className="category">
Category: {product.productCategory}
</p>

<p className="price">
₹{product.productPrice}
</p>

{/* QUANTITY */}

<div className="qty-control">

<button
onClick={() => decreaseQty(product._id, item.quantity)}
>
-
</button>

<span>{item.quantity}</span>

<button
onClick={() => increaseQty(product._id)}
>
+
</button>

</div>

{/* REMOVE */}

<button
className="remove-btn"
onClick={()=>removeItem(product._id)}
>
Remove
</button>

</div>

</div>

)

})}

</div>

{/* ORDER SUMMARY */}

<div className="order-summary">

<h2>Order Summary</h2>

<div className="summary-row">
<span>Subtotal</span>
<span>₹{totalAmount}</span>
</div>

<div className="summary-row">
<span>Delivery</span>
<span>₹100</span>
</div>

<hr/>

<div className="summary-row total">
<span>Total</span>
<span>₹{totalAmount + 100}</span>
</div>

<Link to="/address">

<button className="checkout-btn">
Proceed to Buy
</button>

</Link>

</div>

</div>

)}

</div>

);

}

export default Cart;