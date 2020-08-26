import React from "react";

/**
 * DeleteCart is a button that prompts the confirm dialog.
 * If cancelled it aborts.
 * If confirmed, it sends a delete request with id of cart.
 *
 * @param {*} id
 * @returns
 */
function DeleteCart(id) {
  const onClickHandler = () => {
    if (window.confirm("Are you sure you want to delete this cart?")) {
      alert("You confirmed cart deletion. Yet to implement functionality");
    } else {
      alert("You cancelled cart deletion.");
    }
  };

  return (
    <div>
      <button onClick={onClickHandler}>Delete Cart</button>
    </div>
  );
} // DeleteCart

export default DeleteCart;

// Endpoint for cart deletion request
// DELETE "/carts/:id/delete"
