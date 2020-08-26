// Modules
import React from "react";

// Utils
import "./home.css";

import Products from "../Products/AllProducts";

function Home() {
  return (
    <div className="home">
      <br/>
      <Products />
    </div>
  ); // return
} // Home

export default Home;

// Route:
// GET /
