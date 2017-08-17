import React from "react";
import { Link } from "react-router-dom";

export default function Footer(props) {
  let to, text;
  if (props.history.location.pathname === "/admin") {
    to = "/";
    text = "Back to Home";
  } else {
    to = "/admin";
    text = "Admin Login";
  }
  return (
    <footer className="page-footer">
      <div className="footer-copyright">
        <div className="container">
          © 2017 Copyright Govind Rai & Vilde Vevatne
          <Link to={to} className="grey-text text-lighten-4 right">
            {text}
          </Link>
        </div>
      </div>
    </footer>
  );
}
