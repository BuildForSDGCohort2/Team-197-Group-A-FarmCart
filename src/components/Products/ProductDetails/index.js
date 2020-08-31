// Modules
import React from "react";
import { useParams, useHistory } from "react-router-dom";

import "./ProductDetails.css";

import AddToCart from "../../Cart/AddToCart";

/**
 * ProductDetails extracts products from ProductsContext and 
 * either returns null or a component with a rendering of the
 * product details.
 *
 * @param {*} { products }
 * @returns {object} null || div
 */
function ProductDetails({ products }) {
  const history = useHistory();
  let { id } = useParams();

  if (products.length === 0) {
    products = JSON.parse(window.localStorage.getItem("products"));
  }
  let product;
  function setProduct(products) {
    if (products !== null) {
      product = products.filter((product) => Number(product.id) === Number(id));
    }
  }
  setProduct(products);

  const onClickHandler = () => {
    id = id.toString();
    history.push(`/products/${id}/edit`);
  };
  
  if (product[0] === null) {
    return null;
  } else {
    return (
      <div className="product-details">
        <div><br />
          TODO:<br />
          1. Hook up onSubmitHandler with endpoint URL for product editing<br />
          2. Gather feedback from team on improvements<br />
          3. Fix css issues<br />
        </div>
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
          <span className="labels category">Category: </span>
          {product[0].category}
          <br /><br />
          <button className="edit-button" type="button" onClick={onClickHandler}>Edit Product</button>
          <AddToCart id={product[0].id} />
      </div>
    );
  }
} // ProductDetails

export default ProductDetails;

// Route:
// GET /products/:id
