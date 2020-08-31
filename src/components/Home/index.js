// Modules
import React from "react";

import Products from "../Products/AllProducts";

function Home({products}) {
  return (
    <div className="home">
      <br/>
      <Products products={products} />
    </div>
  ); // return
} // Home

export default Home;

// Route:
// GET /
