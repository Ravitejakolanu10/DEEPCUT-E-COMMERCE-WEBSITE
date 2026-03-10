import React from "react";
import { Link } from "react-router-dom";
import "./Screen.css";

function Screen() {

  return (

    <div className="landing-page">

      <div className="landing-container">

        <h1 className="logo">DEEPCUT</h1>

        <p className="tagline">
          Discover the best products at unbeatable prices. Shop smarter with DEEPCUT.
        </p>

        <div className="btn-group">

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="register-btn">
              Register
            </button>
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Screen;