import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homepage.css";
import { useLocation } from "react-router-dom";

function Homepage() {

    const [products, setProducts] = useState([]);

    const location = useLocation();

     const userId = localStorage.getItem("userId");

    useEffect(() => {

        const fetchProducts = async () => {

            const res = await axios.get(
                "https://deepcut-e-commerce-website.onrender.com/api/products"
            );

            setProducts(res.data);

        };

        fetchProducts();

    }, []);

    const addTOCart = async (productId) => {

        try {

            await axios.post(
                "https://deepcut-e-commerce-website.onrender.com/api/add-to-cart",
                { userId, productId }
            );

            alert("Added to cart");

        } catch (error) {
            console.error(error);
        }

    };

    return (

        <div className="home-page">

            {/* SALE MARQUEE */}

            <div className="sale-bar">

                <marquee>
                    🔥 Big Sale Today! Up to 60% OFF on Electronics | Free Delivery | Limited Time Offer 🔥
                </marquee>

            </div>

            {/* HERO BANNER */}

            <div className="hero-banner">

                <h1>Welcome to DEEPCUT</h1>

                <p>Shop the Best Products at the Best Prices</p>

            </div>

            {/* PRODUCTS */}

            <div className="products-container">

                {products.map((product) => {

                    return (

                        <div className="product-card" key={product._id}>

                            <div className="product-image">

                                <img
                                  src={product.productImages?.[0]}
                                  alt={product.productName}
                                  loading="lazy"
                                />

                                <span className="discount">
                                    20% OFF
                                </span>

                            </div>

                            <h3>{product.productName}</h3>

                            <p className="product-desc">
                                {product.productDescription}
                            </p>

                            <div className="product-bottom">

                                <span className="product-category">
                                    {product.productCategory}
                                </span>

                                <span className="product-price">
                                    ₹{product.productPrice}
                                </span>

                            </div>

                            <button
                                className="add-cart"
                                onClick={() => addTOCart(product._id)}
                            >

                                Add to Cart

                            </button>

                        </div>

                    )

                })}

            </div>

        </div>

    )

}

export default Homepage;
