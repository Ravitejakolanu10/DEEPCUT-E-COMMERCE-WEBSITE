import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {

const [orders,setOrders] = useState([]);

const userId = localStorage.getItem("userId");

useEffect(()=>{

const fetchOrders = async () => {

try{

const res = await axios.get(
`http://localhost:5000/api/orders/${userId}`
);

setOrders(res.data);

}catch(error){
console.error(error);
}

};

fetchOrders();

},[userId]);

return (

<div className="orders-page">

<h1 className="orders-title">
My Orders
</h1>

{orders.length === 0 ? (

<h2 className="empty-orders">
No Orders Yet
</h2>

):( 

<div className="orders-container">

{orders.map((order)=>(

<div className="order-card" key={order._id}>

<img
src={`http://localhost:5000/uploads/${order.productId.productImages?.[0]}`}
alt={order.productId.productName}
/>

<div className="order-details">

<h3>
{order.productId.productName}
</h3>

<p className="order-desc">
{order.productId.productDescription}
</p>

<p className="order-category">
Category: {order.productId.productCategory}
</p>

<p className="order-price">
₹{order.amount}
</p>

<p className="order-qty">
Quantity: {order.quantity}
</p>

<p className="order-status">
Status: 
<span className={`status ${order.status}`}>
{order.status}
</span>
</p>

</div>

</div>

))}

</div>

)}

</div>

);

}

export default Orders;