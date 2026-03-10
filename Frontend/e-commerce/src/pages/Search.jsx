
import React from "react";
import { useLocation } from "react-router-dom";
import "./Homepage.css";

function Search() {

    const location = useLocation();

    const products = location?.state?.products || [];

    return (

        <div className="products-container">

            {products.length === 0 ? (

                <h2>No products found</h2>

            ) : (

                products.map((product) => {

                    return (

                        <div className="product-card" key={product._id}>

                            <img
                                src={`http://localhost:5000/uploads/${product.productImages?.[0]}`}
                                alt={product.productName}
                            />

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

                            <button className="add-cart">
                                Add to Cart
                            </button>

                        </div>

                    )

                })

            )}

        </div>

    );

}

export default Search;