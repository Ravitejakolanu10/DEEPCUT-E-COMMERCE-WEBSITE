import React, { useState } from "react";
import axios from "axios";
import "./Address.css";

function Address() {

const [address,setAddress] = useState("");
const [city,setCity] = useState("");
const [state,setState] = useState("");
const [pincode,setPincode] = useState("");

const userId = localStorage.getItem("userId");

const placeOrder = async (e) => {

e.preventDefault();

try{

const res = await axios.post(
"https://deepcut-e-commerce-website.onrender.com/api/place-order",
{
userId,
address,
city,
state,
pincode
}
);

alert(res.data.message);

}catch(error){
console.error(error);
}

};

return (

<div className="address-page">

<h2>Delivery Address</h2>

<form className="address-form" onSubmit={placeOrder}>

<label>Address</label>
<textarea
placeholder="Enter full address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
required
/>

<label>City</label>
<input
type="text"
placeholder="City"
value={city}
onChange={(e)=>setCity(e.target.value)}
required
/>

<label>State</label>
<input
type="text"
placeholder="State"
value={state}
onChange={(e)=>setState(e.target.value)}
required
/>

<label>Pincode</label>
<input
type="number"
placeholder="Pincode"
value={pincode}
onChange={(e)=>setPincode(e.target.value)}
required
/>

<button type="submit">
Place Order
</button>

</form>

</div>

);

}

export default Address;
