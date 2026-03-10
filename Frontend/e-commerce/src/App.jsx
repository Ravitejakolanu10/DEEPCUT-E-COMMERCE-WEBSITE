import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import Screen from "./pages/Screen.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Homepage from "./pages/Homepage.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Address from "./pages/Address.jsx";
import Orders from "./pages/Orders.jsx";
import Search from "./pages/Search.jsx";
import Profile from "./pages/Profile.jsx";

function App() {

  return (

    <Routes>



      <Route path="/" element={<Screen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />



      <Route element={<Layout />}>

        <Route path="/homepage" element={<Homepage />} />
        <Route path="/add-product" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />

      </Route>

    </Routes>

  );

}

export default App;