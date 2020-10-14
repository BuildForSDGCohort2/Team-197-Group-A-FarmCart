import React from "react";
import { NavLink } from "react-router-dom";

// Utils
import "./Footer.css";
import * as ROUTES from "../../constants/routes";

function Footer() {
  return (
    <footer style={{  marginTop: 25 }}>
      <h1 className="footer-header">
        <span className="farm-txt">Farm</span>
        <span className="cart-txt">Cart</span>
      </h1>
      <div className="footer-body">
        <div className="footer-column">
          <h2 className="footer-subheader">Resources</h2>
          <div className="footer-item">Products & Services</div>
          <div className="footer-item">How-to guides</div>
          <div className="footer-item">Blog</div>
          <div className="footer-item">FAQ</div>
        </div>

        <div className="footer-column">
          <h2 className="footer-subheader">Legal</h2>
          <div className="footer-item">
            <NavLink className="active" aria-current="page" to={ROUTES.PRIVACY}>
              Privacy Policy
            </NavLink>
          </div>
          <div className="footer-item">
            <NavLink className="active" aria-current="page" to={ROUTES.TOS}>
              Terms of Service
            </NavLink>
          </div>
          <div className="footer-item">
            <NavLink
              className="active"
              aria-current="page"
              to={ROUTES.COOKIE_POLICY}
            >
              Cookie Policy
            </NavLink>
          </div>
          <div className="footer-item">Tax Compliance</div>
        </div>

        <div className="footer-column">
          <h2 className="footer-subheader">Contacts</h2>
          <div className="footer-item">One</div>
          <div className="footer-item">Two</div>
          <div className="footer-item">Three</div>
          <div className="footer-item">Four</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          paddingTop: 20,
          color: "orangered",
        }}
      >
        &#x000a9;&nbsp;2020 FarmCart. All rights reserved.
      </div>
    </footer>
  ); // return
} // Footer

export default Footer;
