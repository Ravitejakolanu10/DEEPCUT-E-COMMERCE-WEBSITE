import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const [productName, setProductName] = useState("");
    const navigate = useNavigate();

    const searchProduct = async () => {

        if (!productName.trim()) return;

        try {

            const res = await axios.get(
                "http://localhost:5000/api/products-search",
                {
                    params: { productName }
                }
            );

            navigate("/search", {
                state: { products: res.data }
            });

        } catch (error) {
            console.error(error);
        }

    };
    const logout = () => {
        localStorage.removeItem("userId");
        navigate("/");
    };

    return (

        <nav className="navbar">

            {/* LOGO */}

            <div className="logo">
                <Link to="/">DEEPCUT</Link>
            </div>

            {/* SEARCH */}

            <div className="search-bar">

                <input
                    type="search"
                    placeholder="Search products..."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <button onClick={searchProduct}>
                    Search
                </button>

            </div>

            {/* NAVIGATION */}

            <div className="nav-links">

                <Link to="/homepage">Home</Link>

                <Link to="/orders">
                    My Orders
                </Link>

                <Link to="/wishlist">
                    Wishlist
                </Link>

                <Link to="/cart">
                    Cart
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

                <button
                    className="logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;