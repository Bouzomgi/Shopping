import React from "react";
import "./Nav.css";
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="nav-container">
      <nav>
        <h1 className="nav-link" id="shop-name">GoodMart</h1>

        <ul className="nav-element nav-link">
          <Link to="/">
            <li>Login</li>
          </Link>
          <li>Shop</li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
