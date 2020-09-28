import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <footer>
      <h1 className="footer-header"><span className="farm-txt">Farm</span><span className="cart-txt">Cart</span></h1>
      <div className="footer-body">
        <div className="footer-column">
          <h3>Resources</h3>
          <div className="footer-item">Products & Services</div>
          <div className="footer-item">How-to guides</div>
          <div className="footer-item">Blog</div>
          <div className="footer-item">FAQ</div>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <div className="footer-item">Tax Compliance</div>
          <div className="footer-item">Privacy Policy</div>
          <div className="footer-item">Terms and Conditions</div>
          <div className="footer-item">Cookie Policy</div>
        </div>
        <div className="footer-column">
          <h3>Contacts</h3>
          <div className="footer-item">One</div>
          <div className="footer-item">Two</div>
          <div className="footer-item">Three</div>
          <div className="footer-item">Four</div>
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 20,
        color: "orangered"
      }}>&#x000A9;&nbsp;2020 FarmCart. All rights reserved.</div>
    </footer>
  );
} // Footer

export default Footer;
