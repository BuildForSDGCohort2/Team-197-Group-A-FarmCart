import React from "react";
import { useHistory } from "react-router-dom";

import { firebase } from "../../FirebaseAuth/FirebaseAuth";
// import "firebase/firestore";

import "./DeleteProduct.css";

/**
 * DeleteProduct button sends a delete request to permanently
 * remove specified product.
 *
 * @param {*} id
 * @returns div
 */
function DeleteProduct({ id }) {
  const history = useHistory();
  id = String(id);
  const onClickHandler = (evt) => {
    evt.stopPropagation();
    const answer = window.confirm(
      `Are you sure to DELETE this product?`
    );

    if (answer) {
      firebase
        .firestore()
        .collection("products")
        .doc(id)
        .delete()
        .then(() => {
          console.log(`Product with id ${id} deleted successfully.`);
          window.alert(`Product deleted successfully.`);
        })
        .catch((error) => console.log(error));
      history.push("/products");
    } else {
      window.alert("Product deletion cancelled.");
    }
  };

  return (
    <button onClick={onClickHandler} className="delete-product">
      Delete Product
    </button>
  );
} // DeleteProduct

export default DeleteProduct;

// Endpoint for product deletion.
// DELETE "products/:id/delete"
