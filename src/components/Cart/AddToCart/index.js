import React from "react";

import "./addToCart.css";

/**
 * AddToCart button sends a post request to add item with
 * the specified id to cart.
 *
 * @param {*} id
 * @returns
 */
function AddToCart({ id }) {
  id = id.toString();
  const onClickHandler = (evt) => {
    evt.stopPropagation();
    window.alert(`Item with id ${id} will be added to cart`);
  };

  return (
    <div>
      <button onClick={onClickHandler} className="add-cart">Add To Cart</button>
    </div>
  );
} // AddToCart

export default AddToCart;

// Endpoint for add to cart request
// POST "/carts/:id"
