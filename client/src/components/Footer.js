import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-copyright">
        <div className="container">
          © 2017 Copyright Govind Rai
          <Link to="/admin" className="grey-text text-lighten-4 right">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
