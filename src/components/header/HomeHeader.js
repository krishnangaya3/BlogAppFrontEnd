import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function HomeHeader(props) {
  return (
    <div>
      <nav className="header">
        <h2 className="logo">Gayathri's Blog</h2>
        <div className="articles">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/signup">
            Signup
          </Link>
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default HomeHeader;
