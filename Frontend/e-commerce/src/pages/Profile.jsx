import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {

const [user,setUser] = useState({});

const [edit,setEdit] = useState(false);

const userId = localStorage.getItem("userId");

useEffect(()=>{

const fetchUser = async ()=>{

try{

const res = await axios.get(
`http://localhost:5000/api/user/${userId}`
);

setUser(res.data);

}catch(error){
console.error(error);
}

};

fetchUser();

},[userId]);

const updateProfile = async ()=>{

try{

await axios.put(
"http://localhost:5000/api/update-profile",
user
);

alert("Profile Updated");

setEdit(false);

}catch(error){
console.error(error);
}

};

return(

<div className="profile-page">

<h1 className="profile-title">
My Profile
</h1>

<div className="profile-card">

<div className="profile-field">

<label>Name</label>

{edit ? (

<input
value={user.userName}
onChange={(e)=>setUser({
...user,
userName:e.target.value
})}
/>

):(

<p>{user.userName}</p>

)}

</div>

<div className="profile-field">

<label>Email</label>

<p>{user.userEmail}</p>

</div>

<div className="profile-field">

<label>Phone</label>

{edit ? (

<input
value={user.userPhone}
onChange={(e)=>setUser({
...user,
userPhone:e.target.value
})}
/>

):(

<p>{user.userPhone}</p>

)}

</div>

{edit ? (

<button
className="save-btn"
onClick={updateProfile}
>
Save Changes
</button>

):( 

<button
className="edit-btn"
onClick={()=>setEdit(true)}
>
Edit Profile
</button>

)}

</div>

</div>

);

}

export default Profile;