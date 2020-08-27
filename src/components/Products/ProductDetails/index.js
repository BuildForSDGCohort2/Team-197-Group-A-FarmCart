import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import "./ProductDetails.css";

// Context
import { ProductsContext } from "../../../contexts/ProductsContext";

import AddToCart from "../../Cart/AddToCart";

function ProductDetails() {
  const { products } = useContext(ProductsContext);
  const { id } = useParams();
  let product;

  function setProduct(products) {
    if (products !== null || products !== undefined) {
      product = products.filter(product => Number(product.id) === Number(id));
    }
  }

  setProduct(products);
  
  if (product[0] != null) {
    return (
      <div className="product-details">
        <h3>{product[0].title}</h3>
        <br />
          <img
            src={product[0].image}
            alt={product[0].title}
            style={{
              height: 100,
              width: 150,
              padding: 3,
            }}
          />
          <br />
          <span className="labels">Price: </span>
          {product[0].price}
          <br />
          <span className="labels">Description: </span>
          {product[0].description.substring(0)}
          <br />
          <span className="labels">Category: </span>
          {product[0].category}
          <br />
          <AddToCart id={product[0].id} />
      </div>
    );
  } else {
    return null;
  }
  
} // ProductDetails

export default ProductDetails;

// Route:
// GET /products/:id
