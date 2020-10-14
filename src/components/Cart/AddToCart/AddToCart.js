// Modules
import React from "react";
import { useHistory } from "react-router-dom";

import { firebase } from "../../FirebaseAuth/FirebaseAuth";
import "firebase/firestore";

import "./AddToCart.css";

import CartService from "../../../services/cart.service";

/**
 * AddToCart button:
 * Checks if cart exists then adds the given item to it if so.
 * If cart doesn't exist in localStorage, it creates one.
 * It then adds item with the specified id to cart.
 *
 * @param {*} { id }
 * @returns
 */
function AddToCart(props) {
  let { id, myCart } = props;
  const user = JSON.parse(window.localStorage.getItem("user"));
  const products = JSON.parse(window.localStorage.getItem("products"));
  const history = useHistory();

  const onAddClickHandler = (event) => {
    event.stopPropagation();
    if (!user) {
      window.alert("You must log in to add items to cart.");
      history.push("/sign-up");
      return;
    }

    // Pull out the single product with the given id.
    function setProduct(productsArray) {
      let product;
      if (productsArray) {
        product = productsArray.filter(
          (product) => String(product.id) === String(id)
        );
      }
      return product[0];
    }
    // will hold the product whose id matches the provided id.
    const product = setProduct(products);

    if (myCart === null || myCart === undefined) {
      console.log("null or undefined cart")
      myCart = CartService.createCart();
    } else {
      const newCartItem = {
        // category, id, unitOfMeasure, price, quantity, name
        id: id,
        unitOfMeasure: product.unitOfMeasure,
        price: product.price,
        category: product.category,
        quantity: 1, // default to 1 unit of the product.
        name: product.name,
      }; // newCartItem

      const updatedCart = CartService.addItemToCart(myCart, newCartItem);

      /**
       * saveCart takes a cart object and persists it to db.
       *
       * @param {Object} cart
       */
      async function saveCart(cart) {
        return firebase
          .firestore()
          .collection("carts")
          .doc(user.uid)
          .set(cart, { merge: true })
          .then(() => {
            return true;
          })
          .catch((error) => {
            console.log(error.message);
            return false;
          });
      }; // saveCart

      try {
        const saved = saveCart(updatedCart);
        if (saved) {
          console.log("--myCart updated--");
          console.log(updatedCart);
          CartService.retrieveCartFromDb();
        }
      } catch(error) {
        console.log(error);
      } 
    } // else
  }; // onClickHandler

  return (
    <div>
      <button onClick={onAddClickHandler} className="add-cart">
        Add To Cart
      </button>
    </div>
  );
} // AddToCart

export default AddToCart;

// Endpoint for add to cart request
// POST "/carts/:id"
